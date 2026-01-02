import { Request, Response, NextFunction } from "express";
import User from "../models/user-model.js";
import axios from "axios";

export const generateChatCompletion = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { message } = req.body;

        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not registered" });

        const apiKey = process.env.GEMINI_API_KEY;
        
        // ✅ CORRECTED LINE 19 (use available model):
       // ✅ SAHI MODEL NAME:
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

//                                   ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑
// YAHAN "gemini-2.0-flash-exp" HONA CHAHIYEss

        const contents = user.chats.map((chat: any) => ({
            role: chat.role === "assistant" ? "model" : "user",
            parts: [{ text: chat.content }],
        }));

        contents.push({ role: "user", parts: [{ text: message }] });

        // API Call
        const response = await axios.post(url, { contents });

        const chatResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!chatResponse) {
            return res.status(500).json({ message: "AI response format error" });
        }

        user.chats.push({ content: message, role: "user" });
        user.chats.push({ content: chatResponse, role: "assistant" });
        await user.save();

        return res.status(200).json({ chats: user.chats });
    } catch (error: any) {
        console.log("--- GOOGLE API ERROR START ---");
        console.log(error.response?.data || error.message);
        console.log("--- GOOGLE API ERROR END ---");
        
        const errorMsg = error.response?.data?.error?.message || error.message;
        return res.status(500).json({ message: "AI Error: " + errorMsg });
    }
};

// Get All Chats
export const getAllChats = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not registered" });
        return res.status(200).json({ message: "OK", chats: user.chats });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

// Delete All Chats
export const deleteAllChats = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not registered" });
        // @ts-ignore
        user.chats = [];
        await user.save();
        return res.status(200).json({ message: "OK", chats: user.chats });
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};