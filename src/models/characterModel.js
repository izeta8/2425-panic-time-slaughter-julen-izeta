  const mongoose = require("mongoose");
  const { Schema } = mongoose;

  const characterSchema = new Schema({
    name: String,
    occupation: String,
    description: String,
    stats: {
        strength: Number,
        dexterity: Number,
        stamina: Number
    },
    equipment:{
        saddlebag:[
          { type: mongoose.Schema.Types.ObjectId, ref: "saddlebag" },
        ],
        quiver: Number,
        weapons:[
          { type: mongoose.Schema.Types.ObjectId, ref: "weapons" },
        ],
        pouch:{
          coins: Number,
          gold: Number,
          precious_stones:[
            { type: mongoose.Schema.Types.ObjectId, ref: "preciousStones" },
          ]
        },
        miscellaneous: [String]
    }
  })
   

  module.exports = mongoose.model("Character", characterSchema);
