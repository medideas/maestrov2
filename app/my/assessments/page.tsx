import { Flex, Grid, Heading, Box, Tooltip, Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import fetchInterceptor from "../../utils/fetchInterceptor";

const UserProfilePage = async () => {
	const assessment = await fetchInterceptor(
		process.env.APIBASE + "/my/assessments/"
	);

	const colors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-quartery"];

	return (
		<>
			<Flex>Assessments page</Flex>
		</>
	);
};

export default UserProfilePage;
