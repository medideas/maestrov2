import { fetchApi } from "@/app/utils/fetchInterceptor";
import { Container, Flex, Grid, Heading, Separator } from "@radix-ui/themes";
import React from "react";
import LatestAssessment from "../assessments/_components/LatestAssessment";
import UserAvatar from "./_components/UserAvatar";
import UserDetailsCard from "./_components/UserDetailsCard";
import { getCookie } from "cookies-next";
import TakeNewAssessment from "../assessments/_components/TakeNewAssessment";

const MyProfile = async () => {
	const jwt = getCookie("jwt");
	const [user] = await Promise.all([fetchApi(`/my/profile`)]);

	const assessment = await fetch(
		`${process.env.NEXT_PUBLIC_APIBASE}/my/asessements`,
		{
			headers: {
				Authorization: `Bearer ${jwt}`,
				"Content-Type": "application/json",
				Accept: "*/*",
			},
			method: "GET",
		}
	).catch((error) => {
		console.error("Error fetching assessment:", error);
	});

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
					{assessment.length > 0 ? <LatestAssessment /> : <TakeNewAssessment />}
				</Flex>
			</Grid>
		</Container>
	);
};

export default MyProfile;
