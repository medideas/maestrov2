"use client";
import { Avatar, Button, Dialog, Flex, Heading, Box } from "@radix-ui/themes";
import { usePathname } from "next/navigation";
import React from "react";

type User = {
	firstName: String;
};

const AvatarBox = ({ user }: { user: User }) => {
	const currentPath = usePathname();
	const currentLink = (url: string, path: string) => {};
	return (
		<Flex align="center">
			<Dialog.Root>
				<Dialog.Trigger>
					<Avatar fallback={user.firstName[0]} radius="full" size="5" />
				</Dialog.Trigger>
				<Dialog.Content maxWidth="60%">
					<Dialog.Close>
						<Button variant="soft" color="gray">
							Cancel
						</Button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Root>
			<Box ml="4">
				<Heading as="h3">{user.firstName}</Heading>
				<Heading as="h4" weight="regular" size="4">
					Welcome back
				</Heading>
			</Box>
		</Flex>
	);
};

export default AvatarBox;
