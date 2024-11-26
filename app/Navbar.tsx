"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { SlMenu, SlClose } from "react-icons/sl";

import { Avatar, Box, Button, Dialog, Flex, Heading } from "@radix-ui/themes";
import { hasCookie } from "cookies-next";

const Navbar = () => {
	let userIsLoggedIn = false;
	useEffect(() => {
		if (hasCookie("jwt")) {
			userIsLoggedIn = true;
		}
	});
	const currentPath = usePathname();
	const [isOpen, setOpen] = useState(false);

	const links = [
		{ label: "Home", href: "/" },
		{ label: "My Profile", href: "/assessments" },
		{ label: "ChatMaestro", href: "/chats" },
		{ label: "Library", href: "/mylibrary" },
		{ label: "Role Play", href: "/roleplay" },
		{ label: "Help", href: "/help" },
	];

	return (
		<nav className="p-0 m-0">
			<Flex direction="column">
				<Flex justify="between" className="bg-navbar p-5">
					<Flex align="center">
						<SlMenu
							size="30"
							className={isOpen ? "hidden" : "md:hidden visible"}
							onClick={() => setOpen(!isOpen)}
						/>
						<SlClose
							size="30"
							className={isOpen ? "visible" : "hidden"}
							onClick={() => setOpen(!isOpen)}
						/>

						<Box display={{ initial: "none", sm: "block" }}>
							<Dialog.Root>
								<Dialog.Trigger>
									<Avatar fallback="A" radius="full" size="5" />
								</Dialog.Trigger>
								<Dialog.Content maxWidth="60%">
									<Dialog.Close>
										<Button variant="soft" color="gray">
											Cancel
										</Button>
									</Dialog.Close>
								</Dialog.Content>
							</Dialog.Root>
						</Box>
						<Box ml="4" display={{ initial: "none", sm: "block" }}>
							<Heading as="h3">Home</Heading>
							<Heading as="h4" weight="regular" size="4">
								Welcome back User
							</Heading>
						</Box>
					</Flex>
					<Flex align="center"></Flex>
					<Flex align="center" gap="3">
						<Link href="/">
							<img src="/maestro.png" alt="Maestro logo" width={80} />
						</Link>
					</Flex>
				</Flex>
				<Flex
					display={{ initial: "none", sm: "flex" }}
					justify="end"
					className="bg-navbar"
				>
					<ul className="flex-col tabs group">
						{links.map((link) => (
							<li
								key={link.href}
								className={link.href === currentPath ? " active" : ""}
							>
								<Link
									href={link.href}
									className={classnames({
										"text-red-800": link.href === currentPath,
										"text-zinc-500": link.href != currentPath,
										"hover:text-red-500 transition-colors": true,
									})}
								>
									{link.label}
								</Link>
							</li>
						))}
						<li className="py-2 pr-5">
							<Link
								href={!userIsLoggedIn ? "/logout" : "/login"}
								className={"hover:text-red-500 transition-colors"}
							>
								{!userIsLoggedIn ? "Logout" : "Login"}
							</Link>
						</li>
					</ul>
				</Flex>
				{/* mobile menu */}
				<div
					className={` md:hidden bg-navbar h-dvh mt-[90px] w-[85%] shadow-xl absolute z-10 left-[-500px] transition-all duration-700 ease-in-out ${
						isOpen && "left-[0px]"
					}`}
				>
					<Flex align="center" justify="between" px="5" pb="5">
						<Box ml="4">
							<Heading as="h3">Home</Heading>
							<Heading as="h4" weight="regular" size="4">
								Welcome back User
							</Heading>
						</Box>
						<Box>
							<Avatar fallback="A" radius="full" size="5" />
						</Box>
					</Flex>
					<Flex pb="5">
						<ul className="flex-col flex-1 text-right">
							{links.map((link) => (
								<li key={link.href} className="py-2 pr-5">
									<Link
										href={link.href}
										className={classnames({
											"text-red-800": link.href === currentPath,
											"text-zinc-500": link.href != currentPath,
											"font-semibold text-l": true,
										})}
										onClick={() => setOpen(!isOpen)}
									>
										{link.label}
									</Link>
								</li>
							))}
							<li className="py-2 pr-5">
								<Link
									href={userIsLoggedIn ? "/logout" : "/login"}
									className={classnames({
										"font-semibold text-l": true,
									})}
								>
									{!userIsLoggedIn ? "/logout" : "/login"}
								</Link>
							</li>
						</ul>
					</Flex>
				</div>
			</Flex>
		</nav>
	);
};

export default Navbar;
