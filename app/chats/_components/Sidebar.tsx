import { BookmarkIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import { Flex, Box, Card, Text, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import Chatslist from "./ChatsList";
import fetchInterceptor from "@/app/utils/fetchInterceptor";

interface Chat {
	id: string;
	name: string;
}

const Sidebar = async () => {
	const chats = await fetchInterceptor(process.env.APIBASE + "/my/chats");
	return (
		<>
			<Flex
				px="5"
				py="2"
				width="340px"
				className="min-h-80 border-r-[1px] border-gray-300 bg-stone-200"
				direction="column"
				justify="between"
			>
				<Box className="min-h-[500px]">
					<Heading mb="3" size="4" weight="light">
						Recent Chats
					</Heading>
					<Box>
						{!chats && (
							<Text>No chats in here yet: let's start conversation.</Text>
						)}
						<ul className="list-none">
							{chats.map((chat: Chat) => (
								<Chatslist chat={chat} key={chat.id} />
							))}
						</ul>
					</Box>
				</Box>
				<Box>
					<Heading mt="5" mb="3">
						Maestro Apps
					</Heading>
					<Flex direction="column" gap="3" mb="3">
						<Card size="1">
							<Flex gap="3" align="center">
								<BookmarkIcon />
								<Box>
									<Text as="div" size="2" color="gray">
										Summarize a book
									</Text>
								</Box>
							</Flex>
						</Card>
						<Card size="1">
							<Flex gap="3" align="center">
								<LightningBoltIcon />
								<Box>
									<Text as="div" size="2" color="gray">
										Summarize a book
									</Text>
								</Box>
							</Flex>
						</Card>
						<Card size="1">
							<Flex gap="3" align="center">
								<BookmarkIcon />
								<Box>
									<Text as="div" size="2" color="gray">
										Summarize a book
									</Text>
								</Box>
							</Flex>
						</Card>
					</Flex>
				</Box>
			</Flex>
		</>
	);
};

export default Sidebar;
