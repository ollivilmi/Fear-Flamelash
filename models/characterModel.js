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
        role: { type: String, enum: ['Tank', 'Healer', 'Melee', 'Ranged']},
    }
)

// This is ugly but useful for mass import from csv
characterSchema.pre('save', function (next) {
    if (this.role === undefined) {
        switch (this.get("class")) {
            case "Warrior":
                this.role = "Tank";
                break;

            case "Rogue":
                this.role = "Melee";
                break;

            case "Hunter":
                this.role = "Ranged";                
                break;

            case "Mage":
                this.role = "Ranged";
                break;

            case "Warlock":
                this.role = "Ranged";
                break;

            case "Priest":
                this.role = "Healer";
                break;

            case "Druid":
                this.role = "Healer";
                break;

            case "Shaman":
                this.role = "Healer";
                break;
        }
    }

    next();
})

module.exports = mongoose.model("Character", characterSchema);