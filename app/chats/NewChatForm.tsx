"use client";
import React from "react";
import { useState, useRef } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { chatSchema } from "../validationSchemas";
import { Button, Callout, Flex, Spinner, TextField } from "@radix-ui/themes";

type ChatFormData = z.infer<typeof chatSchema>;

const MessageForm = () => {
	const router = useRouter();
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<ChatFormData>({ resolver: zodResolver(chatSchema) });
	const [error, setError] = useState("");
	const [isSubmitting, setSubmitting] = useState(false);
	const ref = useRef<HTMLFormElement>(null);

	return (
		<Flex direction="column" width="100%">
			{error && (
				<Callout.Root color="red">
					<Callout.Icon></Callout.Icon>
					<Callout.Text size="1">{error}</Callout.Text>
				</Callout.Root>
			)}
			<form
				ref={ref}
				className="space-y-3 w-100"
				onSubmit={handleSubmit(async (data) => {
					try {
						console.log("click");
						setSubmitting(true);
						const newChat = await axios.post("/api/chats", data);
						router.push("/chats/" + newChat.data.id);
						setSubmitting(false);
					} catch (error) {
						setSubmitting(false);
						setError("An unexpected error occured");
					}
					ref.current?.reset();
				})}
			>
				<TextField.Root
					placeholder="Let's ask something"
					{...register("title")}
					autoFocus
				>
					<TextField.Slot></TextField.Slot>
				</TextField.Root>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>

				<Button disabled={isSubmitting}>
					Let's start a new chat {isSubmitting && <Spinner />}
				</Button>
			</form>
		</Flex>
	);
};

export default MessageForm;
