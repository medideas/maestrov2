import { Box, Dialog, Card, Heading, Flex, Grid, Text } from "@radix-ui/themes";
import React from "react";
import Skill from "./Skill";
import fetchInterceptor from "@/app/utils/fetchInterceptor";
import BarChart from "./BarChart";

interface Props {
	params: { id: string };
	assessmentResults: AssessmentResult[];
	color: string;
}

type AssessmentResult = {
	id: string;
	value: string;
	jobTitleSkillId: string;
};

const CompetencyModal = async ({ params, assessmentResults, color }: Props) => {
	const results: AssessmentResult[] = assessmentResults;
	const id = params.id;
	const competency = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/competencies/" + id
	);
	return (
		<Dialog.Root key={competency.id}>
			<Dialog.Trigger>
				<Box
					className={`hover:scale-105 hover:shadow-md transition-all duration-300 ease-in-out ${color}`}
				>
					<Card size="2" className={competency.color}>
						<Heading as="h4" weight="light" mb="5">
							{competency.name}
						</Heading>
					</Card>
				</Box>
			</Dialog.Trigger>
			<Dialog.Content maxWidth="800px">
				<Dialog.Title>{competency.name}</Dialog.Title>
				<Grid columns={{ initial: "1", md: "2" }} mb="5" align="center">
					<Box className="col-span-1" mb="3">
						<Flex align="center" gap="3">
							<Heading size="6" weight="medium">
								2.3
							</Heading>
							<Text as="p">OVERALL SCORE</Text>
						</Flex>
						<Flex align="center" gap="3" mt="4">
							<Heading size="8" weight="medium">
								2.3
							</Heading>
							<Text as="p">TARGET SCORE</Text>
						</Flex>
					</Box>
					<Box>
						<BarChart competency={competency} />
					</Box>
				</Grid>
				{competency.skills.map((skill: Skill) => (
					<Skill key={skill.id} params={{ id: skill.id }} />
				))}
			</Dialog.Content>
		</Dialog.Root>
	);
};

export default CompetencyModal;
