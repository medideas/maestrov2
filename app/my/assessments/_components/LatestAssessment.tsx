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

const LatestAssessment = ({ assessment }: { assessment: Assessment }) => {
	return (
		<Flex direction={"column"} gap="3">
			{assessment === undefined ? (
				<Flex direction={"column"} gap="2" mt="3">
					<Text>There are no assessments. Take your first quiz</Text>
					<Link href="/my/assessments/new">
						<Button>Take a new assessment</Button>
					</Link>
				</Flex>
			) : (
				<Flex direction={"column"} gap="3">
					<Text mt="3">You already took an assessment. Check the results</Text>
					<Link href="/my/assessments">
						<Button variant="outline">Check your latest assessment</Button>
					</Link>
				</Flex>
			)}
		</Flex>
	);
};

export default LatestAssessment;
