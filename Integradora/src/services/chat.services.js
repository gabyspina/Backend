import { chatModel } from "../models/chat.model.js";

class ChatService {
    constructor() {
        this.chatModel = chatModel;
    }

    async getAllMessages() {
        return await this.chatModel.find().lean();
    }

    async addMessage(message) {
        return await this.chatModel.create(message);
    }
}

export const chatService = new ChatService();