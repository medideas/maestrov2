import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Flex, Box, Grid, Section, Theme, Text } from "@radix-ui/themes";
import Navbar from "./Navbar";
import AskMaestro from "./components/AskMaestro";
import fetchInterceptor from "./utils/fetchInterceptor";
import { Suspense } from "react";
import NewChat from "./my/chats/_components/NewChat";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
	title: "Maestro",
	description: "Share knowledge",
};

const myFont = localFont({ src: "./fonts/DM-Sans.woff" });

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const user = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/my/profile/"
	);
	return (
		<html lang="en" className="dm_sans.className">
			<body className={"flex flex-col m-0 p-0"}>
				<ToastContainer />
				<Theme accentColor="red" radius="small" appearance="light">
					<Navbar user={user} />
					<main className="flex-auto min-h-[80vh]">
						<Suspense>{children}</Suspense>
					</main>

					<Section className="bg-primary">
						<Grid columns={{ initial: "1", sm: "3" }} gap="4">
							<Box></Box>
							<Flex
								direction="column"
								p="1"
								mb="5"
								gap="2"
								align={"center"}
								justify={"center"}
							>
								<img src="/maestro.png" width={"60px"} />
								<Text size="2">Maestro: share knowledge</Text>
							</Flex>
							<Box></Box>
						</Grid>
					</Section>
				</Theme>
			</body>
		</html>
	);
}
