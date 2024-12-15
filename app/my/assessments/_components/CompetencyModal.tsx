import {
	Box,
	Dialog,
	Card,
	Heading,
	Flex,
	Grid,
	Text,
	Separator,
} from "@radix-ui/themes";
import React from "react";
import Skill from "./Skill";
import { fetchApi } from "@/app/utils/fetchInterceptor";
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
	const competency = await fetchApi("/competencies/" + id);
	const assessmentValues = [];
	const average = (array) =>
		array.reduce((sum, currentValue) => sum + currentValue, 0) / array.length;
	console.log(average);
	assessmentResults.map((answer) => assessmentValues.push(answer.value));
	return (
		<Dialog.Root key={competency.id}>
			<Dialog.Trigger>
				<Flex
					className={`hover:scale-105 hover:shadow-md transition-all duration-300 ease-in-out ${color} min-h-[120px] w-[100%] max-w-[100%]`}
					align="center"
				>
					<Card
						size="2"
						className={`${competency.color} h-[100%] w-[100%] max-w-[100%]`}
					>
						<Heading as="h4" weight="light" size="5" className=" py-[30px]">
							{competency.name}
						</Heading>
					</Card>
				</Flex>
			</Dialog.Trigger>
			<Dialog.Content maxWidth="800px">
				<Dialog.Title>{competency.name}</Dialog.Title>
				<Flex mb="5" direction="column" align="center" justify={"between"}>
					<Flex maxWidth={"100%"} minWidth={"100%"}>
						<BarChart
							competency={competency}
							assessmentValues={assessmentValues}
						/>
					</Flex>
					<Flex mb="3" align="center" gap="3">
						<Flex align="center" gap="3">
							<Heading size="6" weight="medium">
								{average(assessmentValues)}
							</Heading>
							<Text as="p">OVERALL SCORE</Text>
						</Flex>
						<Separator mx="3" orientation="vertical" />
						<Flex align="center" gap="3">
							<Heading size="6" weight="medium">
								2.3
							</Heading>
							<Text as="p">TARGET SCORE</Text>
						</Flex>
					</Flex>
				</Flex>
				{competency.skills.map((skill: Skill) => (
					<Skill
						key={skill.id}
						params={{ id: skill.id }}
						assessmentResults={assessmentResults}
					/>
				))}
			</Dialog.Content>
		</Dialog.Root>
	);
};

export default CompetencyModal;
