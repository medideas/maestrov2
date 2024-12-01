import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
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
	return (
		<Flex direction={"column"} gap="3">
			<Text>No assessments</Text>
			<Link href="/my/assessments/new">
				<Button>Take a new assessment</Button>
			</Link>
		</Flex>
	);
};

export default LatestAssessment;
