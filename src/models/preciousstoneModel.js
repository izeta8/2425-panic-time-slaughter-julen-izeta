  const mongoose = require("mongoose");
  const { Schema } = mongoose;

  const preciousStoneSchema = new Schema({
    name: String,
    description: String,
    value: Number
  })
   

  module.exports = mongoose.model("PreciousStone", preciousStoneSchema);
