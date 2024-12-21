"use client";

import { toast } from "react-toastify";
import { ClientError } from "./errors";
import { fetchApi } from "../fetchInterceptor";

export const createChat = (name: string): Promise<Chat> => fetchApi(
    "/my/chats/",
    {
        method: "POST",
        body: JSON.stringify({ name })
    }
);

export const askChatbot = (chatId: string, prompt: string) => fetchApi(
    "/chatbot/ask",
    {
        method: "POST",
        body: JSON.stringify({ chatId, prompt })
    }
);

export const startNewChat = async (prompt: string, promptTitle?: string) => {
    try {
        const chat = await createChat(promptTitle || prompt);
        const chatId = chat?.id;

        if (!chatId) {
            toast.error('Chat could not be created');
            console.error('Chat could not be created');
            return;
        }

        await askChatbot(chatId, prompt);

        return chat;
    } catch (error) {
        if (error instanceof ClientError) {
            const errorMessage = `Failed to start chat: ${errors}`;
            console.error(errorMessage);
            toast.error(errorMessage);
        }
    }
}
