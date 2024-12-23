"use client";
import { Flex, Box, Heading, Avatar } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import classnames from "classnames";
import links from "../../utils/navlink";
import AvatarBox from "./AvatarBox";
import { SlClose, SlMenu } from "react-icons/sl";
import isUserAllowed from "@/app/utils/isUserAllowed";

type User = {
	firstName: String;
};

const MobileNavLinks = ({ roles, user }: { roles: string[]; user: User }) => {
	const [isOpen, setOpen] = useState(false);
	const currentPath = usePathname();
	let userIsLoggedIn = true;
	return (
		<div>
			{/* mobile menu */}
			<Flex px="5" pb="5" className="absolute top-10 right-10">
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
			</Flex>
			<div
				className={` md:hidden bg-navbar h-dvh w-[85%] shadow-xl absolute z-10 left-[-500px] transition-all duration-700 ease-in-out ${
					isOpen && "left-[0px]"
				}`}
			>
				<AvatarBox user={user} />
				<Flex pb="5">
					<ul className="flex-col flex-1 text-right">
						{links.map(
							(link) =>
								isUserAllowed(roles, link.for) && (
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
								)
						)}
						<li className="py-2 pr-5">
							<Link
								href="/logout"
								className={classnames({
									"font-semibold text-l": true,
								})}
							>
								Logout
							</Link>
						</li>
					</ul>
				</Flex>
			</div>
		</div>
	);
};

export default MobileNavLinks;
