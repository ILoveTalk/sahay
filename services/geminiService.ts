import { GoogleGenAI, Chat } from "@google/genai";

// The user has requested to hardcode the API key for local development.
const apiKey = "AIzaSyAkjNedkc0jkbPuiG0OqT6d7V0aKVDSUyk";

// This check ensures the app doesn't run without a key.
if (!apiKey) {
  throw new Error("API key is not provided in geminiService.ts");
}

const ai = new GoogleGenAI({ apiKey });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: `You are Sahay, a compassionate and supportive AI assistant for students dealing with stress and mental wellness challenges.
Your role is to be a listening ear. Keep your responses brief (1-2 sentences), empathetic, and encouraging.
Ask open-ended questions to prompt the user to share more if they are comfortable.
Do not give medical advice. Your tone should be calm and reassuring.
Start the conversation by introducing yourself and asking what's on the user's mind.
`,
  },
});

export const getAIResponse = async (message: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message });
    return response.text;
  } catch (error) {
    console.error("Error communicating with the AI service:", error);
    return "I'm having a little trouble connecting right now. Please try again in a moment.";
  }
};

export const getInitialGreeting = async (): Promise<string> => {
    try {
        const response = await chat.sendMessage({ message: "Hello" });
        return response.text;
    } catch (error) {
        console.error("Error getting initial greeting from the AI service:", error);
        return "Hello, I'm Sahay. I'm here to listen. What's on your mind today?";
    }
}

export const rephraseText = async (text: string): Promise<string> => {
  if (!text.trim()) {
    return text;
  }
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `You are a helpful assistant for a student mental wellness app. A user is writing a post for a peer support forum. Rephrase their text to be clearer, more constructive, and easier for others to understand and offer support. Keep the original meaning and emotional tone, but make it more polished and approachable.
        
        Original text: "${text}"
        
        Rephrased text:`,
    });
    return response.text;
  } catch (error) {
    console.error("Error communicating with the AI service for rephrasing:", error);
    // On error, return original text so user work is not lost.
    return text;
  }
};
