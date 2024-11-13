import React from "react";
import UserForm from "../../_components/UserForm";
import { Flex, Heading } from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface User {
	id: string;
	firstName: string;
	lastName: string;
}

interface Props {
	params: { id: string };
}

const EditUserPage = async ({ params }: Props) => {
	let data = await fetch("https://sviluppo4.arsdue.com/users/" + params.id);
	let user = await data.json();

	if (!user) notFound();

	return (
		<Flex direction="column">
			<Heading>Edit user {user ? user.name : "no name found"}</Heading>
			<UserForm
				user={user}
				roles={[]}
				businessUnits={[]}
				languages={[]}
				regions={[]}
				jobTitles={[]}
			/>
		</Flex>
	);
};

export default EditUserPage;
