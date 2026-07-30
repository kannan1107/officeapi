import Chat from "../models/Chat.js";
import mongoose from "mongoose";

export const addMessage = async (req, res) => {
    try {
        const { receiver, text } = req.body;
        const sender = req.user.id;
        const isImage = req.file && req.file.mimetype.startsWith('image/');
        const image = isImage ? `/uploads/${req.file.filename}` : "";
        const file = !isImage && req.file ? `/uploads/${req.file.filename}` : "";
        const fileName = req.file ? req.file.originalname : "";

        if (!text && !image && !file)
            return res.status(400).json({ message: "Text, image or file is required" });

        const now = new Date();
        const date = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
        const time = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

        const savedChat = await Chat.create({ sender, receiver, text: text || "", image, file, fileName, date, time });
        res.status(201).json(savedChat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getConversation = async (req, res) => {
    try {
        const { sender, receiver } = req.params;
        const conversation = await Chat.find({
            $or: [
                { sender: new mongoose.Types.ObjectId(sender), receiver: new mongoose.Types.ObjectId(receiver) },
                { sender: new mongoose.Types.ObjectId(receiver), receiver: new mongoose.Types.ObjectId(sender) }
            ]
        }).sort({ createdAt: 1 });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const msg = await Chat.findById(id);
        if (!msg) return res.status(404).json({ message: 'Message not found' });
        if (msg.sender.toString() !== req.user.id)
            return res.status(403).json({ message: 'Not authorized' });
        await msg.deleteOne();
        res.status(200).json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const msg = await Chat.findById(id);
        if (!msg) return res.status(404).json({ message: 'Message not found' });
        if (msg.sender.toString() !== req.user.id)
            return res.status(403).json({ message: 'Not authorized' });
        msg.text = text;
        await msg.save();
        res.status(200).json(msg);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}