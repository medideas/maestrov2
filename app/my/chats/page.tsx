import React, { Suspense } from "react";
import Sidebar from "./_components/Sidebar";
import { Box, Card, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import { FaCar } from "react-icons/fa6";
import { GrGamepad } from "react-icons/gr";
import { PiMagicWandBold } from "react-icons/pi";
import NewChat from "./_components/NewChat";
import MobileChatsMenu from "./_components/MobileChatsMenu";

const Chatbox = async () => {
	// await new Promise((resolve) => setTimeout(resolve, 2000));
	return (
		<>
			<Flex height={"100vh"}>
				<Sidebar />
				<Flex align="center" width="100%">
					<Flex
						direction="column"
						justify="between"
						style={{ backgroundImage: "url(/bgchat.jpg)" }}
					>
						<Flex py="5" justify={{ initial: "start", md: "center" }}>
							<Flex position={"absolute"} top="120px" right={"5"}>
								<MobileChatsMenu />
							</Flex>
							<Flex
								direction="column"
								gap="2"
								justify={{ initial: "start", md: "center" }}
								align={{ initial: "start", md: "center" }}
								px="5"
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
							</Flex>
						</Flex>
						<Flex display={{ initial: "flex", md: "none" }}>
							<Separator size="4" my="3" />
						</Flex>
						<Flex mt="3" direction="column" justify="between" mx="5">
							<Heading as="h3" size="3" weight="light">
								Suggested tasks
							</Heading>
							<Suspense>
								<Flex
									direction={{ initial: "column", md: "row" }}
									mt="3"
									gap="3"
									justify="center"
								>
									<Box
										width="350px"
										className="align-middle hover:scale-105 transition-all duration-200"
									>
										<Card className="shadow-lg md:h-[150px] h-[80px] bg-slate-300 hover:bg-slate-100 duration-200">
											<Flex
												direction={{ initial: "row", md: "column" }}
												gap="3"
												p={{ initial: "1", md: "3" }}
												align={{ initial: "center", md: "start" }}
											>
												<FaCar size="30" />
												<Text size={{ initial: "3", md: "4" }}>
													What can I listen to during my next car trip?
												</Text>
											</Flex>
										</Card>
									</Box>
									<Box
										width="350px"
										className="align-middle  hover:scale-105 transition-all duration-200"
									>
										<Card className="shadow-lg md:h-[150px] h-[80px] bg-slate-300 hover:bg-slate-100 duration-200">
											<Flex
												direction={{ initial: "row", md: "column" }}
												gap="3"
												p={{ initial: "1", md: "3" }}
												align={{ initial: "center", md: "start" }}
											>
												<GrGamepad size="30" />
												<Text>Test me on Edwards products!</Text>
											</Flex>
										</Card>
									</Box>
									<Box
										width="350px"
										className="align-middle  hover:scale-105 transition-all duration-200"
									>
										<Card className="shadow-lg md:h-[150px] h-[80px] bg-slate-300 hover:bg-slate-100 duration-200">
											<Flex
												direction={{ initial: "row", md: "column" }}
												gap="3"
												p={{ initial: "1", md: "3" }}
												align={{ initial: "center", md: "start" }}
											>
												<PiMagicWandBold size="30" />
												<Text>Rephrase this email for a customer</Text>
											</Flex>
										</Card>
									</Box>
								</Flex>
							</Suspense>
							<Flex className="mt-[200px]" direction="column">
								<NewChat />
								<Text size="1" mt="2" align="center">
									Maestro can make mistakes. Check important info.
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
};

export default Chatbox;
