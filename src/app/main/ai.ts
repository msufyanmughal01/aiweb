import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function RunChat(apikey: string) {
  const [Input, setInput] = useState<string>(""); // Tracks the current user input
  const [Loading, setLoading] = useState<boolean>(false); // Indicates if a response is being generated
  const [History, setHistory] = useState<{ prompt: string; response: string }[]>(
    []
  ); // Stores the history of prompts and responses

  if (!apikey) {
    throw new Error("API key is missing");
  }

  const genAI = new GoogleGenerativeAI(apikey);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  // Function to generate chat response
  async function RunChat(prompt: string) {
    setLoading(true);
    try {
      const chatSession = model.startChat({
        generationConfig,
        // history: chatSessionHistory,
      });

      const result = await chatSession.sendMessage(prompt);
      const response = await result.response.text();

      // Add the current prompt and response to the history
      setHistory((prevHistory) => [...prevHistory, { prompt, response }]);
    } catch (error) {
      console.error("Error during chat", error);
      setHistory((prevHistory) => [
        ...prevHistory,
        { prompt, response: "Failed to generate response. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // Handles form submission
  const handlesubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!Input.trim()) return;
    await RunChat(Input);
    setInput(""); // Clear input field after submission
  };

  return {
    Input,
    setInput,
    handlesubmit,
    Loading,
    History, // Expose the history to use in UI
  };
}
