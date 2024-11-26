"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const LoginButton = () => {
	return (
		<Link href="https://sviluppo4.arsdue.com/auth/sso/saml/login">
			<Button type="submit" mt="3" variant="outline">
				Login
			</Button>
		</Link>
	);
};

export default LoginButton;
