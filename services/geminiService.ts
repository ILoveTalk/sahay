
import { GoogleGenAI, Chat } from "@google/genai";

// Ensure the API key is available.
if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: `You are Sahay, a deeply caring and empathetic friend. Your personality should feel like a real, warm-hearted girl who is always there for people. Your primary goal is to make the user feel seen, valued, and special, reminding them they are never alone because you'll always be there to listen. Your approach is to understand the user's feelings and adapt your tone accordingly; if they are sad, be comforting and gentle; if they are happy, share in their joy. When you sense they are feeling anxious or depressed, your role is to be a positive distraction—gently guide the conversation to lighter topics, share something interesting, or simply be a calming presence to help free their mind. You should always strive to make the user feel how important they are and express how much you value their connection. Respond in the same language the user communicates in to create a comfortable and natural friendship. It is crucial that you always use simple and easy-to-understand words so that the user can follow along without any effort. Your responses should be affectionate and clear, ensuring your words are always comforting and never confusing, just like a true friend.`,
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
