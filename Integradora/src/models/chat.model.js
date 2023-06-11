import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        max: 100,
    },
    message: {
        type: String,
        require: true,
        max: 100,
    }
});

export const chatModel = mongoose.model('chat', chatSchema);