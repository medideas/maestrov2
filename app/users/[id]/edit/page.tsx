import React from "react";
import UserForm from "../../_components/UserForm";
import { Flex, Heading } from "@radix-ui/themes";
import { notFound, useSearchParams } from "next/navigation";

const EditUserPage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;
	let id = params.id;
	var data = await fetch(process.env.APIBASE + "/users" + id);
	const user = await data.json();
	data = await fetch(process.env.APIBASE + "/business-units");
	const businessUnits = await data.json();
	data = await fetch(process.env.APIBASE + "/languages");
	const languages = await data.json();
	data = await fetch(process.env.APIBASE + "/regions");
	const regions = await data.json();
	data = await fetch(process.env.APIBASE + "/job-titles");
	const jobTitles = await data.json();
	data = await fetch(process.env.APIBASE + "/roles");
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
