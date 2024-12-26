import { fetchApi } from "@/app/utils/fetchInterceptor";
import { Grid, Flex, Text, Tooltip } from "@radix-ui/themes";
import React from "react";
import Skillbar from "./Skillbar";

const Skill = async ({ params, assessmentResults }: Props) => {
	const userJobTitleId = "5b53f32b-5a49-402d-a146-480cd49e14e6";
	const id = params.id;
	const skill = await fetchApi("/skills/" + id);

	return (
		<Grid columns="2" gap="3" align="center" mb="3">
			<Text as="p" weight="light" className="col-span-1">
				{skill.name}
			</Text>

			{skill.jobTitleSkills.map(
				(jobTitleSkill: JobTitleSkill, index: number) =>
					jobTitleSkill.jobTitleId == userJobTitleId && (
						<div key={index} className="flex flex-col border-b-2 col-span-1">
							<Flex position={"relative"}>
								<Tooltip content={jobTitleSkill.target}>
									<Flex
										position={"absolute"}
										style={{ backgroundColor: "gray" }}
										width={"16px"}
										height={"16px"}
										className="rounded-full"
										left={`${jobTitleSkill.target * 7}0px`}
										top="-8px"
										ml="1"
									></Flex>
								</Tooltip>
							</Flex>
							{assessmentResults.map(
								(result: AssessmentResult) =>
									result.jobTitleSkillId == jobTitleSkill.id && (
										<Skillbar result={result.value} color="#F87171" />
									)
							)}
						</div>
					)
			)}
		</Grid>
	);
};

export default Skill;
