import fetchInterceptor from "@/app/utils/fetchInterceptor";
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

const MyProfile = async () => {
	const user = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/my/profile"
	);
	const assessment = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/my/assessment"
	);
	let roles = [""];
	user.roleUsers.map((role: { role: { name: any } }) =>
		roles.push(role.role.name)
	);
	roles.shift();
	// await new Promise((resolve) => setTimeout(resolve, 2000));
	return (
		<Container className="my-[50px]">
			<Flex justify={"between"}>
				<Flex align="center" gap="5">
					<Flex justify={"between"} mt="5">
						<Flex>
							<Avatar
								src=""
								fallback={user.firstName[0]}
								size="9"
								color="iris"
							></Avatar>
						</Flex>
					</Flex>
					<Flex direction={"column"} gap={"3"}>
						<Heading>My Profile</Heading>
						<Text>
							Welcome to your page profile, dear{" "}
							<b>
								<Suspense>
									{user.firstName} {user.lastName}
								</Suspense>
							</b>
						</Text>
					</Flex>
				</Flex>
				<Flex>
					<Card>
						<Box p="4">
							<DataList.Root>
								<DataList.Item>
									<DataList.Label minWidth="88px">Name</DataList.Label>
									<DataList.Value>
										{user.firstName} {user.lastName}
									</DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label minWidth="88px">Email</DataList.Label>
									<DataList.Value>
										<Text>{user.email}</Text>
									</DataList.Value>
								</DataList.Item>
								<DataList.Label>Roles</DataList.Label>
								<Flex>
									<DataList.Item>
										<Flex gap="2">
											{roles.map((role) => (
												<Badge
													color="jade"
													variant="soft"
													radius="medium"
													size={"1"}
													key={role.id}
												>
													{role}
												</Badge>
											))}
										</Flex>
									</DataList.Item>
								</Flex>
								<DataList.Item>
									<DataList.Label>Business Unit</DataList.Label>
									<DataList.Value>{user.businessUnit.name}</DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label>Region</DataList.Label>
									<DataList.Value>{user.region.name}</DataList.Value>
								</DataList.Item>
								<DataList.Item>
									<DataList.Label>Language</DataList.Label>
									<DataList.Value>{user.language.name}</DataList.Value>
								</DataList.Item>
							</DataList.Root>
						</Box>
					</Card>
				</Flex>
			</Flex>
			<Separator my="5" size="4" />
			<Grid columns={"2"}>
				<Flex direction={"column"}>
					<Heading size="4">Assessements</Heading>
					<LatestAssessment assessment={assessment} />
				</Flex>
				<Flex direction={"column"}>
					<Heading size="4">Articles</Heading>
					<Text>Here you can find the articles you bookmarked</Text>
				</Flex>
			</Grid>
		</Container>
	);
};

export default MyProfile;
