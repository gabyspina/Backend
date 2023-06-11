import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    user: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});

const chatModel = mongoose.model("chat", chatSchema);

export default chatModel;
