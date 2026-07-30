import Item from "../models/Item.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

export const createItem = async (req, res) => {
    try {
        const data = { ...req.body };
        delete data.inHistory;
        delete data.outHistory;
        if (req.file) data.image = await uploadToCloudinary(req.file.buffer);
        const item = await Item.create(data);
        res.status(201).json({ success: true, item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json({ success: true, items });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Item not found" });
        res.status(200).json({ success: true, item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateItem = async (req, res) => {
    try {
        const data = { ...req.body };
        if (req.file) data.image = await uploadToCloudinary(req.file.buffer);
        const item = await Item.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
        if (!item) return res.status(404).json({ success: false, message: "Item not found" });
        res.status(200).json({ success: true, item });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Item not found" });
        res.status(200).json({ success: true, message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const stockIn = async (req, res) => {
    try {
        const { person, place, quantity, note } = req.body;
        if (!person || !place || !quantity) {
            return res.status(400).json({ success: false, message: "person, place and quantity are required" });
        }
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Item not found" });

        item.quantity += Number(quantity);
        item.inHistory.push({ person, place, quantity, note });
        await item.save();

        res.status(200).json({ success: true, message: "Stock in recorded", quantity: item.quantity, inHistory: item.inHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const stockOut = async (req, res) => {
    try {
        const { person, place, quantity, note } = req.body;
        if (!person || !place || !quantity) {
            return res.status(400).json({ success: false, message: "person, place and quantity are required" });
        }
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Item not found" });
        if (item.quantity < Number(quantity)) {
            return res.status(400).json({ success: false, message: "Insufficient stock" });
        }
        const updated = await Item.findByIdAndUpdate(
            req.params.id,
            { $inc: { quantity: -Number(quantity) }, $push: { outHistory: { person, place, quantity: Number(quantity), note, date: new Date() } } },
            { new: true }
        );
        res.status(200).json({ success: true, message: "Stock out recorded", quantity: updated.quantity, outHistory: updated.outHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getBalance = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).select("itemname partno quantity");
        if (!item) return res.status(404).json({ success: false, message: "Item not found" });
        res.status(200).json({ success: true, itemname: item.itemname, partno: item.partno, balance: item.quantity });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getHistory = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Item not found" });
        res.status(200).json({ success: true, quantity: item.quantity, inHistory: item.inHistory, outHistory: item.outHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
