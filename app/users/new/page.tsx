import { Container, Flex } from "@radix-ui/themes";
import React from "react";
import UserForm from "../_components/UserForm";

const NewUser = async () => {
	var data = await fetch(process.env.APIBASE + "/business-units");
	const businessUnits = await data.json();
	data = await fetch(process.env.APIBASE + "/languages");
	const languages = await data.json();
	data = await fetch(process.env.APIBASE + "/regions");
	const regions = await data.json();
	data = await fetch(process.env.APIBASE + "/job-titles");
	const jobTitles = await data.json();
	data = await fetch(process.env.APIBASE + "/roles");
	const roles = await data.json();
	return (
		<Container className="my-[40px] max-w-[600px] mx-auto border-[1px] shadow-md p-5">
			<UserForm
				businessUnits={businessUnits}
				languages={languages}
				regions={regions}
				jobTitles={jobTitles}
				roles={roles}
			/>
		</Container>
	);
};

export default NewUser;
