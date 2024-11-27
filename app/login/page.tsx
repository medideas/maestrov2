import {
	AspectRatio,
	Box,
	Card,
	Flex,
	Heading,
	Separator,
	Text,
} from "@radix-ui/themes";
import React from "react";
import LoginButton from "./_components/LoginButton";

const LoginPage = async () => {
	return (
		<Flex justify="center" className="my-[40px]">
			<Flex minWidth="400px" className="shadow-md">
				<AspectRatio ratio={8 / 10}>
					<img
						src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=3220&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="A house in a forest"
						style={{
							objectFit: "cover",
							width: "100%",
							height: "100%",
							borderRadius: "var(--radius-5)",
						}}
					/>
				</AspectRatio>
			</Flex>
			<Flex p="5" align="center" gap="5">
				<Flex direction="column" gap="2">
					<Card className="shadow-lg">
						<Box px="5" className="py-[50px]">
							<Heading mb="3" weight="medium">
								Start using Maestro
							</Heading>
							<Text>
								Time to join the revolution in onboarding and training
							</Text>
							<Separator my="4" size="4" />
							<LoginButton />
						</Box>
					</Card>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default LoginPage;
