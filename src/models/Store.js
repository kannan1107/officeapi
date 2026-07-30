import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    person: { type: String, required: true },
    place: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    note: { type: String },
}, { _id: true });

const storeSchema = new mongoose.Schema({
    itemname: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    partno: { type: String, required: true },
    alternativePart: { type: String },
    condition: { type: String, required: true },
    quantity: { type: Number, required: true, default: 0 },
    status: { type: String, required: true },
    location: { type: String, required: true },
    locationId: { type: String },
    place: { type: String, required: true },
    placeId: { type: String },
    selfLife: { type: String },
    inHistory: [historySchema],
    outHistory: [historySchema],
}, { timestamps: true });

const Store = mongoose.model("Store", storeSchema);

export default Store;
