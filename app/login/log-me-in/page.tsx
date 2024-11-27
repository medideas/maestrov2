import React from "react";
import { Flex, Spinner, Text } from "@radix-ui/themes";
import SetCookie from "./setCookie";

const LogMeInPage = async ({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
	const search = await searchParams;
	const jwt = search.jwt;
	return (
		<Flex className="max-w-[400px] mx-auto my-[50px]">
			<SetCookie jwt={search.jwt as string} />
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
