import { Flex } from "@radix-ui/themes";
import React from "react";
import AssessmentForm from "../_components/AssessmentForm";
import { fetchApi } from "@/app/utils/fetchInterceptor";

const NewAssessment = async () => {
	const userId = "d637ba80-30a1-477e-9e07-0894795344c9";

	const [
		jobTitleSkills,
		user,
	] = await Promise.all([
		fetchApi("/job-title-skills"),
		fetchApi("/users/" + userId),
	]);
	
	return (
		<Flex>
			<AssessmentForm jobTitleSkills={jobTitleSkills} user={user} />
		</Flex>
	);
};

export default NewAssessment;
