import fetchInterceptor from "@/app/utils/fetchInterceptor";
import { Grid, Text, Tooltip } from "@radix-ui/themes";
import React from "react";

type Skill = {
	id: string;
	name: string;
	target: number;
	jobTitleSkills: JobTitleSkill[];
};

type JobTitleSkill = {
	id: string;
	jobTitleId: string;
	target: number;
	jobTitle: JobTitle;
};

type JobTitle = {
	id: string;
	name: string;
};

interface Props {
	params: { id: string };
	assessmentResults: AssessmentResult[];
}

type AssessmentResult = {
	jobTitleSkillId: string;
	value: number;
};

const Skill = async ({ params, assessmentResults }: Props) => {
	const userJobTitleId = "5b53f32b-5a49-402d-a146-480cd49e14e6";
	const id = params.id;
	const skill = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/skills/" + id
	);

	return (
		<Grid columns="2" gap="3" align="center" mb="3">
			<Text as="p" weight="light" className="col-span-1">
				{skill.name}
			</Text>

			{skill.jobTitleSkills.map(
				(jobTitleSkill: JobTitleSkill, index: number) =>
					jobTitleSkill.jobTitleId == userJobTitleId && (
						<div key={index} className="flex flex-col border-b-2 col-span-1">
							<Tooltip content={`Expected value: ${jobTitleSkill.target}`}>
								<div
									className={`bg-gray-400 w-4 h-4 rounded-full my-[-8px] ml-[${jobTitleSkill.target}0px]`}
								></div>
							</Tooltip>
							{assessmentResults.map(
								(result: AssessmentResult) =>
									result.jobTitleSkillId == jobTitleSkill.id && (
										<Tooltip content={`Your result: ${result.value}`}>
											<div
												className={`bg-red-400 w-4 h-4 rounded-full my-[-8px] ml-[${result.value}0px]`}
											></div>
										</Tooltip>
									)
							)}
						</div>
					)
			)}
		</Grid>
	);
};

export default Skill;
