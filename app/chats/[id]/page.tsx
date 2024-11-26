import { Flex, Heading, Text, Grid } from "@radix-ui/themes";
import React from "react";
import Sidebar from "../_components/Sidebar";
import Chatbot from "../_components/Chatbot";

type Message = {
	id: string;
	body: string;
};

const ChatPage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;
	const id = params.id;
	const data = await fetch(process.env.APIBASE + "/my/chats/" + id);
	const chat = await data.json();
	return (
		<Grid columns={{ initial: "1", md: "4" }} className="w-[100%]">
			<Sidebar />
			<Flex direction="column" p="5" justify="between" className="col-span-3">
				<Flex direction="column">
					<Heading mb="2">{chat.name}</Heading>
					{chat.messages ? (
						<Flex direction="column">
							{chat.messages.map((message: Message) => (
								<Flex py="1" key={message.id}>
									{message.body}
								</Flex>
							))}
						</Flex>
					) : (
						<Text>Sorry... no messages in here yet</Text>
					)}
				</Flex>
				<Flex className="w-100%">
					<Chatbot chatId={chat.id} />
				</Flex>
			</Flex>
		</Grid>
	);
};

export default ChatPage;
