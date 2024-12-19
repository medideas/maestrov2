"use client";
import { Box, Card, Flex, Link, Text } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaMagic } from "react-icons/fa";
import { FaCar, FaGamepad } from "react-icons/fa6";

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
	const handleClick = (prompt: string, promptTitle: string) => () => {
		fetch(`${process.env.NEXT_PUBLIC_APIBASE}/my/chats/`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-type": "application/json",
				Authorization: "Bearer " + jwt,
			},
			body: JSON.stringify({ name: promptTitle }),
		})
			.then((response) => response.json())
			.then((json) =>
				fetch(`${process.env.NEXT_PUBLIC_APIBASE}/chatbot/ask/`, {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-type": "application/json",
						Authorization: "Bearer " + jwt,
					},
					body: JSON.stringify({ chatId: json.id, prompt: prompt }),
				})
			)
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				router.push(`/my/chats/${json.chatId}`);
			});
	};
	return (
		<Box
			width="350px"
			className="align-middle hover:scale-105 transition-all duration-200"
		>
			<Link onClick={handleClick(prompt, promptTitle)} color="gray">
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
