"use client";
import { Flex } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";

type Chat = {
	id: String;
};

const NewChat = () => {
	const router = useRouter();
	const jwt = getCookie("jwt");
	return (
		<Flex>
			<Formik
				initialValues={{
					name: "",
				}}
				onSubmit={async (values) => {
					console.log(JSON.stringify(values));
					const newChat = await fetch(
						process.env.NEXT_PUBLIC_APIBASE + "/my/chats/",
						{
							headers: {
								"Content-type": "application/json",
								Authorization: "Bearer " + jwt,
							},
							method: "POST",
							body: JSON.stringify(values),
							cache: "no-store",
						}
					);
					const chatId = await newChat.json();
					console.log(chatId);
					router.push(`/my/chats/${chatId.id}`);
					// if (newChat) redirect("/my/chats");
				}}
			>
				<Form className="w-[100%]">
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
