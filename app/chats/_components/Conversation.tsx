import { PersonIcon, RocketIcon } from "@radix-ui/react-icons";
import { Flex, Heading, Box, Text } from "@radix-ui/themes";
import React from "react";

type Chat = {
	id: string;
	name: string;
	messages: Message[];
};

type Message = {
	id: string;
	messageFrom: string;
	content: string;
};

const Conversation = ({
	chat,
	messages,
}: {
	chat: Chat;
	messages: Message[];
}) => {
	const styling = {
		backgroundImage: `url("/glyph.png")`,
		width: "100%",
		height: "100%",
	};
	return (
		<Flex direction="column" mb="3" style={styling}>
			{messages?.map((message) => (
				<Flex
					width="100%"
					key={message.id}
					align="center"
					gap="2"
					p="3"
					className={message.messageFrom === "USER" ? "bg-white" : "bg-gray-50"}
				>
					{message.messageFrom === "USER" ? (
						<PersonIcon></PersonIcon>
					) : (
						<RocketIcon></RocketIcon>
					)}

					<Text>{message.content}</Text>
				</Flex>
			))}
		</Flex>
	);
};

export default Conversation;
