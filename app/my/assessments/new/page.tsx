import { Flex } from "@radix-ui/themes";
import React from "react";
import AssessmentForm from "../_components/AssessmentForm";
import fetchInterceptor from "@/app/utils/fetchInterceptor";

const NewAssessment = async () => {
	const jobTitleSkills = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/job-title-skills"
	);
	const userId = "d637ba80-30a1-477e-9e07-0894795344c9";
	const user = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/users/" + userId
	);
	return (
		<Flex>
			<AssessmentForm jobTitleSkills={jobTitleSkills} user={user} />
		</Flex>
	);
};

export default NewAssessment;
