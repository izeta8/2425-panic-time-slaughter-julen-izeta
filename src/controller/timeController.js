const timeService = require("../service/timeService");

const getTime = async (req, res) => {
  try {
    const time = await timeService.getTime();
    res.status(200).send({status: "OK", data: time});
  } catch (error) {
    res.status(500).send({status: "FAILED", error: error?.message})
  }
}

const executeNextDay = async (req, res) => {
  console.clear();
  try {
    // timeService.executeNextDay() returns an object with time and player data.
    const returnData = await timeService.executeNextDay();
    res.status(200).send({status: "OK", data: returnData});
  } catch (error) {
    res.status(500).send({status: "FAILED", error: error?.message})
  }

}


module.exports = {
  getTime,
  executeNextDay
}