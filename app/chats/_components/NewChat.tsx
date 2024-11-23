"use client";
import { Button, Flex } from "@radix-ui/themes";
import { Field, Form, Formik } from "formik";
import React from "react";

const NewChat = () => {
	console.log(process.env);
	return (
		<Flex>
			<Formik
				initialValues={{
					name: "",
				}}
				onSubmit={async (values) => {
					await fetch(process.env.APIBASE + "/my/chats/", {
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
