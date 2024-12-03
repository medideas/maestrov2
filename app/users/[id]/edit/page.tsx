import React from "react";
import UserForm from "../../_components/UserForm";
import { Container, Flex, Heading } from "@radix-ui/themes";
import { notFound, useSearchParams } from "next/navigation";
import fetchInterceptor from "@/app/utils/fetchInterceptor";

const EditUserPage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;
	let id = params.id;
	const user = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/users/${id}`
	);
	const businessUnits = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/business-units/`
	);
	const languages = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/languages/`
	);
	const regions = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/regions/`
	);
	const jobTitles = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/job-titles/`
	);
	const roles = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/roles/`
	);

	if (!user) notFound();

	return (
		<Container className="my-[40px] max-w-[600px] mx-auto border-[1px] shadow-md">
			<Flex direction="column" p="5">
				<Heading mb="5">
					Edit user {user ? user.firstName : "no name found"}
				</Heading>
				<UserForm
					user={user}
					roles={roles}
					businessUnits={businessUnits}
					languages={languages}
					regions={regions}
					jobTitles={jobTitles}
				/>
			</Flex>
		</Container>
	);
};

export default EditUserPage;
