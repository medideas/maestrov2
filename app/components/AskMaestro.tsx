"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import { Formik, Form, Field } from "formik";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { fetchApi } from "../utils/fetchInterceptor";

const AskMaestro = () => {
	const router = useRouter();
	const pathname = usePathname();
	const blockedRoutes = ["/my/chats", "/login", "/logout"];

	const isBlockedRoute = () => {
		let result = false;
		if (!blockedRoutes.indexOf(pathname)) {
			result = true;
		}
		console.log(result);
		return result;
	};
	return (
		<Flex mb="3" px="3">
			<Formik
				initialValues={{
					name: "",
				}}
				onSubmit={async (values) => {
					console.log(JSON.stringify(values));
					const chat = await fetchApi(
						"/my/chats/",
						{
							method: "POST",
							body: JSON.stringify(values)
						}
					);
					console.log(chat);
					console.log(JSON.stringify({ chatId: chat.id, prompt: values.name }));
					try {
						const question = await fetchApi(
							"/chatbot/ask",
							{
								method: "POST",
								body: JSON.stringify({ chatId: chat.id, prompt: values.name })
							}
						);
					} catch (error) {
						console.log(error);
					}
					router.push(`/my/chats/${chat.id}`);
					// if (newChat) redirect("/my/chats");
				}}
			>
				<Form className="w-[100%]">
					<Flex
						className="w-[100%] chatbot shadow-md"
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

export default AskMaestro;
