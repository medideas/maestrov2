"use client";
import { Button, Flex } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { Field, Form, Formik } from "formik";
import React from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";

interface Props {
	chatId: string;
}

const Chatbot = ({ chatId }: Props) => {
	const jwt = getCookie("jwt");
	return (
		<Flex justify="between">
			<Formik
				initialValues={{
					prompt: "",
					chatId: chatId,
				}}
				onSubmit={async (values) => {
					console.log(JSON.stringify(values));
					const req = await fetch(
						process.env.NEXT_PUBLIC_APIBASE + "/chatbot/ask/ ",
						{
							headers: {
								"Content-type": "application/json",
								Authorization: "Bearer " + jwt,
							},
							method: "POST",
							body: JSON.stringify(values),
						}
					);
				}}
			>
				<Form className="w-[100%]" style={{ width: "100%" }}>
					<Flex align="center" style={{ width: "100%" }}>
						<Flex direction="column" className="w-[100%]">
							<Flex className="w-[100%]" style={{ width: "100%" }}>
								<HiOutlineDocumentSearch
									className="absolute m-[20px]"
									size="30"
									color="aaa"
								/>
								<Field
									name="name"
									id="name"
									className="chatbot w-[100%]"
									style={{ width: "100%" }}
									placeholder={""}
									autoFocus="true"
									placeholder="              Ask me something"
								/>
							</Flex>
						</Flex>
					</Flex>
				</Form>
			</Formik>
		</Flex>
	);
};

export default Chatbot;
