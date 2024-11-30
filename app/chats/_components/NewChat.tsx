"use client";
import { Button, Flex } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { Field, Form, Formik } from "formik";
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
					await fetch("https://sviluppo4.arsdue.com" + "/my/chats/", {
						headers: {
							Accept: "application/json",
							Authorization: "Bearer " + jwt,
						},
						method: "POST",
						body: JSON.stringify(values),
					});
				}}
			>
				<Form>
					<Flex align="center" justify="between" width={"100%"}>
						<Field name="name" id="name" />
						<Button type="submit" ml="1">
							Ask me anything
						</Button>
					</Flex>
				</Form>
			</Formik>
		</Flex>
	);
};

export default NewChat;
