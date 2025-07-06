const mongoose = require("mongoose");

function autoIncrementId(modelName) {
    return async function (next) {
        if (!this.isNew) return next();

        const { value } = await mongoose.connection
        .collection("counters")
        .findOneAndUpdate(
            { _id: modelName },
            { $inc: { seq: 1 } },
            { upsert: true, returnDocument: "after" }
        );

        this._id = value.seq;
        next();
    };
}

module.exports = autoIncrementId;
