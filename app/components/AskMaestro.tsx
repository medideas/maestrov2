"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { Formik, Form, Field } from "formik";
import { usePathname, useRouter } from "next/navigation";
import router from "next/router";
import React from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";

const AskMaestro = () => {
	const router = useRouter();
	const jwt = getCookie("jwt");
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
