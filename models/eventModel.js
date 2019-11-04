const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autopopulate = require("mongoose-autopopulate");
const Character = require("./characterModel");

const signupSchema = new Schema(
    {
        character: { type: Schema.Types.ObjectId, ref: 'Character', autopopulate: true, required: true },
        status: { type: String, enum: ["accepted", "tentative", "declined"], required: true}
    },
    {
        timestamps: true // createdAt, updatedAt
    }
)

const eventSchema = new Schema(
    {
        title: { type: String },
        description: { type: String },
        start: Date,
        end: Date,
        signups: [signupSchema]
    },
    {
        timestamps: true // createdAt, updatedAt
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