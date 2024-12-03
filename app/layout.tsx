import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { Box, Grid, Section, Theme } from "@radix-ui/themes";
import Navbar from "./Navbar";
import AskMaestro from "./components/AskMaestro";
import fetchInterceptor from "./utils/fetchInterceptor";

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
				<Theme accentColor="red" radius="small" appearance="light">
					<Navbar user={user} />
					<main className="flex-auto min-h-[80vh]">{children}</main>

					<div className="w-[100%] bottom-0 fixed z-20">
						<AskMaestro />
					</div>

					<Section className="bg-primary">
						<Grid columns={{ initial: "1", sm: "3" }} gap="4">
							<Box p="5"></Box>
						</Grid>
					</Section>
				</Theme>
			</body>
		</html>
	);
}
