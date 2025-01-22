
const Time = require("../models/timeModel");
const { getPlayers } = require("../service/playerService")
const { getRandomNumber, getRandomElement, getLastElement, printTitle, printSubTitle, print, roundUp } = require("../utils/utils")
const { getPreciousStones, getSaddleBags } = require("../utils/database")
const { attackTeammate, stealItem, loseArrow } = require("../utils/player")

const getTime = async () => {
  try {
    const time = await Time.find();
    return time;
  } catch (error) {
    throw error;
  }
}  

const executeNextDay = async () => {

  try {

    printTitle("Executing ??? (?)")

    let players = await getPlayers();
    let time = await getTime();

    if (!players || players.length === 0) {throw new Error("No player found in the database")}

    // Morning (5:00)
    players = await executeMorning(players);

    // Midday (12:00)
    const newDay = await executeMidday(time);
    time.push(newDay);

    // Afternoon (17:00)
    players = await executeAfternoon(players);

    // Night (22:00)

    return {
      time: time,
      players: players,
    }

  } catch (error) {
    throw error;
  }

}


const executeAfternoon = async (players) => {

  printSubTitle("Afternoon (17:00)")

  // Order from greater to smaller.
  const ordederPlayers = players.sort((a,b) => {
    const dexterityA = a.stats.dexterity;
    const dexterityB = b.stats.dexterity;
    return dexterityB-dexterityA;
  }); 

  // Select one player randomly and put in the first position
  print("The joker is selecting a player to start the round");

  const jokerSelectedPlayer = getRandomElement(players);
  const selectedPlayerIndex = ordederPlayers.findIndex(el => el.name === jokerSelectedPlayer.name);

  ordederPlayers.splice(selectedPlayerIndex, 1)
  ordederPlayers.unshift(jokerSelectedPlayer)

  const roundPlayers = players.filter(player => player.occupation !== "joker");

  roundPlayers.forEach(player => {

    if (player.occupation === "priest") {return player}

    print(`\nIt is ${player.name}'s turn`);

    if (player.occupation === "mage")  {
      attackTeammate(player, "dexterity", players);
    }

    if (player.occupation === "warrior")  {
      attackTeammate(player, "strength", players);
    }

    if (player.occupation === "thug")  {
      
      // Steal Item
      stealItem(player, players);

      // Attack teammate
      attackTeammate(player, "dexterity", players);

      // Remove one arrow
      loseArrow(player, players);
    }

    if (player.occupation === "peasant")  {

      const teammateAmount = players.filter(filteredPlayers => filteredPlayers.name !== player.name).length;
      const halfTeammatesAmount = Math.floor(teammateAmount/2);

      const randomTeammateNames = [];
      
      while (randomTeammateNames.length<halfTeammatesAmount) {
        const randomPlayerName = getRandomElement(players).name;
        if (!randomTeammateNames.includes(randomPlayerName) && randomPlayerName !== player.name) {
          randomTeammateNames.push(randomPlayerName);
        }
      }
      const randomTeammates = randomTeammateNames.map(teammateName => players.find(player => player.name === teammateName));
          
      // Give peace of food to each random teammate.
      for (let teammate of randomTeammates) {

        if (player.equipment.saddlebag.length===0) {
          print(`${player.name} wanted to give a piece of food to ${teammate.name} but he didnt have any.`);
          break;
        }
       
        const food = player.equipment.saddlebag[0];

        print(`${player.name} has given ${food.name} to ${teammate.name}.`);

        // Add food to the player.
        players = players.map(player => {
          if (player.name === teammate.name) {
            player.equipment.saddlebag.push(food);
          }
          return player;
        })

        // Remove food to player.
        player.equipment.saddlebag.shift();
      }

    }

    if (player.occupation === "gambler")  {
      
      const teammates = players.filter(filteredPlayers => filteredPlayers.name !== player.name);
      const randomTeammate = getRandomElement(teammates);

      const headOrTails = getRandomNumber(0,1);

      // If random number is 0 wins gambler, if not the teammate.
      if (headOrTails === 0) {

        print(`${player.name} has won head or tails to ${randomTeammate.name}`);
        
        const teammateStones = randomTeammate.equipment.pouch.precious_stones;

        if (teammateStones.length > 0) {

          const stone = teammateStones[0];
          
          // Add the won stone to the player
          player.equipment.pouch.precious_stones.push(stone);

          // Remove the lost stone to the player
          randomTeammate.equipment.pouch.precious_stones.shift();

          print(`${randomTeammate.name} has given ${stone.name} to ${player.name}.`);

        } else {
          print(`${randomTeammate.name} doesnt have any precious stone.`);
        }

      } else {

        print(`${randomTeammate.name} has won head or tails to ${player.name}`);

        const gamblerStones = player.equipment.pouch.precious_stones;

        if (gamblerStones.length > 0) {

          const stone = gamblerStones[0];
          
          // Add the won stone to the player
          randomTeammate.equipment.pouch.precious_stones.push(stone);
          player.equipment.pouch.precious_stones.unshift();

          print(`${player.name} has given ${stone.name} to ${randomTeammate.name}.`);

        } else {
          print(`${player.name} doesnt have any precious stone.`);
        }
      }

    }

  });

  print(`\nAll the players will suffers a decrease of 2 points of stamina`);

  return players.map(player => {
    player.stats.stamina-=2;
    return player;
  });

}


const executeMidday = async (time) => {

  printSubTitle("Midday (12:00)")

  const lastDay = getLastElement(time); 
  const dayNumber = lastDay.day_number+1; 

  const traveledDistance = getRandomNumber(1,10);

  const newDay = {
    day_number: dayNumber,
    day_week: "???",
    km_traveled: traveledDistance,
    km_total: lastDay.km_total+traveledDistance
  }

  return newDay;

}


const executeMorning = async (players) => {

  const preciousStones = await getPreciousStones();
  const saddlebags = await getSaddleBags();

  printSubTitle("Morning (5:00)")

  return players.map((player) => {

    // Rest
    const strengthGain = getRandomNumber(0, 2);
    const dexterityGain = 2-strengthGain;

    player.stats.strength += strengthGain;
    player.stats.dexterity += dexterityGain;

    (strengthGain !== 0) && print(`${player.name} has gained ${strengthGain} points of strength`);
    (dexterityGain !== 0) && print(`${player.name} has gained ${dexterityGain} points of dexterity`);

    // Recollect
    const recolectNumber = getRandomNumber(1, 100);

    if (recolectNumber<=30) { 
      // Finds a gold piece
      player.equipment.gold+=1;
      print(`${player.name} has found a piece of gold`);
      
    } else if (recolectNumber<=80) {
      // Find 1-20 coins
      const foundCoins = getRandomNumber(1,20);
      player.equipment.coins += foundCoins;
      print(`${player.name} has found ${foundCoins} coins`);

    } else {
      // Find a precious stone.
      const randomPreciousStone = getRandomElement(preciousStones);
      player.equipment.pouch.precious_stones.push(randomPreciousStone);
      print(`${player.name} has found ${randomPreciousStone.name}`);

    }

    // Get food piece.
    const randomFood = getRandomElement(saddlebags);
    player.equipment.saddlebag.push(randomFood);
    print(`${player.name} has found ${randomFood.name}`);

    print("");
    
    return player;

  });

}


module.exports = {
  getTime,
  executeNextDay
} 