import { Flex } from "@radix-ui/themes";
import React from "react";
import AssessmentForm from "../_components/AssessmentForm";

const NewAssessment = async () => {
	const data = await fetch("https://sviluppo4.arsdue.com/job-title-skills");
	const jobTitleSkills = await data.json();
	return (
		<Flex>
			<AssessmentForm jobTitleSkills={jobTitleSkills} />
		</Flex>
	);
};

export default NewAssessment;
