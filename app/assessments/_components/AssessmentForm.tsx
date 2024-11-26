"use client";
import { Button, Flex, Grid, Text } from "@radix-ui/themes";
import { Form, Formik, Field } from "formik";
import React from "react";
import assessmentQuestions from "../../utils/assessmentQuestions";

type JobTitleSkillId = {
	question: string;
	answer_1: string;
};

const AssessmentForm = () => {
	return (
		<Flex>
			<Formik
				initialValues={{
					name: "",
					assessmentResults: [{ jobTitleSkillId: "", value: "" }],
				}}
				onSubmit={(values) => console.log(JSON.stringify(values))}
			>
				<Form>
					<Field name="name" />
					{assessmentQuestions[0].jobTitleSkillIds.map((job, index) => (
						<div key={index} className="p-4">
							<Text weight="bold">{job.Question}</Text>
							<Field
								name={`assessmentResults[${index}].jobTitleSkillId`}
								value={job.jobTitleSkillid}
								type="hidden"
							/>
							<Grid columns="4">
								<label>
									<Field
										name={`assessmentResults[${index}].value`}
										type="radio"
										value="1"
									/>
									{job.Answer_1}
								</label>
								<label>
									<Field
										name={`assessmentResults[${index}].value`}
										type="radio"
										value="2"
									/>
									{job.Answer_2}
								</label>
								<label>
									<Field
										name={`assessmentResults[${index}].value`}
										type="radio"
										value="3"
									/>
									{job.Answer_3}
								</label>
								<label>
									<Field
										name={`assessmentResults[${index}].value`}
										type="radio"
										value="4"
									/>
									{job.Answer_4}
								</label>
							</Grid>
						</div>
					))}
					<Button type="submit">Save assessment</Button>
				</Form>
			</Formik>
		</Flex>
	);
};

export default AssessmentForm;
