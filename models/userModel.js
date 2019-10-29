const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Character = require("./characterModel");
const autopopulate = require("mongoose-autopopulate");

let userSchema = new Schema(
    {
        email: { type: String, unique: true },
        hash: { type: String },
        googleId: { type: String, trim: true, index: true, unique: true, sparse: true },
        role: { type: String, enum: ['none', 'member', 'admin'], default: 'none'},
        character: { type: Schema.Types.ObjectId, ref: 'Character', autopopulate: true }
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
