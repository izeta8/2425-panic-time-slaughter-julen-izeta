
const Character = require("../models/characterModel");

const getPlayers = async () => {
  try {
    const players = await Character.find();
    return players;
  } catch (error) {
    throw error;
  }
}  


module.exports = {
  getPlayers,
}