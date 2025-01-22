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
          { type: mongoose.Schema.Types.ObjectId, ref: "Saddlebag" },
        ],
        quiver: Number,
        weapons:[
          { type: mongoose.Schema.Types.ObjectId, ref: "Weapon" },
        ],
        pouch:{
          coins: Number,
          gold: Number,
          precious_stones:[
            { type: mongoose.Schema.Types.ObjectId, ref: "PreciousStone" },
          ]
        },
        miscellaneous: [String]
    }
  })
   

  module.exports = mongoose.model("Character", characterSchema);
