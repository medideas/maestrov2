import { Flex } from "@radix-ui/themes";
import React from "react";
import AssessmentForm from "../_components/AssessmentForm";
import fetchInterceptor from "@/app/utils/fetchInterceptor";

const NewAssessment = async () => {
	const jobTitleSkills = await fetchInterceptor(
		process.env.APIBASE + "/job-title-skills"
	);
	return (
		<Flex>
			<AssessmentForm jobTitleSkills={jobTitleSkills} />
		</Flex>
	);
};

export default NewAssessment;
