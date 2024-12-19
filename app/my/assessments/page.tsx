import {
	Flex,
	Heading,
	Grid,
	Button,
	Box,
	Tooltip,
	Card,
	Separator,
	Text,
} from "@radix-ui/themes";
import CompetencyModal from "./_components/CompetencyModal";
import React from "react";
import Link from "next/link";
import { fetchApi } from "@/app/utils/fetchInterceptor";

type tParams = Promise<{ slug: string[] }>;

const AssessmentPage = async (props: { params: tParams }) => {
	let id = await props.params;
	const [competencies, assessment] = await Promise.all([
		fetchApi(`/competencies`),
		fetchApi(`/my/assessments/`),
	]);

	// const competencies: any[] = [];
	// const assessment: any[] = [];

	const colors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-quartery"];
	return (
		<Flex direction="column" p="5">
			{assessment.length === 0 ? (
				<Flex justify={"center"} align={"center"} mt="9">
					<Card className="shadow-lg">
						<Box p={{ initial: "4", md: "7" }}>
							<Heading size="4">
								You haven't yet submitted any assessment so far
							</Heading>
							<Separator my="3" size="4" />
							<Text>
								Take some time in order to assess your knowledge and skill
								level.{" "}
							</Text>
							<Flex mt="5">
								<Link href="/my/assessments/new">
									<Button>Take your first assessment</Button>
								</Link>
							</Flex>
						</Box>
					</Card>
				</Flex>
			) : (
				<Flex direction={"column"}>
					<Flex mb="5" justify="between">
						<Heading>My latest assessment result</Heading>
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
			)}
		</Flex>
	);
};

export default AssessmentPage;
