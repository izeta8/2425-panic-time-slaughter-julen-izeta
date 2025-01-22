
const Character = require("../models/characterModel");
const Weapon = require("../models/weaponModel");
const Saddlebag = require("../models/saddlebagModel")
const PreciousStone = require("../models/preciousstoneModel")

const getPlayers = async () => {
  try {
    const players = await Character.find()
                                        .populate("equipment.saddlebag")
                                        .populate("equipment.weapons")
                                        .populate("equipment.pouch.precious_stones")
                                        .exec();
    return players;
  } catch (error) {
    throw error;
  }
}  


module.exports = {
  getPlayers,
}
