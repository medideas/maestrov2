"use client";
import { Flex, Spinner, Text } from "@radix-ui/themes";
import React, { useEffect } from "react";
import { useSearchParams, redirect } from "next/navigation";
import { setCookie } from "cookies-next/client";

const LogMeInPage = () => {
	const searchParams = useSearchParams();
	const jwt = searchParams.get("jwt");
	useEffect(() => {
		setCookie("jwt", jwt, { path: "/" });
	}, []);
	redirect("/");

	return (
		<Flex className="max-w-[400px] mx-auto my-[50px]">
			<Text className="text-center">
				<Spinner size="3" className="mx-auto" mb="3" />
				You are loggin in to Maestro.
				<br />
				You should be redirected in just few seconds
			</Text>
		</Flex>
	);
};

export default LogMeInPage;
