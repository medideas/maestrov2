import {
	Badge,
	Code,
	Container,
	DataList,
	Flex,
	Heading,
} from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	roleUser: Role[];
	region: Region;
	jobTitle: JobTitle;
	language: Language;
	businessUnit: BusinessUnit;
};

type Region = {
	name: string;
};

type JobTitle = {
	name: string;
};

type Language = {
	name: string;
};

type BusinessUnit = {
	name: string;
};

type Role = {
	name: string;
};

const UserPage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;
	const id = params.id;
	let data = await fetch(process.env.APIBASE + "/users/" + id);
	let user: User = await data.json();
	return (
		<Container>
			<Flex justify="between">
				<Heading mb="5">
					{user.firstName} {user.lastName}
				</Heading>
				<Link href="/users">Go back to users</Link>
			</Flex>

			<Flex direction="column">
				<DataList.Root>
					<DataList.Item align="center">
						<DataList.Label minWidth="88px">Role</DataList.Label>
						<DataList.Value>
							<Badge color="jade" variant="soft" radius="full">
								{user.roleUser &&
									user.roleUser.map((role: Role) => role.name + " | ")}
							</Badge>
						</DataList.Value>
					</DataList.Item>
					<DataList.Item>
						<DataList.Label minWidth="88px">ID</DataList.Label>
						<DataList.Value>
							<Flex align="center" gap="2">
								<Code variant="ghost">{user.id}</Code>
							</Flex>
						</DataList.Value>
					</DataList.Item>
					<DataList.Item>
						<DataList.Label minWidth="88px">Name</DataList.Label>
						<DataList.Value>
							{user.firstName} {user.lastName}
						</DataList.Value>
					</DataList.Item>
					<DataList.Item>
						<DataList.Label minWidth="88px">Email</DataList.Label>
						<DataList.Value>
							<Link href="mailto:vlad@workos.com">{user.email}</Link>
						</DataList.Value>
					</DataList.Item>
					<DataList.Item>
						<DataList.Label minWidth="88px">Region</DataList.Label>
						<DataList.Value>
							{user.region ? user.region.name : "Not yet assigned"}
						</DataList.Value>
					</DataList.Item>
					<DataList.Item>
						<DataList.Label minWidth="88px">Business Unit</DataList.Label>
						<DataList.Value>
							{user.businessUnit ? user.businessUnit.name : "Not yet assigned"}
						</DataList.Value>
					</DataList.Item>
					<DataList.Item>
						<DataList.Label minWidth="88px">JobTitle</DataList.Label>
						<DataList.Value>{user.jobTitle.name}</DataList.Value>
					</DataList.Item>
				</DataList.Root>
			</Flex>
		</Container>
	);
};

export default UserPage;
