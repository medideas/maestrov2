"use client";
import { Button, Flex, Heading, TextField } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";
import { Field, FieldArray, Form, Formik, insert } from "formik";
import { z } from "zod";
import { assessmentSchema } from "@/app/validationSchemas";

interface Props {
	jobTitleSkills: JobTitleSkill[];
}

type JobTitleSkill = {
	id: string;
	skill: Skill;
	jobTitle: JobTitle;
	jobTitleId: string;
	value: number;
};

type Skill = {
	id: string;
};

type JobTitle = {
	id: string;
};

type AssessmentResult = {
	jobTitleSkillId: string;
	value: number;
};

//DEVO SOLO RIUSCIRE A FAR ARRIVARE QUI UN ARRAY DI OBJECT FATTO DI JOBTITLESKILLIDS + VALUE DEFAULT, TANTE QUANTE SONO LE SKILLS NELLA VALUTAZIONE
const results = [
	{ jobTitleSkillId: "w23232323424", value: 4 },
	{ jobTitleSkillId: "fdsfdsafdsafdasf", value: 3 },
	{ jobTitleSkillId: "w23232sfaasfasfasf323424", value: 4 },
];

const AssessmentForm = ({ jobTitleSkills }: Props) => {
	const userJobTitleId = "8183d06e-e4e5-46f1-ada9-373afc37e366";
	const router = useRouter();
	function setFieldValue(id: string) {
		throw new Error("Function not implemented.");
	}

	return (
		<div>
			<Formik
				initialValues={{
					name: "",
					assessmentResults: results,
				}}
				onSubmit={async (values) => {
					console.log(JSON.stringify(values));
				}}
			>
				{(values) => (
					<Form>
						<Flex direction="column">
							<div>
								<label>Assessment name</label>
								<Field name="name" className="border-2 mx-3" />
							</div>
							<div>
								<FieldArray name="assessmentResults">
									{({ insert, remove, push }) => (
										<div>
											{values.values.assessmentResults.map((results, index) => (
												<div key={index}>
													<Field
														type="hidden"
														name={`assessmentResults[${index}].jobTitleSkillId`}
														className="border-2"
													/>
													<Field name={`assessmentResults[${index}].value`} />
												</div>
											))}
										</div>
									)}
								</FieldArray>
							</div>
						</Flex>
						<Button type="submit">Save assessment</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default AssessmentForm;

//
