const playerService = require("../service/playerService");

const getPlayers = async (req, res) => {
  try {
    const players = await playerService.getPlayers();
    res.status(200).send({status: "OK", data: players});
  } catch (error) {
    res.status(500).send({status: "FAILED", error: error?.message})
  }
}

module.exports = {
  getPlayers
}