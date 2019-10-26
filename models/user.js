const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        name: { type: String },
        email: { type: String, unique: true },
        hash: { type: String },
        ep: { type: Number },
        gp: { type: Number },
        googleId: { type: String, trim: true, index: true, unique: true, sparse: true }
    },
    {
        timestamps: true // createdAt, updatedAt automatically added
    }
)

userSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
    const self = this
    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
    })
}

module.exports = mongoose.model("User", userSchema);