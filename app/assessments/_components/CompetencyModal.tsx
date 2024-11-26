import {
	Box,
	Dialog,
	Card,
	Heading,
	Inset,
	Flex,
	Grid,
	Text,
} from "@radix-ui/themes";
import React from "react";
import Skill from "./Skill";
import fetchInterceptor from "@/app/utils/fetchInterceptor";

interface Props {
	params: { id: string };
	assessmentResults: AssessmentResult[];
}

type AssessmentResult = {
	id: string;
	value: string;
	jobTitleSkillId: string;
};

const CompetencyModal = async ({ params, assessmentResults }: Props) => {
	const results: AssessmentResult[] = assessmentResults;
	const id = params.id;
	const competency = await fetchInterceptor(
		process.env.APIBASE + "/competencies/" + id
	);
	return (
		<Dialog.Root key={competency.id}>
			<Dialog.Trigger>
				<Box className="hover:scale-105 hover:shadow-md transition-all duration-300 ease-in-out">
					<Card size="2" className={competency.color}>
						<Heading as="h4" weight="light" mb="5">
							{competency.name}
						</Heading>
						<Inset>
							<img
								src="/chart-1.png"
								alt="Bold typography"
								style={{
									display: "block",
									objectFit: "contain",
									width: "100%",
								}}
								className="my-3 p-4 "
							/>
						</Inset>
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
						<img
							src="/chart-1.png"
							alt="Bold typography"
							style={{
								display: "block",
								objectFit: "contain",
								width: "100%",
							}}
							className="my-3 p-4 "
						/>
					</Box>
				</Grid>
				{competency.skills.map((skill: Skill) => (
					<Skill
						key={skill.id}
						params={{ id: skill.id }}
						assessmentResults={results}
					/>
				))}
			</Dialog.Content>
		</Dialog.Root>
	);
};

export default CompetencyModal;
