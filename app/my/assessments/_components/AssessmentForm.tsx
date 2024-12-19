"use client";
import {
	Button,
	Container,
	Flex,
	Grid,
	Heading,
	Separator,
	Text,
} from "@radix-ui/themes";
import { Form, Formik, Field } from "formik";
import React from "react";
import { useRouter } from "next/navigation";
import assessmentQuestions from "@/app/utils/assessmentQuestions";
import { getCookie } from "cookies-next";
import { MdOutlineQuiz } from "react-icons/md";
import GoBack from "@/app/components/GoBack";

type AssessmenTQuestionSet = {
	question: string;
	Answer_1: string;
};

interface Props {
	jobTitleSkills: JobTitleSkill[];
	user: User;
}

const AssessmentForm = ({ jobTitleSkills, user }: Props) => {
	const jwt = getCookie("jwt");
	const router = useRouter();
	let answer: { jobTitleSkillId: string; value: number } = {
		jobTitleSkillId: "",
		value: 0,
	};
	let quiz: { jobTitleSkillId: string; value: number }[] = [];
	let submitQuiz = { name: "", assessmentResults: quiz };
	return (
		<Container py="5">
			<Flex
				align={"center"}
				gap="4"
				className="bg-slate-100 pt-4 px-5 rounded-full shadow-xl"
				mb="7"
			>
				<MdOutlineQuiz size="60" className="pb-4" />
				<Flex direction={"column"} mb="5">
					<Text className="pb-2">
						You are taking the assessment for the job title:
					</Text>
					<Heading>{user.jobTitle.name}</Heading>
				</Flex>
			</Flex>
			<Formik
				initialValues={{
					name: "",
					assessmentResults: [],
				}}
				onSubmit={(values) => {
					assessmentQuestions[0].jobTitleSkillIds.map((job, index) =>
						quiz.push({
							jobTitleSkillId: job.jobTitleSkillid,
							value: Number(values.assessmentResults[index].value),
						})
					);
					submitQuiz = { name: values.name, assessmentResults: quiz };
					console.log(JSON.stringify(submitQuiz));
					fetch(process.env.NEXT_PUBLIC_APIBASE + "/my/assessments/", {
						headers: {
							Accept: "application/json",
							Authorization: `Bearer ${jwt}`,
						},
						method: "POST",
						body: JSON.stringify(submitQuiz),
					});
				}}
			>
				<Form>
					<label htmlFor="name">
						Assign a name to this assessment
						<Field name="name" />
					</label>
					{/* {assessmentQuestions.map((assessmentQuestionsSet) => */}
					{/* assessmentQuestionsSet.jobTitleId === user.jobTitleId && */}

					{assessmentQuestions[0].jobTitleSkillIds.map((job, index) => (
						<div key={index} className="p-4">
							<Text weight="bold">{job.Question}</Text>
							<Grid columns="4">
								<div className="p-3 m-3 border-[1px] rounded-sm hover:shadow-md hover:translate-y-[-4px] transition-all  duration-200 ease-in-out">
									<label htmlFor={`assessmentResults[${index}].value`}>
										<Field
											name={`assessmentResults[${index}].value`}
											type="radio"
											value="1"
										/>
										<Separator size="4" my="3" />
										{job.Answer_1}
									</label>
								</div>
								<div className="p-3 m-3 border-[1px] rounded-sm hover:shadow-md hover:translate-y-[-4px] transition-all  duration-200 ease-in-out">
									<label htmlFor={`assessmentResults[${index}].value`}>
										<Field
											name={`assessmentResults[${index}].value`}
											type="radio"
											value="2"
										/>
										<Separator size="4" my="3" />
										{job.Answer_2}
									</label>
								</div>
								<div className="p-3 m-3 border-[1px] rounded-sm hover:shadow-md hover:translate-y-[-4px] transition-all  duration-200 ease-in-out">
									<label htmlFor={`assessmentResults[${index}].value`}>
										<Field
											name={`assessmentResults[${index}].value`}
											type="radio"
											value="3"
										/>
										<Separator size="4" my="3" />
										{job.Answer_3}
									</label>
								</div>
								<div className="p-3 m-3 border-[1px] rounded-sm hover:shadow-md hover:translate-y-[-4px] transition-all  duration-200 ease-in-out">
									<label htmlFor={`assessmentResults[${index}].value`}>
										<Field
											name={`assessmentResults[${index}].value`}
											type="radio"
											value="4"
										/>
										<Separator size="4" my="3" />
										{job.Answer_4}
									</label>
								</div>
							</Grid>
						</div>
					))}
					<Flex gap="5" align={"center"}>
						<Button type="submit">Save assessment</Button>
						<GoBack />
					</Flex>
				</Form>
			</Formik>
		</Container>
	);
};

export default AssessmentForm;
