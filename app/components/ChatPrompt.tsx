"use client";

import { Box, Button, Flex, Text, Spinner } from "@radix-ui/themes";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { askMaestro } from "@/app/utils/api/chats";
import { ClientError } from "@/app/utils/api/errors";

interface ChatPromptProps {
	chatId?: string;
	ask?: boolean;
	shadow?: boolean;
}

const ChatAnswerLoading = () => (
	<Flex
		className="bg-green-200 rounded-full"
		height={"60px"}
		align={"center"}
		px="5"
		gap="3"
		my="3"
	>
		<Spinner size="3" />
		<Text>Interrogating the knowledgbase...</Text>
	</Flex>
);

const ChatPrompt = ({
	chatId: existingChatId,
	ask = true,
	shadow = false
}: ChatPromptProps) => {
	const [submitting, setSubmitting] = useState(false);
	const router = useRouter();

	const onSubmit = useCallback(async ({ prompt } : { prompt: string }) => {
		setSubmitting(true);
		try {
			const chatId = await askMaestro({ existingChatId, prompt, ask });

			if (chatId) {
				router.push(`/my/chats/${chatId}`);
			}
		} catch (error) {
			if (error instanceof ClientError) {
				toast.error(`Question failed: ${error?.body?.message}`);
			}
		}
		setSubmitting(false);
	}, [existingChatId]);

	return (
		<Flex justify="between" width="100%" direction="column" mt="3">
			{submitting && <ChatAnswerLoading />}
			<Formik
				initialValues={{
					prompt: "",
				}}
				onSubmit={onSubmit}
			>
				<Form className={`w-[100%] chatbot ${shadow ? "shadow-md" : ""}`}>
					<HiOutlineDocumentSearch size="30" color="aaa" />
					<Field
						name="prompt"
						id="prompt"
						className="w-[100%] chatbot border-none"
						style={{ width: "100%" }}
						autoFocus="true"
						placeholder="Ask me something"
					/>
				</Form>
			</Formik>
		</Flex>
	);
};

export default ChatPrompt;
