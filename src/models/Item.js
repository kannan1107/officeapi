import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    person: { type: String },
    place: { type: String },
    quantity: { type: Number },
    date: { type: Date, default: Date.now },
    note: { type: String },
}, { _id: true });

const itemSchema = new mongoose.Schema({
    itemname: { type: String, required: true },
    description: { type: String },
    batch: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String },
    partno: { type: String, required: true },
    alternativePart: { type: String },
    condition: { type: String },
    quantity: { type: Number, default: 0 },
    status: { type: String },
    location: { type: String },
    locationId: { type: String },
    place: { type: String },
    placeId: { type: String },
    selfLife: { type: String },
    inHistory: [historySchema],
    outHistory: [historySchema],
}, { timestamps: true });

itemSchema.virtual('balance').get(function () {
    const out = (this.outHistory || []).reduce((s, h) => s + (h.quantity || 0), 0);
    return (this.quantity || 0) - out;
});

itemSchema.set('toJSON', { virtuals: true });
itemSchema.set('toObject', { virtuals: true });

const Item = mongoose.model("Item", itemSchema);

export default Item;
