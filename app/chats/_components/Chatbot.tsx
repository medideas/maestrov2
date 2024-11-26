"use client";
import { Button, Flex } from "@radix-ui/themes";
import { Field, Form, Formik } from "formik";
import React from "react";

interface Props {
	chatId: string;
}

const Chatbot = ({ chatId }: Props) => {
	return (
		<Flex justify="between">
			<Formik
				initialValues={{
					prompt: "",
					chatId: chatId,
				}}
				onSubmit={async (values) =>
					await fetch(process.env.APIBASE + "/chatbot/ask/ ", {
						method: "POST",
						body: JSON.stringify(values),
					})
				}
			>
				<Form>
					<Flex align="center" className="w-100%">
						<Flex direction="column" className="w-100%">
							<div>
								<Field type="hidden" name="chatId" value="chatId" />
							</div>
							<div className="m-0 p-0 min-w-100%">
								<Field name="prompt" className="border-2 mx-3" />
							</div>
						</Flex>
						<Button type="submit" ml="5">
							Chat
						</Button>
					</Flex>
				</Form>
			</Formik>
		</Flex>
	);
};

export default Chatbot;
