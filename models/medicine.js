const mongoose = require("../utilities/mongo_connector")
const schema = {
    name: { type: mongoose.SchemaTypes.String, required: true },
    mfgBy: { type: mongoose.SchemaTypes.String, required: true },
    cost: {
        type: mongoose.SchemaTypes.Decimal128,
        required: true
    }
};
const collectionName = "medicine";
const medicineSchema = mongoose.Schema(schema);
const medicine = mongoose.model(collectionName, medicineSchema);
module.exports = medicine;