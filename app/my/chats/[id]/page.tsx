import { Flex, Heading, Text, Grid } from "@radix-ui/themes";
import React from "react";
import Sidebar from "../_components/Sidebar";
import Chatbot from "../_components/Chatbot";
import fetchInterceptor from "@/app/utils/fetchInterceptor";
import { CiUser } from "react-icons/ci";
import { RiRobot2Line } from "react-icons/ri";

type Message = {
	id: string;
	body: string;
};

const ChatPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;
	console.log(id);
	const chat = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/my/chats/${id}`
	);
	return (
		<Grid columns={{ initial: "1", md: "4" }} className="w-[100%]">
			<Sidebar />
			<Flex direction="column" p="5" justify="between" className="col-span-3">
				<Flex direction="column">
					<Heading mb="2" size="3">
						{chat.name}
					</Heading>
					{chat.messages.length === 0 && (
						<Text>Let me help you with your research</Text>
					)}

					<Flex direction="column" gap="3">
						{chat.messages.map((message: Message) => (
							<Flex
								p="2"
								px="4"
								gap="4"
								key={message.id}
								align="center"
								justify={message.type === "question" ? "start" : "end"}
								className={message.type === "question" && "bg-slate-100"}
								direction={message.type === "question" ? "row-reverse" : "row"}
							>
								{message.type === "question" ? (
									<CiUser size="22" />
								) : (
									<RiRobot2Line size="50" />
								)}

								<Text as="p" style={{ lineHeight: "2em" }}>
									{message.text}
								</Text>
							</Flex>
						))}
					</Flex>
				</Flex>
				<Flex className="w-[100%]" justify={"between"}>
					<Chatbot chatId={chat.id} />
				</Flex>
			</Flex>
		</Grid>
	);
};

export default ChatPage;
