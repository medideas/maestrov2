import { fetchApi } from "@/app/utils/fetchInterceptor";
import AssessementsTable from "../assessments/_components/LatestAssessment";
import {
	Avatar,
	Badge,
	Box,
	Card,
	Container,
	DataList,
	Flex,
	Grid,
	Heading,
	Separator,
	Text,
} from "@radix-ui/themes";
import React, { Suspense } from "react";
import LatestAssessment from "../assessments/_components/LatestAssessment";
import UserAvatar from "./_components/UserAvatar";
import UserDetailsCard from "./_components/UserDetailsCard";
import BookmarkedArticles from "./_components/BookmarkedArticles";
import { AuthenticatedPage } from "@/app/utils/authenticatedPage";

const MyProfile = async () => {
	const [user, assessment] = await Promise.all([
		fetchApi(`/my/profile`),
		fetchApi(`/my/assessments`),
	]);

	let roles = [""];
	user.roleUsers.map((role: { role: { name: any } }) =>
		roles.push(role.role.name)
	);
	roles.shift();
	// await new Promise((resolve) => setTimeout(resolve, 2000));
	return (
		<Container className="sm:my-[50px]" p={{ initial: "3", sm: "0" }}>
			<Flex justify={"between"} direction={{ initial: "column", sm: "row" }}>
				<UserAvatar user={user} message={"Welcome to your profile, dear "} />
				<UserDetailsCard user={user} />
			</Flex>
			<Separator my="5" size="4" />
			<Grid columns={{ initial: "1", sm: "2" }} gap="5">
				<Flex direction={"column"}>
					<Heading size="4">Assessements</Heading>
					<LatestAssessment assessment={assessment} />
				</Flex>
			</Grid>
		</Container>
	);
};

export default AuthenticatedPage(MyProfile);
