"use client";

import { toast } from "react-toastify";
import { ClientError } from "./errors";
import { fetchApi } from "../fetchInterceptor";

const createChat = (name: string): Promise<Chat> => fetchApi(
    "/my/chats/",
    {
        method: "POST",
        body: JSON.stringify({ name })
    }
);

const askChatbot = (chatId: string, prompt: string) => fetchApi(
    "/chatbot/ask",
    {
        method: "POST",
        body: JSON.stringify({ chatId, prompt })
    }
);

const getOrCreateChatId = async (chatName: string, chatId?: string) => {
    if (chatId) return chatId;

    const chat = await createChat(chatName);
    return chat?.id;
}

type AskMaestroParams = {
    existingChatId?: string;
    prompt: string;
    chatName: string;
    ask?: boolean;
};

export const askMaestro = async ({
    existingChatId,
    prompt,
	chatName,
    ask = true
}: AskMaestroParams) => {
    try {
        const chatId = await getOrCreateChatId(chatName || prompt, existingChatId);

        if (!chatId) {
            toast.error('Chat could not be created');
            console.error('Chat could not be created');
            return;
        }

        if (ask) {
            await askChatbot(chatId, prompt);
        }

        return chatId;
    } catch (error) {
        if (error instanceof ClientError) {
            const errorMessage = `Failed to start chat: ${errors}`;
            console.error(errorMessage);
            toast.error(errorMessage);
        }
    }
}
