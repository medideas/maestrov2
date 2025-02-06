import { fetchApi } from "@/app/utils/fetchInterceptor";
import {
	Container,
	Flex,
	Grid,
	Heading,
	Separator,
	Text,
} from "@radix-ui/themes";
import React from "react";
import LatestAssessment from "../assessments/_components/LatestAssessment";
import UserAvatar from "./_components/UserAvatar";
import UserDetailsCard from "./_components/UserDetailsCard";
import { getCookie } from "cookies-next";
import TakeNewAssessment from "../assessments/_components/TakeNewAssessment";

export const dynamic = "force-dynamic";

const MyProfile = async () => {
	try {
		const jwt = getCookie("jwt");
		const [user] = await Promise.all([fetchApi(`/my/profile`)]);

		// Add logging to debug user data
		console.log("Profile data:", {
			hasUser: !!user,
			hasRoleUsers: !!user?.roleUsers,
			roles: user?.roleUsers?.map((r) => r?.role?.name).filter(Boolean),
		});

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
		)
			.then((res) => res.json())
			.catch((error) => {
				console.error("Error fetching assessment:", error);
				return []; // Return empty array as fallback
			});

		// Safely handle roles
		let roles = [""];
		if (user?.roleUsers?.length > 0) {
			user.roleUsers.forEach((role: { role?: { name?: string } }) => {
				if (role?.role?.name) {
					roles.push(role.role.name);
				}
			});
			roles.shift();
		}

		// If user data is missing critical fields, throw an error
		if (!user || typeof user !== "object") {
			throw new Error("Invalid user data received from API");
		}

		return (
			<Container className="sm:my-[50px]" p={{ initial: "3", sm: "0" }}>
				<Flex justify={"between"} direction={{ initial: "column", sm: "row" }}>
					{/* Pass safe user object to components */}
					<UserAvatar
						user={{
							...user,
							roleUsers: user.roleUsers || [],
							// Add any other required fields with fallbacks
						}}
						message={"Welcome to your profile, dear "}
					/>
					<UserDetailsCard
						user={{
							...user,
							roleUsers: user.roleUsers || [],
							// Add any other required fields with fallbacks
						}}
					/>
				</Flex>
				<Separator my="5" size="4" />
				<Grid columns={{ initial: "1", sm: "2" }} gap="5">
					<Flex direction={"column"}>
						<Heading size="4">Assessements</Heading>
						{Array.isArray(assessment) && assessment.length > 0 ? (
							<TakeNewAssessment />
						) : (
							<LatestAssessment />
						)}
					</Flex>
				</Grid>
			</Container>
		);
	} catch (error) {
		console.error("Error in MyProfile:", error);
		return (
			<Container p="4">
				<Flex direction="column" gap="3">
					<Heading color="red">Error Loading Profile</Heading>
					<Text>
						There was an error loading your profile. Please try refreshing the
						page.
					</Text>
					{error instanceof Error && (
						<Text size="2" color="gray">
							{error.message}
						</Text>
					)}
				</Flex>
			</Container>
		);
	}
};

export default MyProfile;
