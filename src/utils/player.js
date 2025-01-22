
const { getRandomNumber, roundUp, getRandomElement } = require("../utils/utils");
const { print } = require("../utils/utils")

const attackTeammate = (attackingPlayer, totalDamageAttribute, players) => {
  
  const randomNumber = getRandomNumber(1, 100);

  if (randomNumber>attackingPlayer.stats.dexterity) {
    print(`${attackingPlayer.name} wont attack anyone. `);
    return;
  }

  // console.log("ANTES");
  // console.log(players);

  const weapon = attackingPlayer.equipment.weapons[0];

  // Calculate the die throw n times.
  let diesNumber = 0;
  for (let i = 0; i < weapon.num_die_damage; i++) {
    diesNumber += getRandomNumber(1, 4);
  }

  const weaponDamage = roundUp(diesNumber + weapon.quality / 5);
  const totalDamage = roundUp(weaponDamage + attackingPlayer.stats[totalDamageAttribute] / 4)

  const teammates = players.filter(filterPlayer => filterPlayer.name !== attackingPlayer.name)
  const damagedPlayer = getRandomElement(teammates);

  // printSubTitle("Attacked Player:")
  // console.log("Total Damage: ", totalDamage);
  // console.log("Damaged: ", damagedPlayer.name);
  // console.log("Strength: ", damagedPlayer.stats.strength);
  // printSubTitle("============")

  players = players.map(player => {
    if (player.name === damagedPlayer.name) {
      player.stats.strength -= totalDamage;
    }
    return player;
  })

  print(`${attackingPlayer.name} has attacked ${damagedPlayer.name} and removed ${totalDamage} points of strength. `);
  
  // console.log("DESPUES");
  // console.log(players);
}

const loseArrow = (player, players) => {
  if (player.equipment.quiver > 0) {
    print(`${player.name} doesnt have any arrow in the quiver.`)
  } else {
    print(`${player.name} has has lost an arrow.`)

    players = players.map(filterPlayer => {
      if (filterPlayer.name === player.name) {
        player.equipment.quiver--;
      }
      return player;
    })
  }
}

const stealItem = (stealingPlayer, players) => {

  const randomNumber = getRandomNumber(1,3);
  const affectedPlayer = getRandomElement(players);
  
  // console.log("ANTES")
  // console.log(affectedPlayer.equipment.quiver);
  // console.log(player.equipment.quiver);

  // -- Steal gold -- //  
  if (randomNumber === 1) {

    print(`${stealingPlayer.name} has stolen 1 gold ingot to ${affectedPlayer.name}`)

    // Remove one unit gold
    players = players.map(player => {
      if (player.name === affectedPlayer.name) {
        player.equipment.pouch.gold--;
      }
      return player;
    })

    // Increase one unit gold to preist
    stealingPlayer.equipment.pouch.gold++;
  }

  // -- Steal coins -- //
  if (randomNumber === 2) {

    const dexterity = stealingPlayer.stats.dexterity;
    const coinsToSteel = roundUp(1, roundUp(dexterity/2));

    if (affectedPlayer.equipment.pouch.coins === 0) {
      print(`${stealingPlayer.name} has tried to steal coins to ${affectedPlayer.name} but he didnt have any`)
    } else {

      print(`${stealingPlayer.name} has stolen ${coinsToSteel} coins to ${affectedPlayer.name}`)

      // Remove the coins
      players = players.map(player => {
        if (player.name === affectedPlayer.name) {
          player.equipment.pouch.coins -= coinsToSteel;
        }
        return player;
      })

      // Increase the coins
      stealingPlayer.equipment.pouch.coins+=coinsToSteel;
    }

  }

  // -- Steal arrow -- //
  if (randomNumber === 3) {

    if (affectedPlayer.equipment.quiver===0) {
      print(`${stealingPlayer.name} has tried to steal an arrow to ${affectedPlayer.name} but he didnt have any.`)
    } else {

      print(`${stealingPlayer.name} has stolen an arrow to ${affectedPlayer.name}.`)

      // Remove one arrow
      players = players.map(player => {
        if (player.name === affectedPlayer.name) {
          player.equipment.quiver--;
        }
        return player;
      })

      // Increase one arrow
      stealingPlayer.equipment.quiver++;
    }
  }

  // console.log("DESPUES")
  // console.log(affectedPlayer.equipment.quiver);
  // console.log(player.equipment.quiver);

}

module.exports = {
  attackTeammate,
  stealItem,
  loseArrow,
}