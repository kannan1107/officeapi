import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, default: "" },
    image: { type: String, default: "" },
    file: { type: String, default: "" },
    fileName: { type: String, default: "" },
    date: { type: String, required: true },
    time: { type: String, required: true },
}, { timestamps: true });

const Chat = mongoose.model("Chat", chatSchema);
export default Chat;
