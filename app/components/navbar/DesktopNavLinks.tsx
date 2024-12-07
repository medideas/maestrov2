"use client";
import { Flex, Box, Heading, Avatar } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import classnames from "classnames";
import links from "../../utils/navlink";

const currentNavLink = function (url: string, linkPath: string) {
	let result = false;
	if (url.includes(linkPath.split("/").pop()!)) {
		result = true;
	}
	return result;
};

const DesktopNavLinks = () => {
	const [isOpen, setOpen] = useState(false);
	const currentPath = usePathname();
	let userIsLoggedIn = true;

	return (
		<div>
			<ul className="flex-col tabs group">
				{links.map((link) => (
					<li
						key={link.href}
						className={currentNavLink(currentPath, link.href) ? " active" : ""}
					>
						<Link
							href={`/${link.href}`}
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
				<li className="pr-5">
					<Link
						href="/logout"
						className={"hover:text-red-500 transition-colors"}
					>
						Logout
					</Link>
				</li>
			</ul>
		</div>
	);
};

export default DesktopNavLinks;
