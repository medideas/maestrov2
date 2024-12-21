"use client";

import { Box, Card, Flex, Link, Text } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { FaMagic } from "react-icons/fa";
import { FaCar, FaGamepad } from "react-icons/fa6";
import { startNewChat } from "@/app/utils/api/chats";

const SuggestedPrompt = ({
	promptTitle,
	prompt,
	promptIcon,
}: {
	promptTitle: string;
	promptIcon: string;
	prompt: string;
}) => {
	const jwt = getCookie("jwt");
	const router = useRouter();
	const handleClick = useCallback(async () => {
		const chat = await startNewChat(prompt, promptTitle);

		if (chat?.id) {
			router.push(`/my/chats/${chat?.id}`);
		}
	}, []);

	return (
		<Box
			width="350px"
			className="align-middle hover:scale-105 transition-all duration-200"
		>
			<Link onClick={handleClick} color="gray">
				<Card className="shadow-lg md:h-[150px] h-[80px] bg-slate-300 hover:bg-slate-100 duration-200">
					<Flex
						direction={{ initial: "row", md: "column" }}
						gap="3"
						p={{ initial: "1", md: "3" }}
						align={{ initial: "center", md: "start" }}
					>
						{promptIcon === "car" && <FaCar size="30" />}
						{promptIcon === "gamepad" && <FaGamepad size="30" />}
						{promptIcon === "magic" && <FaMagic size="30" />}

						<Text size={{ initial: "3", md: "4" }}>{promptTitle}</Text>
					</Flex>
				</Card>
			</Link>
		</Box>
	);
};

export default SuggestedPrompt;
