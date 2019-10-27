const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");

let eventSchema = new Schema(
    {
        name: { type: String },
        description: { type: String },
        start: Date,
        end: Date,
        signups: []
    },
    {
        timestamps: true // createdAt, updatedAt automatically added
    }
)

eventSchema.statics.findOneOrCreate = function findOneOrCreate(condition, callback) {
    const self = this
    self.findOne(condition, (err, result) => {
        return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
    })
}

eventSchema.plugin(autopopulate);

module.exports = mongoose.model("Event", eventSchema);