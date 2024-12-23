import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Flex } from "@radix-ui/themes";
import DesktopNavLinks from "./components/navbar/DesktopNavLinks";
import MobileNavLinks from "./components/navbar/MobileNavLinks";
import AvatarBox from "./components/navbar/AvatarBox";
import { fetchApi } from "./utils/fetchInterceptor";
import { hasCookie } from "cookies-next";
import { cookies } from "next/headers";
import { getJwt, hasJwtExpired, mightBeLoggedIn } from "./utils/auth";
import { Toast } from "./components/ClientToast";

const Navbar = async () => {
	if (await mightBeLoggedIn()) {
		const loggedUser = await fetchApi(`/my/profile`);
		const userRoles = loggedUser.roleUsers;
		let roles: string[] = [];
		userRoles.map((r) => roles.push(r.role.name));
		return (
			<nav className="p-0 m-0 overflow-x-hidden">
				<Flex direction="column">
					<Flex justify="between" className="bg-navbar p-5">
						<Flex display={{ initial: "none", sm: "flex" }}>
							<AvatarBox user={loggedUser} />
						</Flex>
						<Flex align="center" gap="3">
							<Link href="/">
								<img
									src="/maestro.png"
									alt="Maestro logo"
									width={80}
									className="mr-5"
								/>
							</Link>
						</Flex>
					</Flex>
					<Flex
						display={{ initial: "none", sm: "flex" }}
						justify="end"
						className="bg-navbar"
					>
						<DesktopNavLinks roles={roles} />
					</Flex>
					<Flex
						display={{ initial: "flex", sm: "none" }}
						justify="end"
						className="bg-navbar"
					>
						<MobileNavLinks user={loggedUser} roles={roles} />
					</Flex>
				</Flex>
			</nav>
		);
	}

	const hasJwt = await getJwt();
	const isJwtExpired = await hasJwtExpired();
	if (hasJwt && isJwtExpired) {
		return <Toast type="warning" message="Login has expired" />;
	}
};

export default Navbar;
