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
import React from "react";
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
	return (
		<Container className="my-[50px]">
			<Flex justify={"between"}>
				<Flex align="center" gap="5">
					<Flex justify={"between"} mt="5">
						<Flex>
							<Avatar
								src="https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
								fallback="A"
								size="9"
							></Avatar>
						</Flex>
					</Flex>
					<Flex direction={"column"} gap={"3"}>
						<Heading>My Profile</Heading>
						<Text>
							Welcome to your page profile, dear{" "}
							<b>
								{user.firstName} {user.lastName}
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
