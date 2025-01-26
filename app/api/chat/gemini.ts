import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with your API key
const API_KEY = 'AIzaSyC00ly55KCQYhuRdD8ZEyzG2bT105Phbmk';

if (!API_KEY) {
  throw new Error('Missing Gemini API key. Please add OPENAI_API_KEY to your .env file');
}

const genAI = new GoogleGenerativeAI(API_KEY);

const DEFAULT_CONFIG = {
  maxOutputTokens: 1000,
  temperature: 0.7,
  topP: 0.8,
  topK: 40,
} as const;

export async function getChatResponse(message: string): Promise<string> {
  if (!message.trim()) {
    throw new Error('Message cannot be empty');
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const chat = model.startChat({
      history: [],
      generationConfig: DEFAULT_CONFIG,
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting chat response:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to get response: ${error.message}`);
    }
    throw new Error('Failed to get response from Gemini');
  }
}