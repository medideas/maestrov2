import { Flex, Heading, Text, Grid } from "@radix-ui/themes";
import React, { Suspense } from "react";
import Sidebar from "../_components/Sidebar";
import Chatbot from "../_components/Chatbot";
import fetchInterceptor from "@/app/utils/fetchInterceptor";
import { CiUser } from "react-icons/ci";
import { RiRobot2Line } from "react-icons/ri";
import Message from "../_components/Message";

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
			<Suspense>
				<Flex direction="column" p="5" justify="between" className="col-span-3">
					<Flex direction="column">
						<Heading mb="2" size="3">
							{chat.name}
						</Heading>
						{chat.messages.length === 0 && (
							<Text>Let me help you with your research</Text>
						)}

						<Flex direction="column" gap="3">
							{chat.messages.map((message: Message, index: number) => (
								<Message key={message.id} message={message} user={index & 1} />
							))}
						</Flex>
					</Flex>
					<Flex className="w-[100%]" justify={"between"}>
						<Chatbot chatId={chat.id} />
					</Flex>
				</Flex>
			</Suspense>
		</Grid>
	);
};

export default ChatPage;
