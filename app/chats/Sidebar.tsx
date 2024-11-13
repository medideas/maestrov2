import { BookmarkIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import { Flex, Box, Card, Text, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import Chatslist from "./_components/ChatsList";

interface Chat {
	id: string;
	title: string;
}

const Sidebar = async () => {
	const data = await fetch("http://localhost:3000/api/chats");
	const chats: Chat[] = await data.json();
	return (
		<>
			<Flex
				pl="3"
				pr="5"
				width="340px"
				className="min-h-80 border-r-[1px] border-gray-500 rounded-md"
				direction="column"
				justify="between"
			>
				<Box className="min-h-[500px]">
					<Heading mb="3">Recent Chats</Heading>
					<Box>
						{!chats && (
							<Text>No chats in here yet: let's start conversation.</Text>
						)}
						<ul className="list-none">
							{chats.map((chat) => (
								<Chatslist id={chat.id} title={chat.title} />
							))}
						</ul>
					</Box>
				</Box>
				<Box>
					<Heading mt="5" mb="3">
						Maestro Apps
					</Heading>
					<Flex direction="column" gap="3">
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
