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

const Conversation = () => {
	const styling = {
		backgroundImage: `url("/glyph.png")`,
		width: "100%",
		height: "100%",
	};
	return <Flex direction="column" mb="3" style={styling}></Flex>;
};

export default Conversation;
