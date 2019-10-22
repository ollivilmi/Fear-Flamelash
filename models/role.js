const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let roleSchema = new Schema(
    {
        name: { type: String, unique: true },
        permission: { type: String }
    }
)

module.exports = mongoose.model("Role", roleSchema);