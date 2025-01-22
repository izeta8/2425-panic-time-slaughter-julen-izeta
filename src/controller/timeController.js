const timeService = require("../service/timeService");

const getTime = async (req, res) => {
  try {
    const time = await timeService.getTime();
    res.status(200).send({status: "OK", data: time});
  } catch (error) {
    res.status(500).send({status: "FAILED", error: error?.message})
  }
}


module.exports = {
  getTime
}