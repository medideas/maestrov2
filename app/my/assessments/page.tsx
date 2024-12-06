import { Flex, Heading, Grid, Button, Box, Tooltip } from "@radix-ui/themes";
import CompetencyModal from "./_components/CompetencyModal";
import React from "react";
import Link from "next/link";
import fetchInterceptor from "@/app/utils/fetchInterceptor";

interface Competency {
	id: string;
	name: string;
	description: string;
	color: string;
	Skill: Skill[];
	jobTitleSkills: JobTitleSkill[];
}

interface Skill {
	id: string;
	name: string;
	description: string;
}

interface JobTitleSkill {
	id: string;
	jobTitleId: string;
	skillId: string;
	competencyId: string;
	target: number;
	assessmentResultsId: string;
}

type tParams = Promise<{ slug: string[] }>;

const AssessmentPage = async (props: { params: tParams }) => {
	let id = await props.params;
	const competencies = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/competencies"
	);
	const assessment = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/my/assessments/"
	);
	const colors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-quartery"];
	console.log(assessment);
	return (
		<Flex direction="column" p="5">
			<Flex mb="5" justify="between">
				<Heading>My latest assessment result</Heading>
				<Button>
					<Link href="/my/assessments/new">Take a new assessment</Link>
				</Button>
			</Flex>
			<Grid columns={{ initial: "1", md: "4" }} gap="3">
				{competencies.map((competency: Competency, index: number) => (
					<CompetencyModal
						key={competency.id}
						color={colors[index]}
						params={{
							id: competency.id,
						}}
						assessmentResults={assessment.assessmentResults}
					/>
				))}
			</Grid>

			<Flex>
				<Heading mt="5" mb="3">
					My Progress
				</Heading>
			</Flex>
			{competencies.map((competency: Competency) => (
				<Grid
					key={competency.id}
					columns={{ initial: "1", md: "5" }}
					gap="6"
					align="center"
					mb="3"
				>
					<Box className="lg:col-span-2">
						<Heading as="h4" weight="light" color="gold">
							{competency.name}
						</Heading>
					</Box>
					<Box className="lg:col-span-3">
						<div className="flex flex-col border-b-2 max-w-100">
							<Tooltip content="50% compared to before">
								<div className="bg-gray-400 w-4 h-4 rounded-full my-[-8px] ml-[40px]"></div>
							</Tooltip>
							<Tooltip content="50% compared to others">
								<div className="bg-red-300 w-4 h-4 rounded-full my-[-8px] ml-[80px]"></div>
							</Tooltip>
						</div>
					</Box>
				</Grid>
			))}
		</Flex>
	);
};

export default AssessmentPage;
