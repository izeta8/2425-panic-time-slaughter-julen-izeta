
const PreciousStone = require("../models/preciousstoneModel")
const Saddlebag = require("../models/saddlebagModel")

const getPreciousStones = async () => {
  try {
    const preciousStones = await PreciousStone.find();
    return preciousStones;
  } catch (error) {
    throw error;
  }
}  

const getSaddleBags = async () => {
  try {
    const saddlebag = await Saddlebag.find();
    return saddlebag;
  } catch (error) {
    throw error;
  }
}  


module.exports = {
  getPreciousStones,
  getSaddleBags
}
