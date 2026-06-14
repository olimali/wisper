import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../middleware/auth";
import { Chat } from "../models/chat.model";
import { Message } from "../models/message.model";

export async function getMessages(req: AuthRequest, res: Response, next: NextFunction) {
    try {
        const userId = req?.userId;
        const { chatId } = req.params;

        const chat = await Chat.findOne({ _id: chatId, participants: userId }).populate;

        if (!chat) {
            res.status(404).json({ message: "Chat not found" });
            return;
        }

        const messages = await Message.find({ chat: chatId }).populate("sender", "name avatar email").sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500);
        next(error);
    }
}