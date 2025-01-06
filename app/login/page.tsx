import {
	AspectRatio,
	Box,
	Card,
	Flex,
	Heading,
	Separator,
	Text,
} from "@radix-ui/themes";
import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { mightBeLoggedIn } from "../utils/auth";
import LoginButton from "./_components/LoginButton";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const LoginPage = async ({
	searchParams,
}: {
	searchParams: SearchParams;
}) => {
	const unauthorized = (await searchParams).unauthorized;
	if (!unauthorized && await mightBeLoggedIn()) {
		// Is probably logged in already, redirect to home
		// If not, redirect to login will occur with ?unauthorized=true
		redirect("/home");
	}

	return (
		<Flex
			justify="center"
			className="md:pt-[130px]"
			direction={{ initial: "column", md: "row" }}
		>
			<Flex minWidth="400px" className="shadow-md">
				<Suspense>
					<AspectRatio ratio={16 / 9}>
						<img
							src="/login.jpg"
							alt="Login"
							style={{
								objectFit: "cover",
								width: "100%",
								height: "100%",
								borderRadius: "var(--radius-5)",
							}}
						/>
					</AspectRatio>
				</Suspense>
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
							<Suspense>
								<LoginButton />
							</Suspense>
						</Box>
					</Card>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default LoginPage;
