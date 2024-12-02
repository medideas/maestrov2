"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import React from "react";

const AskMaestro = () => {
	const pathname = usePathname();
	const isChat = pathname.includes("/chat");
	const isLogout = pathname.includes("/logout");
	const isLogin = pathname.includes("/login");
	return (
		<div>
			{!isChat && !isLogout && !isLogin && (
				<Flex className="bg-gray-100 w-[100%]" p="3">
					<Box width="100%">
						<TextField.Root placeholder="Ask me anything">
							<TextField.Slot>
								<MagnifyingGlassIcon height="16" width="16" />
							</TextField.Slot>
						</TextField.Root>
					</Box>
					<Button ml="2">Let's chat</Button>
				</Flex>
			)}
		</div>
	);
};

export default AskMaestro;
