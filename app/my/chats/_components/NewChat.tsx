"use client";
import { Button, Flex } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { Field, Form, Formik } from "formik";
import { redirect } from "next/navigation";
import React from "react";

const NewChat = () => {
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
							cache: "no-cache",
						}
					);
					// if (newChat) redirect("/my/chats");
				}}
			>
				<Form>
					<Flex align="center" justify="between" width={"100%"}>
						<Field name="name" id="name" />
						<Button type="submit" ml="1">
							Start a new conversation
						</Button>
					</Flex>
				</Form>
			</Formik>
		</Flex>
	);
};

export default NewChat;
