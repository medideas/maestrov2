"use client";

import { Flex } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { startNewChat } from "@/app/utils/api/chats";

const NewChat = () => {
	const router = useRouter();
	const jwt = getCookie("jwt");
	const ref = useRef<HTMLFormElement>(null);
	return (
		<Flex>
			<Formik
				initialValues={{
					name: "",
				}}
				onSubmit={async ({ name: prompt }) => {
					ref.current?.reset();
					const chat = await startNewChat(prompt);

					if (chat?.id) {
						router.push(`/my/chats/${chat?.id}`);
					}
				}}
			>
				<Form className="w-[100%]" ref={ref}>
					<Flex
						className="w-[100%] chatbot"
						align={"center"}
						style={{ width: "100%" }}
					>
						<HiOutlineDocumentSearch size="30" color="aaa" />
						<Field
							name="name"
							id="prompt"
							className="w-[100%] chatbot border-none"
							style={{ width: "100%" }}
							autoFocus="true"
							placeholder="Ask me something"
						/>
					</Flex>
				</Form>
			</Formik>
		</Flex>
	);
};

export default NewChat;
