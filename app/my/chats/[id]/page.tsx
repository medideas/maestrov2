import { Flex, Heading, Text, Grid, Separator } from "@radix-ui/themes";
import React, { Suspense } from "react";
import Sidebar from "../_components/Sidebar";
import Chatbot from "../_components/Chatbot";
import { fetchApi } from "@/app/utils/fetchInterceptor";
import Message from "../_components/Message";
import MobileChatsMenu from "../_components/MobileChatsMenu";

type Message = {
	id: string;
	body: string;
};

const ChatPage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;
	const chat = await fetchApi(`/my/chats/${id}`);
	console.log(chat);
	return (
		<Flex minHeight={"80vh"}>
			<Sidebar />

			<Flex
				direction="column"
				p={{ initial: "2", md: "5" }}
				justify="between"
				className="col-span-3"
				width={"100%"}
				minHeight={"100%"}
				style={{ backgroundColor: "white" }}
			>
				<Suspense>
					<Flex
						direction="column"
						height={"100%"}
						style={{
							backgroundImage: "url(/bgchat.jpg)",
							backgroundRepeat: "no-repeat",
							backgroundSize: "contain",
							backgroundColor: "white",
							backgroundPositionY: "100px",
						}}
					>
						<Flex justify={"between"} align={"center"} px="3">
							<Flex direction={"column"}>
								<Heading mb="2" size="4">
									{chat.name}
								</Heading>
								{chat.messages.length === 0 && (
									<Text>Let me help you with your research</Text>
								)}
							</Flex>
							<MobileChatsMenu />
						</Flex>
						<Separator my="3" size="4" />

						<Flex
							direction="column"
							gap="3"
							position={"relative"}
							minWidth={"100%"}
							width={"100%"}
							height={"100%"}
						>
							<Flex
								direction={"column"}
								position={"absolute"}
								width={"100%"}
								minWidth={"100%"}
								height={"100%"}
								overflowY={"scroll"}
							>
								{chat.messages.map((message: Message, index: number) => (
									<Message
										key={message.id}
										message={message}
										user={index & 1}
									/>
								))}
							</Flex>
						</Flex>
					</Flex>
				</Suspense>
				<Flex className="w-[100%]" justify={"between"}>
					<Chatbot chatId={chat.id} />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default ChatPage;
