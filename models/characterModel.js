const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema(
    {
        name: { type: String, unique: true },
        level: { type: Number, min: 1, max: 60, default: 60 },
        ep: { type: Number, default: 0 },
        gp: { type: Number, default: 0 },
        class: { type: String, enum: [
                'warrior', 
                'rogue', 
                'hunter', 
                'mage', 
                'warlock', 
                'priest', 
                'druid', 
                'shaman'
        ]},
        role: { type: String, enum: ['tank', 'healer', 'melee', 'ranged'] },
    }
)

module.exports = mongoose.model("Character", characterSchema);