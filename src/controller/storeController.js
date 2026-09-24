import Store from "../models/Store.js";

export const createStore = async (req, res) => {
    try {
        const store = await Store.create(req.body);
        res.status(201).json({ success: true, store });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllStores = async (req, res) => {
    try {
        const stores = await Store.find();
        res.status(200).json({ success: true, stores });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getStoreById = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) return res.status(404).json({ success: false, message: "Store not found" });
        res.status(200).json({ success: true, store });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateStore = async (req, res) => {
    try {
        const store = await Store.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after', runValidators: true });
        if (!store) return res.status(404).json({ success: false, message: "Store not found" });
        res.status(200).json({ success: true, store });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteStore = async (req, res) => {
    try {
        const store = await Store.findByIdAndDelete(req.params.id);
        if (!store) return res.status(404).json({ success: false, message: "Store not found" });
        res.status(200).json({ success: true, message: "Store deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Stock IN — add items, record who brought it, from which place
export const stockIn = async (req, res) => {
    try {
        const { person, place, quantity, note } = req.body;
        if (!person || !place || !quantity) {
            return res.status(400).json({ success: false, message: "person, place and quantity are required" });
        }

        const store = await Store.findById(req.params.id);
        if (!store) return res.status(404).json({ success: false, message: "Store not found" });

        store.quantity += Number(quantity);
        store.inHistory.push({ person, place, quantity, note });
        await store.save();

        res.status(200).json({
            success: true,
            message: "Stock in recorded",
            quantity: store.quantity,
            inHistory: store.inHistory,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Stock OUT — remove items, record who took it, to which place
export const stockOut = async (req, res) => {
    try {
        const { person, place, quantity, note } = req.body;
        if (!person || !place || !quantity) {
            return res.status(400).json({ success: false, message: "person, place and quantity are required" });
        }

        const store = await Store.findById(req.params.id);
        if (!store) return res.status(404).json({ success: false, message: "Store not found" });

        if (store.quantity < quantity) {
            return res.status(400).json({ success: false, message: "Insufficient stock" });
        }

        store.quantity -= Number(quantity);
        store.outHistory.push({ person, place, quantity, note });
        await store.save();

        res.status(200).json({
            success: true,
            message: "Stock out recorded",
            quantity: store.quantity,
            outHistory: store.outHistory,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update place of a store item
export const updatePlace = async (req, res) => {
    try {
        const { place, placeId } = req.body;
        if (!place) return res.status(400).json({ success: false, message: "place is required" });

        const store = await Store.findByIdAndUpdate(
            req.params.id,
            { place, placeId },
            { returnDocument: 'after' }
        );
        if (!store) return res.status(404).json({ success: false, message: "Store not found" });

        res.status(200).json({ success: true, message: "Place updated", store });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getBalance = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id).select("name partno quantity");
        if (!store) return res.status(404).json({ success: false, message: "Store not found" });
        res.status(200).json({ success: true, name: store.name, partno: store.partno, balance: store.quantity });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getInAndOutHistory = async (req, res) => {
    try {
        const store = await Store.findById(req.params.id);
        if (!store) return res.status(404).json({ success: false, message: "Store not found" });

        res.status(200).json({
            success: true,
            quantity: store.quantity,
            inHistory: store.inHistory,
            outHistory: store.outHistory,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
