
const Time = require("../models/timeModel");

const getTime = async () => {
  try {
    const time = await Time.find();
    return time;
  } catch (error) {
    throw error;
  }
}  


module.exports = {
  getTime,
}