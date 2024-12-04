import React, { Suspense } from "react";
import Sidebar from "./_components/Sidebar";
import { Grid, Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { FaCar } from "react-icons/fa6";
import { GrGamepad } from "react-icons/gr";
import { PiMagicWandBold } from "react-icons/pi";
import NewChat from "./_components/NewChat";

const Chatbox = async () => {
	// await new Promise((resolve) => setTimeout(resolve, 2000));
	return (
		<>
			<Grid columns={{ initial: "1", md: "4" }}>
				<Sidebar />
				<Flex align="center" width="100%">
					<Flex direction="column" justify="between">
						<Flex direction="column" gap="2">
							<Heading as="h1" size="8" weight="light" align="center">
								Maestro
							</Heading>
							<Heading as="h3" size="4" weight="light" align="center">
								From curiosity to knowledge
							</Heading>
						</Flex>
						<Flex mt="3" direction="column" justify="between" mx="5">
							<Heading as="h3" size="3" weight="light">
								Suggested tasks
							</Heading>
							<Suspense>
								<Flex mt="3" gap="3" justify="center">
									<Box
										width="350px"
										className="align-middle hover:scale-105 transition-all duration-200"
									>
										<Card className="shadow-lg h-[150px]">
											<Flex direction="column" gap="3" p="3">
												<FaCar size="30" />
												<Text>
													What can I listen to during my next car trip?
												</Text>
											</Flex>
										</Card>
									</Box>
									<Box
										width="350px"
										className="align-middle hover:scale-105 transition-all duration-200"
									>
										<Card className="shadow-lg h-[150px]">
											<Flex direction="column" gap="3" p="3">
												<GrGamepad size="30" />
												<Text>Test me on Edwards products!</Text>
											</Flex>
										</Card>
									</Box>
									<Box
										width="350px"
										className="align-middle hover:scale-105 transition-all duration-200"
									>
										<Card className="shadow-lg h-[150px]">
											<Flex direction="column" gap="3" p="3">
												<PiMagicWandBold size="30" />
												<Text>Rephrase this email for a customer</Text>
											</Flex>
										</Card>
									</Box>
								</Flex>
							</Suspense>
							<Flex className="mt-[250px]" direction="column">
								<NewChat />
								<Text size="1" mt="2" align="center">
									Maestro can make mistakes. Check important info.
								</Text>
							</Flex>
						</Flex>
					</Flex>
				</Flex>
			</Grid>
		</>
	);
};

export default Chatbox;
