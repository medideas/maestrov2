import React from "react";
import Sidebar from "./Sidebar";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import NewConversation from "./_components/NewConversation";
import MessageForm from "./MessageForm";
import NewChatForm from "./NewChatForm";

const Chatbox = () => {
	return (
		<>
			<Flex>
				<Sidebar />
				<Flex direction="column" px="5" width="100%">
					<Flex className="mt-[20%] mb-[25%]" direction="column-reverse">
						<NewConversation />
					</Flex>

					<Box width="100%">
						<NewChatForm />
					</Box>
				</Flex>
			</Flex>
		</>
	);
};

export default Chatbox;
