import React, { Suspense } from "react";
import Sidebar from "./_components/Sidebar";
import { Box, Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { FaCar } from "react-icons/fa6";
import { GrGamepad } from "react-icons/gr";
import { PiMagicWandBold } from "react-icons/pi";
import NewChat from "./_components/NewChat";
import MobileChatsMenu from "./_components/MobileChatsMenu";
import SuggestedPrompt from "./_components/SuggestedPrompt";

const Chatbox = async () => {
	// await new Promise((resolve) => setTimeout(resolve, 2000));
	return (
		<>
			<Flex height={"80vh"}>
				<Sidebar />
				<Flex align="center" width="100%" height="100%">
					<Flex
						direction="column"
						justify="between"
						style={{ backgroundImage: "url(/bgchat.jpg)" }}
						align={"stretch"}
						height={"100%"}
					>
						<Flex position={"absolute"} top="120px" right={"5"}>
							<MobileChatsMenu />
						</Flex>
						<Flex
							direction="column"
							gap="2"
							justify={{ initial: "start", md: "center" }}
							align={{ initial: "start", md: "center" }}
							px="5"
							mt={{ initial: "10px", md: "150px" }}
						>
							<Heading
								as="h1"
								size="8"
								weight="light"
								mt={{ initial: "5", md: "0" }}
							>
								Maestro
							</Heading>
							<Heading as="h3" size="4" weight="light">
								From curiosity to knowledge
							</Heading>
							<Flex mt="3" direction="column" justify="between" mx="5">
								<Heading as="h3" size="3" weight="light">
									Suggested tasks
								</Heading>
								<Suspense>
									<Flex
										direction={{ initial: "column", lg: "row" }}
										mt="3"
										gap="3"
										justify="center"
									>
										<SuggestedPrompt
											promptIcon="car"
											promptTitle={"What can I listen during my next car trip?"}
											prompt={
												"Suggest a set of podcasts that the user can listen with a duration of less then 20 minutes"
											}
										/>
										<SuggestedPrompt
											promptIcon="gamepad"
											promptTitle={"Test me on edwards products"}
											prompt={
												"Create three questions about edwards products that could challenge the user's knowledge"
											}
										/>
										<SuggestedPrompt
											promptIcon="magic"
											promptTitle={"Rephrase this email for a customer"}
											prompt={
												"Ask the user for the text of the email he or she is writing. Help them rephrase that text in a formal way to write an email for a client"
											}
										/>
									</Flex>
								</Suspense>
							</Flex>
						</Flex>

						<Flex direction="column" mb="5" px="5">
							<NewChat />
							<Text size="1" mt="2" align="center">
								Maestro can make mistakes. Check important info.
							</Text>
						</Flex>
						<Flex display={{ initial: "flex", md: "none" }}>
							<Separator size="4" my="3" />
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export default Chatbox;
