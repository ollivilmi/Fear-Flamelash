const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const characterSchema = new Schema(
    {
        name: { type: String, unique: true },
        level: { type: Number, min: 1, max: 60, default: 60 },
        ep: { type: Number, default: 0 },
        gp: { type: Number, default: 0 },
        priority: { type: Number, default: 0},
        rank: { type: String, default: "member"},
        class: { type: String, enum: [
                'Warrior', 
                'Rogue', 
                'Hunter', 
                'Mage', 
                'Warlock', 
                'Priest', 
                'Druid', 
                'Shaman'
        ], required: true},
        role: { type: String, enum: ['tank', 'healer', 'melee', 'ranged'], required: true, default: "melee" },
    }
)

module.exports = mongoose.model("Character", characterSchema);