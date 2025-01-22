  const mongoose = require("mongoose");
  const { Schema } = mongoose;

  const saddlebagSchema = new Schema({
    name: String,
    description: String,
    recover_stamina: Number
  })
   

  module.exports = mongoose.model("Saddlebag", saddlebagSchema);
