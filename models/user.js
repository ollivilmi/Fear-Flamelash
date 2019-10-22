const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Role = require("./role");

let userSchema = new Schema(
    {
        name: { type: String, unique: true },
        ep: { type: Number },
        gp: { type: Number },
    },
    {
        timestamps: true // createdAt, updatedAt automatically added
    }
)

module.exports = mongoose.model("User", userSchema);