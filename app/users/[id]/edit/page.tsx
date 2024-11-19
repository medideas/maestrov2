import React from "react";
import UserForm from "../../_components/UserForm";
import { Flex, Heading } from "@radix-ui/themes";
import { notFound, useSearchParams } from "next/navigation";

const EditUserPage = async ({ params }: { params: { id: string } }) => {
	let id = params.id;
	var data = await fetch("https://sviluppo4.arsdue.com/users" + id);
	const user = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/business-units");
	const businessUnits = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/languages");
	const languages = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/regions");
	const regions = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/job-titles");
	const jobTitles = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/roles");
	const roles = await data.json();

	if (!user) notFound();

	return (
		<Flex direction="column">
			<Heading>Edit user {user ? user.firstName : "no name found"}</Heading>
			<UserForm
				roles={roles}
				businessUnits={businessUnits}
				languages={languages}
				regions={regions}
				jobTitles={jobTitles}
			/>
		</Flex>
	);
};

export default EditUserPage;
