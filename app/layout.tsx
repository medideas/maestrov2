import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import {
	Box,
	Grid,
	Section,
	Theme,
	ThemePanel,
	Text,
	Heading,
	Container,
} from "@radix-ui/themes";
import Navbar from "./Navbar";
import AskMaestro from "./components/AskMaestro";

const dm_sans = DM_Sans({
	subsets: ["latin"],
	weight: ["100", "200", "300", "600"],
	variable: "--font-dm_sans",
});

export const metadata: Metadata = {
	title: "Maestro",
	description: "Share knowledge",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={"flex flex-col"}>
				{/* <AuthProvider> */}
				<Theme accentColor="red" radius="small" appearance="light">
					<Navbar />

					<main className="flex-auto md:p-5">{children}</main>

					<div className="w-[100%] bottom-0 fixed z-20">
						<AskMaestro />
					</div>

					<Section className="bg-primary" mt="9">
						<Grid columns={{ initial: "1", sm: "3" }} gap="4">
							<Box p="5"></Box>
						</Grid>
					</Section>
				</Theme>
				{/* </AuthProvider> */}
			</body>
		</html>
	);
}
