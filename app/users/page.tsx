import { Button, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import UsersTable from "./UsersTable";
import Link from "next/link";

const Users = async () => {
	// let data = await fetch("http://localhost:3000/api/users/", {cache: "no-store",});
	let data = await fetch("https://sviluppo4.arsdue.com/users/");
	let users = await data.json();

	return (
		<Flex direction="column" className="max-w-[1000px] mx-auto">
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
		</Flex>
	);
};

export default Users;
