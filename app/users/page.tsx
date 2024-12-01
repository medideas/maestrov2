import { Button, Container, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import UsersTable from "./UsersTable";
import Link from "next/link";
import fetchInterceptor from "../utils/fetchInterceptor";

const Users = async () => {
	const users = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/users"
	);

	return (
		<Container className="max-w-[1000px] mx-auto my-[50px]">
			<Flex justify="between" align="center">
				<Flex direction="column" my="5">
					<Heading>Users</Heading>
					<p>Here you can find all the users of your bussiness unit</p>
				</Flex>
				<Flex>
					<Link href="/users/new/">
						<Button>Add a new user</Button>
					</Link>
				</Flex>
			</Flex>
			{users ? <UsersTable users={users} /> : "Sorry, no users added yet"}
		</Container>
	);
};

export default Users;
