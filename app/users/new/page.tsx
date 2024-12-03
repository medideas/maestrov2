import { Container, Flex } from "@radix-ui/themes";
import React from "react";
import UserForm from "../_components/UserForm";
import fetchInterceptor from "@/app/utils/fetchInterceptor";

const NewUser = async () => {
	const businessUnits = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/business-units`
	);
	const languages = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/languages`
	);
	const regions = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/regions`
	);
	const jobTitles = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/job-titles`
	);
	const roles = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/roles`
	);
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
