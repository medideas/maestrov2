import { Box, Flex, Separator, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { CiUser } from "react-icons/ci";
import { IoChevronUpCircleSharp, IoDocumentTextOutline } from "react-icons/io5";
import { PiRobotFill } from "react-icons/pi";
import { RiRobot3Line } from "react-icons/ri";

const Message = ({ message, user }: { message: Message; user: boolean }) => {
	console.log(message);
	return (
		<Flex
			direction={"column"}
			className={
				user
					? "bg-slate-50 rounded-2xl hover:shadow-md duration-150 hover:translate-y-[-2px]"
					: ""
			}
		>
			<Flex
				p="2"
				px="4"
				gap="4"
				align="center"
				justify={user ? "end" : "start"}
				direction={user ? "row" : "row-reverse"}
			>
				<Box width={"50px"}>
					{user ? <RiRobot3Line size="20" /> : <CiUser size="20" />}
				</Box>
				<Text as="p" style={{ lineHeight: "2em" }}>
					{message.text}
				</Text>
			</Flex>
			{message.citations.length > 0 && (
				<Flex direction={"column"} px="5" mb="2">
					<Flex>
						{message.citations.map(
							(citation) =>
								citation.references.length > 0 && (
									<Flex
										gap="2"
										pb="3"
										pl="5"
										direction={"column"}
										align="center"
									>
										<Separator size="4" mb="3" />
										<Flex>
											<Box width={"50px"} m="2">
												<IoDocumentTextOutline size="30" color="bbb" />
											</Box>
											<Flex direction={"column"}>
												<Link
													className="underline mt-2"
													href={`/articles/${citation.references[0]?.article?.id}`}
												>
													<Text size="2" weight={"medium"}>
														{citation.references[0]?.article?.title}
													</Text>
												</Link>
											</Flex>
										</Flex>
									</Flex>
								)
						)}
					</Flex>
				</Flex>
			)}
		</Flex>
	);
};

export default Message;
