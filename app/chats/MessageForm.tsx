"use client";
import React from "react";
import { useState, useRef } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { messageSchema } from "../validationSchemas";
import { Button, Callout, Flex, Spinner, TextField } from "@radix-ui/themes";
import { Formik, FormikHelpers, FormikValues, useFormik } from "formik";

type Chat = {
	id: string;
	name: string;
};

type MessageFormData = z.infer<typeof messageSchema>;

const MessageForm = ({ chat }: { chat: Chat }) => {
	const router = useRouter();
	const formik = Formik({
        initialValues: id: "";
        onSubmit: function (values: FormikValues, formikHelpers: FormikHelpers<FormikValues>): void | Promise<any> {
            throw new Error("Function not implemented.");
        }
    });
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
						setSubmitting(true);
						await axios.post("/api/messages", data);
						router.refresh();
						setSubmitting(false);
					} catch (error) {
						setSubmitting(false);
						setError("An unexpected error occured");
					}
					ref.current?.reset();
				})}
			>
				<input
					type="hidden"
					{...register("chatId")}
					value={chat && chat.id}
				></input>
				<input type="hidden" {...register("messageFrom")} value="USER"></input>
				<TextField.Root
					placeholder="Let's ask something"
					{...register("content")}
				>
					<TextField.Slot></TextField.Slot>
				</TextField.Root>
				<ErrorMessage>{errors.content?.message}</ErrorMessage>

				<Button disabled={isSubmitting}>
					{!chat ? "Let's start a new chat" : "Let's discuss"}{" "}
					{isSubmitting && <Spinner />}
				</Button>
			</form>
		</Flex>
	);
};

export default MessageForm;
