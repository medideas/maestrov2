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
	const competency = await fetchApi("/competencies/" + (await params.id));
	const jobTitleSkills = await fetchApi("/job-title-skills");
	const results: number[] = [];
	const expectedesults: number[] = [];
	jobTitleSkills.map((jobTitleSkill) =>
		competency.skills.map(
			(skill) =>
				jobTitleSkill.skillId === skill.id &&
				assessmentResults.map(
					(result) =>
						result.jobTitleSkillId === jobTitleSkill.id &&
						results.push(Number(result.value))
				)
		)
	);
	jobTitleSkills.map((jobTitleSkill) =>
		competency.skills.map(
			(skill) =>
				jobTitleSkill.skillId === skill.id &&
				assessmentResults.map(
					(result) =>
						result.jobTitleSkillId === jobTitleSkill.id &&
						expectedesults.push(Number(jobTitleSkill.target))
				)
		)
	);
	console.log(expectedesults);

	const average = (array) =>
		array.reduce((sum, currentValue) => sum + currentValue, 0) / array.length;
	const assessmentValues: string[] | Number[] = [];
	assessmentResults.map((answer) => competency.skills.map((skill) => skill.id));
	return (
		<Dialog.Root key={competency.id}>
			<Dialog.Trigger>
				<Flex
					className={`hover:scale-105 hover:shadow-md transition-all duration-300 ease-in-out ${color} min-h-[120px] w-[100%] max-w-[100%]`}
					align="center"
					justify={"center"}
				>
					<Card
						size="2"
						className={`${competency.color} h-[100%] w-[100%] max-w-[100%]`}
					>
						<Heading
							as="h4"
							weight="light"
							size="6"
							className="text-center py-[30px]"
						>
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
							assessmentValues={results}
							expectedValues={expectedesults}
						/>
					</Flex>
					<Flex my="4" gap="2" align={"center"}>
						<Flex
							width={"20px"}
							height={"20px"}
							className="bg-red-400 rounded-sm"
						></Flex>
						<Text>Your score</Text>
						<Separator mx="3" orientation="vertical" />
						<Flex
							width={"20px"}
							height={"20px"}
							className="bg-gray-300 rounded-sm"
						></Flex>
						<Text>Target score</Text>
					</Flex>
					<Flex mb="3" align="center" gap="3">
						<Flex align="center" gap="3">
							<Heading size="6" weight="medium">
								{Math.round(average(results))}
							</Heading>
							<Text as="p">OVERALL SCORE</Text>
						</Flex>
						<Separator mx="3" orientation="vertical" />
						<Flex align="center" gap="3">
							<Heading size="6" weight="medium">
								{Math.round(average(expectedesults))}
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
