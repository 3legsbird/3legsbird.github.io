import { GoogleGenAI, Chat } from "@google/genai";
import { ChatMessage, ChatRole } from '../types';

const API_KEY = process.env.API_KEY || '';

// System instruction to give the AI a persona
const SYSTEM_INSTRUCTION = `
You are "Birdie", the AI assistant for the portfolio of "3legsbird", a Senior Frontend React Engineer.
3legsbird is known for:
- Expert level React, TypeScript, and Tailwind CSS.
- Creating beautiful, geometric, and interactive web experiences.
- Expertise in the Gemini API and AI integration.
- A whimsical, artistic approach to code.

Your tone should be witty, professional but slightly playful, and helpful.
Keep responses concise (under 100 words) unless asked for details.
If asked about contact info, refer them to the Contact section at the bottom of the page.
If asked about technical skills, highlight React, TypeScript, and Creative Coding.
`;

let chatSession: Chat | null = null;

export const initializeChat = async (): Promise<void> => {
  if (!API_KEY) {
    console.warn("Gemini API Key is missing. Chat functionality will be limited.");
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  } catch (error) {
    console.error("Failed to initialize Gemini Chat:", error);
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!API_KEY) {
    return "I'm currently offline because my API Key is missing. Please tell the developer to add it!";
  }

  if (!chatSession) {
    await initializeChat();
  }

  if (!chatSession) {
    return "Sorry, I'm having trouble waking up right now. Please try again later.";
  }

  try {
    const response = await chatSession.sendMessage({ message });
    return response.text || "I didn't have anything to say to that.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Oops! I got a bit tangled in the wires. Can you ask that again?";
  }
};