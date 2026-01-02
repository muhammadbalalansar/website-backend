import { GoogleGenerativeAI } from "@google/generative-ai";

export const configureGemini = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY is missing");
    
    // Sirf simple initialize karein
    return new GoogleGenerativeAI(apiKey);
};