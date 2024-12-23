import { BookmarkIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import { Flex, Box, Card, Text, Heading } from "@radix-ui/themes";
import React, { cache } from "react";
import Chatslist from "./ChatsList";
import { fetchApi } from "@/app/utils/fetchInterceptor";

const Sidebar = async () => {
	const chats = await fetchApi("/my/chats");
	return (
		<>
			<Flex
				display={{ initial: "none", md: "flex" }}
				px="5"
				py="2"
				width={"340px"}
				minWidth={"340px"}
				className="min-h-80 border-r-[1px] border-gray-300 bg-stone-200"
				direction="column"
				justify="between"
			>
				<Box className="min-h-[500px]">
					<Heading mb="3" size="4" weight="light">
						Recent Chats
					</Heading>
					<Box>
						{chats.length === 0 && (
							<Text size="2">
								No chats in here yet
								<br />
								Let's start conversation.
							</Text>
						)}
						<ul className="list-none">
							{chats.map((chat: Chat) => (
								<Chatslist chat={chat} key={chat.id} />
							))}
						</ul>
					</Box>
				</Box>
			</Flex>
		</>
	);
};

export default Sidebar;
