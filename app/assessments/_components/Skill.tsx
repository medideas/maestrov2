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

type Result = {
	jobTitleSkillId: string;
	value: number;
};

interface Props {
	params: { id: string };
	results: Result[];
}

const Skill = async ({ params, results }: Props) => {
	const userJobTitleId = "8183d06e-e4e5-46f1-ada9-373afc37e366";
	const id = params.id;
	let data = await fetch("https://sviluppo4.arsdue.com/skills/" + id);
	let skill: Skill = await data.json();
	return (
		<Grid columns="2" gap="3" align="center" mb="3">
			<Text as="p" weight="light" className="col-span-1">
				{skill.name}
			</Text>

			{skill.jobTitleSkills.map(
				(jobTitleSkill) =>
					jobTitleSkill.jobTitleId == userJobTitleId && (
						<div className="flex flex-col border-b-2 col-span-1">
							<Tooltip content={`Expected value: ${jobTitleSkill.target}`}>
								<div
									className={`bg-gray-400 w-4 h-4 rounded-full my-[-8px] ml-[${jobTitleSkill.target}0px]`}
								></div>
							</Tooltip>
							{results.map(
								(result) =>
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
