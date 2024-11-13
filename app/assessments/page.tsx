import {
	Flex,
	Grid,
	Heading,
	Text,
	Card,
	Inset,
	Box,
	Tooltip,
	Dialog,
	Button,
} from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import CompetencyModal from "./_components/CompetencyModal";

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

type Assessment = {
	id: string;
	name: string;
	assessmentRestuls: AssessmentResult[];
};

type AssessmentResult = {
	value: number;
};

const UserProfilePage = async () => {
	const dataset = [2, 3, 4, 5];
	const userId = "aae0005d-eb16-47b1-acee-e809e4610245";
	let dataCompetencies = await fetch(
		"https://sviluppo4.arsdue.com/competencies"
	);
	let competencies = await dataCompetencies.json();

	let dataUser = await fetch(`https://sviluppo4.arsdue.com/users/${userId}`);
	let user = await dataUser.json();

	let dataAssessment = await fetch(
		"https://sviluppo4.arsdue.com/my/assessments/"
	);
	let assessment = await dataAssessment.json();

	return (
		<>
			<Flex direction="column" p="5">
				<Flex mb="5" justify="between">
					<Heading>My latest assessment result</Heading>
					<Button>
						<Link href="/assessments/new">Take a new assessment</Link>
					</Button>
				</Flex>
				<Grid columns={{ initial: "1", md: "4" }} gap="3">
					{competencies.map((competency: Competency, index: number) => (
						<CompetencyModal
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
		</>
	);
};

export default UserProfilePage;
