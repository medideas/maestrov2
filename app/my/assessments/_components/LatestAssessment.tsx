import { Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
	assessment: Assessment;
}

type Assessment = {
	id: string;
	name: string;
};

const LatestAssessment = ({ assessment }: Props) => {
	console.log(assessment);
	return <Flex direction={"column"}>No assessments</Flex>;
};

export default LatestAssessment;
