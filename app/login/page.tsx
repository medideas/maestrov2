import { AspectRatio, Flex, Heading, Separator, Text } from "@radix-ui/themes";
import React from "react";
import Loginform from "./_components/Loginform";

const LoginPage = () => {
	return (
		<Flex justify="center" className="my-[40px]">
			<Flex minWidth="400px" className="shadow-md">
				<AspectRatio ratio={8 / 10}>
					<img
						src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="A house in a forest"
						style={{
							objectFit: "cover",
							width: "100%",
							height: "100%",
							borderRadius: "var(--radius-2)",
						}}
					/>
				</AspectRatio>
			</Flex>
			<Flex p="5" align="center" gap="5">
				<Flex direction="column" gap="2">
					<Heading>Login</Heading>
					<Text>Time to join the revolution in onboarding and training</Text>
					<Separator my="4" size="4" />
					<Loginform />
				</Flex>
			</Flex>
		</Flex>
	);
};

export default LoginPage;
