"use client";
import { Button, Flex, Spinner, Text } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiOutlineDocumentSearch } from "react-icons/hi";

interface Props {
	chatId: string;
}

const Chatbot = ({ chatId }: Props) => {
	const [submitting, setSubmitting] = useState(false);
	const jwt = getCookie("jwt");
	const router = useRouter();
	return (
		<Flex justify="between" width={"100%"} direction={"column"} mt="3">
			{submitting && (
				<Flex
					className="bg-green-200 rounded-full"
					height={"60px"}
					align={"center"}
					px="5"
					gap="3"
					my="3"
					display={submitting}
				>
					<Spinner size="3" />
					<Text>Interrogating the knowledgbase...</Text>
				</Flex>
			)}

			<Formik
				initialValues={{
					prompt: "",
					chatId: chatId,
				}}
				onSubmit={async (values) => {
					setSubmitting(true);
					try {
						const req = await fetch(
							process.env.NEXT_PUBLIC_APIBASE + "/chatbot/ask/ ",
							{
								headers: {
									"Content-type": "application/json",
									Authorization: `Bearer ${jwt}`,
								},
								method: "POST",
								body: JSON.stringify(values),
							}
						);
						console.log(req);
						if (req.ok) {
							const answer = await req.json();
							setSubmitting(false);
							router.push(`/my/chats/${answer.chatId}`);
						} else {
							console.log(req.status, req.statusText);
							setSubmitting(false);
							alert(
								"Something went wrong: we had some issues. Try again in a moment"
							);
						}
					} catch (error) {
						setSubmitting(false);
						console.log(error);
					}

					// window.location.href = "/my/chats/" + answer.chatId;
				}}
			>
				<Form className="w-[100%]" style={{ width: "100%" }}>
					<Flex align="center" style={{ width: "100%" }}>
						<Flex direction="column" className="w-[100%]">
							<Flex
								className="w-[100%] chatbot"
								align={"center"}
								style={{ width: "100%" }}
							>
								<HiOutlineDocumentSearch size="30" color="aaa" />
								<Field
									name="prompt"
									id="prompt"
									className="w-[100%] chatbot border-none"
									style={{ width: "100%" }}
									placeholder={""}
									autoFocus="true"
									placeholder="Ask me something"
									disabled={submitting}
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
