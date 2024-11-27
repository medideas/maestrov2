"use client";
import { Flex, Spinner, Text } from "@radix-ui/themes";
import React, { Suspense } from "react";
import Redirect from "./redirect";

const LogMeInPage = () => {
	return (
		<Flex className="max-w-[400px] mx-auto my-[50px]">
			<Suspense>
				<Redirect />
			</Suspense>
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
