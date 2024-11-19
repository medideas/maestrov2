import { Flex } from "@radix-ui/themes";
import React from "react";
import UserForm from "../_components/UserForm";

const NewUser = async () => {
	var data = await fetch("https://sviluppo4.arsdue.com/business-units");
	const businessUnits = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/languages");
	const languages = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/regions");
	const regions = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/job-titles");
	const jobTitles = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/roles");
	const roles = await data.json();
	return (
		<Flex>
			<UserForm
				businessUnits={businessUnits}
				languages={languages}
				regions={regions}
				jobTitles={jobTitles}
				roles={roles}
			/>
		</Flex>
	);
};

export default NewUser;
