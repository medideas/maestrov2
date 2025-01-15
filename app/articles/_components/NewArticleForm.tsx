//ATTENTION: TO UPLOAD THE FILES (cover and attachment) NEED TO CREATE A FORM DATA OBJECT AND PASS THE VALUES INTO IT, THEN PASS THE FORMDATA INTO THE BODY REQUEST

"use client";
import {
	Box,
	Button,
	Callout,
	Card,
	Flex,
	Grid,
	Heading,
	Text,
} from "@radix-ui/themes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import * as Yup from "yup";
import FormCallout from "@/app/components/FormCallout";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import GoBack from "@/app/components/GoBack";

interface Props {
	article?: Article;
	educationalFrameworks: EducationalFramework[];
	educationalMethodologies: EducationalMethodology[];
	medias: Media[];
	languages: Language[];
	sources: Source[];
	educationalTools: EducationalTool[];
	courses: Course[];
	businessUnits: BusinessUnit[];
	regions: Region[];
	jobTitleSkills: JobTitleSkill[];
	jobTitles: JobTitle[];
}

const articleSchema = Yup.object().shape({
	title: Yup.string().min(1).required("Please, set the title"),
	description: Yup.string()
		.min(1)
		.required("Please, add a description of the file"),
	duration: Yup.number().min(1, "Duration should be at least 1 minute"),
	aiGenerated: Yup.boolean(),
	internalUseOnly: Yup.boolean(),
	mediaId: Yup.string().required("Please, select media type"),
	sourceId: Yup.string().required("Please, select source type"),
	langugageId: Yup.string().required("Please, select the language of the file"),
	educationalMethodologyId: Yup.string().required(
		"Please, select the educational methodology"
	),
	educationalFrameworkId: Yup.string().required(
		"Please, select the educational framework"
	),
	educationalToolId: Yup.string().required(
		"Please, select the educational tool "
	),
});

const NewArticleForm = ({
	article,
	educationalFrameworks,
	educationalMethodologies,
	educationalTools,
	medias,
	languages,
	sources,
	businessUnits,
	courses,
	regions,
	jobTitleSkills,
	jobTitles,
}: Props) => {
	const [coverFile, setCoverFile] = useState(article?.cover || "");
	const [contentFile, setContentFile] = useState(article?.content || "");
	const pathname = usePathname();
	const router = useRouter();
	const jwt = getCookie("jwt");

	const [submitting, setSubmitting] = useState(false);
	// let businessUnitIds: { businessUnitId: string }[] = [];
	// let courseIds: { courseId: string }[] = [];
	// let regionIds: { regionId: string }[] = [];
	return (
		<div>
			<Formik
				enableReinitialize={false}
				initialValues={{
					title: "",
					description: "",
					duration: 0,
					aiGenerated: false,
					internalUseOnly: false,
					revokedAt: "2050-01-01",
					mediaId: "",
					sourceId: "",
					educationalMethodologyId: "",
					educationalFrameworkId: "",
					educationalToolId: "",
					languageId: "",
					articleBusinessUnits: "",
					articleCourses: "",
					articleRegions: "",
					relevance: 0,
					cover: "",
					content: "",
				}}
				// validationSchema={articleSchema}
				onSubmit={async (values) => {
					setSubmitting(true);
					const formData = new FormData();
					formData.append("title", values.title);
					formData.append("description", values.description);
					formData.append("duration", values.duration.toString());
					formData.append("coverFile", coverFile);
					formData.append("contentFile", contentFile);
					formData.append("aiGenerated", values.aiGenerated.toString());
					formData.append("internalUseOnly", values.internalUseOnly.toString());
					formData.append("revokedAt", values.revokedAt.toString());
					formData.append("mediaId", values.mediaId);
					formData.append("sourceId", values.sourceId);
					formData.append(
						"educationalMethodologyId",
						values.educationalMethodologyId
					);
					formData.append(
						"educationalFrameworkId",
						values.educationalFrameworkId
					);
					formData.append("educationalToolId", values.educationalToolId);
					formData.append("languageId", values.languageId);
					pathname.includes("/edit") ? "edit" : "new";
					pathname.includes("/edit");

					const res = await fetch(
						process.env.NEXT_PUBLIC_APIBASE + "/articles",
						{
							headers: {
								Accept: "application/json",
								Authorization: "Bearer " + jwt,
							},
							method: "POST",
							body: formData, // Send FormData
						}
					);

					const newArticle = await res.json();
					console.log(await newArticle.id);
					console.log(
						JSON.stringify({
							businessUnits: values.articleBusinessUnits,
						})
					);
					// Business unit IDs
					const businessUnitRes = await fetch(
						`${process.env.NEXT_PUBLIC_APIBASE}
							/articles/
							${newArticle.id}
							/sync/business-units`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
								Authorization: "Bearer " + jwt,
							},
							body: JSON.stringify({
								businessUnits: values.articleBusinessUnits,
							}),
						}
					);
					console.log(await businessUnitRes.json());

					// Course IDs
					await fetch(
						`${process.env.NEXT_PUBLIC_APIBASE}
							/articles/
							${newArticle.id}
							/sync/courses`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
								Authorization: "Bearer " + jwt,
							},
							body: JSON.stringify({ courses: values.articleCourses }),
						}
					);

					// Region IDs
					await fetch(
						`${process.env.NEXT_PUBLIC_APIBASE}
							/articles/
							${newArticle.id}
							/sync/regions`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
								Authorization: "Bearer " + jwt,
							},
							body: JSON.stringify({ regions: values.articleRegions }),
						}
					);

					let resultJobTitleSkillIds: {
						jobTitleSkillId: string;
						relevance: Number;
					}[] = [];
					jobTitleSkills.map((jobTitleSkill, index) =>
						resultJobTitleSkillIds.push({
							jobTitleSkillId: jobTitleSkill.id,
							relevance:
								values.relevance[index] === undefined
									? 1
									: Number(values.relevance[index]),
						})
					);
					console.log(JSON.stringify(resultJobTitleSkillIds));
					await fetch(
						`${process.env.NEXT_PUBLIC_APIBASE}
							/articles/
							${newArticle.id}
							/sync/job-title-skills`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
								Authorization: "Bearer " + jwt,
							},
							body: JSON.stringify({ jobTitleSkills: resultJobTitleSkillIds }),
						}
					);

					router.push("/articles/" + newArticle.id);
				}}
			>
				{({ values, touched, errors }) => (
					<Form>
						<Grid columns="2" gap="5">
							<Flex direction="column">
								<div className="form-section">
									<label htmlFor="title">Title</label>
									<Field
										id="title"
										name="title"
										placeholder="Add the article's title"
									/>
									<ErrorMessage name="title" component="div">
										{(msg) => <FormCallout msg={msg} />}
									</ErrorMessage>
								</div>

								<div className="form-section">
									<label htmlFor="description">Description</label>
									<Field
										id="description"
										name="description"
										placeholder="Add article's description"
										as="textarea"
									/>
									<ErrorMessage name="description" component="div">
										{(msg) => <FormCallout msg={msg} />}
									</ErrorMessage>
								</div>

								<div className="form-section">
									<label htmlFor="duration">Duration of article</label>
									<Field id="duration" name="duration" type="number" />
									<ErrorMessage name="duration" component="div">
										{(msg) => <FormCallout msg={msg} />}
									</ErrorMessage>
								</div>

								<div className="form-section">
									<div role="group" aria-labelledby="my-radio-group">
										<p>Internal use only?</p>
										<label htmlFor="internalUseOnly">
											True
											<Field
												id="internalUseOnly"
												name="internalUseOnly"
												type="radio"
												value="true"
											/>
										</label>
										<label htmlFor="internalUseOnly">
											False
											<Field
												id="internalUseOnly"
												name="internalUseOnly"
												type="radio"
												value="false"
											/>
										</label>
										<ErrorMessage name="internalUseOnly" component="div">
											{(msg) => <FormCallout msg={msg} />}
										</ErrorMessage>
									</div>
								</div>

								<div className="form-section">
									<div role="group" aria-labelledby="my-radio-group">
										<p>AI Generated</p>
										<label htmlFor="aiGenerated">
											True
											<Field
												id="aiGenerated"
												name="aiGenerated"
												type="radio"
												value="true"
											/>
										</label>
										<label htmlFor="aiGenerated">
											False
											<Field
												id="aiGenerated"
												name="aiGenerated"
												type="radio"
												value="false"
											/>
										</label>
										<ErrorMessage name="aiGenerated" component="div">
											{(msg) => <FormCallout msg={msg} />}
										</ErrorMessage>
									</div>
								</div>

								<div className="form-section">
									<label htmlFor="revokedAt">Revoked at</label>
									<Field id="revokedAt" name="revokedAt" type="date" />
								</div>
							</Flex>
							<Flex direction="column">
								<Card className="shadow-lg">
									<Box p="3">
										<div className="form-section">
											<Flex align={"center"} justify={"start"} gap="3">
												<label htmlFor="cover" className="uploadLabel">
													Cover for article
												</label>
												{coverFile && <Text color="grass">Cover selected</Text>}
											</Flex>
											<Field
												id="cover"
												name="cover"
												type="file"
												className="file hidden"
												onChange={(event: {
													currentTarget: {
														files: React.SetStateAction<string>[];
													};
												}) => {
													console.log(event);
													setCoverFile(event.currentTarget.files[0]);
													console.log(coverFile);
												}}
											/>
											<ErrorMessage name="cover" component="div">
												{(msg) => <FormCallout msg={msg} />}
											</ErrorMessage>
										</div>

										<div className="form-section">
											<Flex align={"center"} justify={"start"} gap="3">
												<label htmlFor="content" className="uploadLabel">
													Content file for article
												</label>
												{contentFile && (
													<Text color="grass">File selected</Text>
												)}
											</Flex>
											<Field
												id="content"
												name="content"
												type="file"
												className="file hidden"
												onChange={(event: {
													currentTarget: {
														files: React.SetStateAction<string>[];
													};
												}) => {
													console.log(event.currentTarget.files[0]);
													setContentFile(event.currentTarget.files[0]);
												}}
											/>
											<ErrorMessage name="content" component="div">
												{(msg) => <FormCallout msg={msg} />}
											</ErrorMessage>
										</div>

										<div className="form-section">
											<label htmlFor="articleBusinessUnits">
												Business Units
											</label>
											{businessUnits.map((bu, index) => (
												<Flex key={index}>
													<Text>
														{bu.name}
														<Field
															name={`articleBusinessUnits`}
															type="checkbox"
															className="mb-1"
															value={`${bu.id}`}
														/>
													</Text>
												</Flex>
											))}
											<ErrorMessage name="articleBusinessUnits" component="div">
												{(msg) => <FormCallout msg={msg} />}
											</ErrorMessage>
										</div>

										<div className="form-section">
											<label htmlFor="articleCourses">Courses</label>
											{courses.map((c, index) => (
												<Flex key={index}>
													<Text>
														{c.name}
														<Field
															name={`articleCourses`}
															type="checkbox"
															className="mb-1"
															value={`${c.id}`}
														/>
													</Text>
												</Flex>
											))}
											<ErrorMessage name="articleCourses" component="div">
												{(msg) => <FormCallout msg={msg} />}
											</ErrorMessage>
										</div>

										<div className="form-section">
											<label htmlFor="articleRegions">Courses</label>
											{regions.map((r, index) => (
												<Flex key={index}>
													<Text>
														{r.name}
														<Field
															name={`articleRegions`}
															type="checkbox"
															className="mb-1"
															value={`${r.id}`}
														/>
													</Text>
												</Flex>
											))}
											<ErrorMessage name="articleRegions" component="div">
												{(msg) => <FormCallout msg={msg} />}
											</ErrorMessage>
										</div>

										<div className="form-section">
											<label htmlFor="educationalFrameworkId">
												Educational Framework
											</label>
											<Field
												id="educationalFrameworkId"
												name="educationalFrameworkId"
												component="select"
												mulitple="false"
												className="mb-1"
											>
												<option>Select an option</option>
												{educationalFrameworks.map((educationalFramework) => (
													<option
														key={educationalFramework.id}
														value={educationalFramework.id}
													>
														{educationalFramework.name}
													</option>
												))}
											</Field>
											<ErrorMessage
												name="educationalFrameworkId"
												component="div"
											>
												{(msg) => <FormCallout msg={msg} />}
											</ErrorMessage>
										</div>

										<div className="form-section">
											<label htmlFor="educationalMethodologyId">
												Educational Methodology
											</label>
											<Field
												id="educationalMethodologyId"
												name="educationalMethodologyId"
												component="select"
												mulitple="false"
												className="mb-1"
											>
												<option>Select an option</option>
												{educationalMethodologies.map(
													(educationalMethodology) => (
														<option
															key={educationalMethodology.id}
															value={educationalMethodology.id}
														>
															{educationalMethodology.name}
														</option>
													)
												)}
											</Field>
											<ErrorMessage
												name="educationalMethodologyId"
												component="div"
											>
												{(msg) => <FormCallout msg={msg} />}
											</ErrorMessage>
										</div>

										<div className="form-section">
											<label htmlFor="educationalToolId">
												Educational Tool
											</label>
											<Field
												id="educationalToolId"
												name="educationalToolId"
												component="select"
												mulitple="false"
												className="mb-1"
											>
												<option>Select an option</option>
												{educationalTools.map((educationalTool) => (
													<option
														key={educationalTool.id}
														value={educationalTool.id}
													>
														{educationalTool.name}
													</option>
												))}
											</Field>
											<ErrorMessage name="educationalToolId" component="div">
												{(msg) => <FormCallout msg={msg} />}
											</ErrorMessage>
										</div>

										<div className="form-section">
											<label htmlFor="sourceId">Source</label>
											<Field
												id="sourceId"
												name="sourceId"
												component="select"
												mulitple="false"
												className="mb-1"
											>
												<option>Select an option</option>
												{sources.map((source) => (
													<option key={source.id} value={source.id}>
														{source.name}
													</option>
												))}
											</Field>
											<ErrorMessage name="sourceId" component="div">
												{(msg) => <FormCallout msg={msg} />}
											</ErrorMessage>
										</div>

										<div className="form-section">
											<label htmlFor="languageId">Language</label>
											<Field
												id="languageId"
												name="languageId"
												component="select"
												mulitple="false"
												className="mb-1"
											>
												<option>Select an option</option>
												{languages.map((language) => (
													<option key={language.id} value={language.id}>
														{language.name}
													</option>
												))}
											</Field>
											<ErrorMessage name="languageId" component="div">
												{(msg) => <FormCallout msg={msg} />}
											</ErrorMessage>
										</div>

										<div className="form-section">
											<label htmlFor="mediaId">Media</label>
											<Field
												id="mediaId"
												name="mediaId"
												component="select"
												mulitple="false"
												className="mb-1"
											>
												<option>Select an option</option>
												{medias.map((media) => (
													<option key={media.id} value={media.id}>
														{media.name}
													</option>
												))}
											</Field>
											<ErrorMessage name="mediaId" component="div">
												{(msg) => <FormCallout msg={msg} />}
											</ErrorMessage>
										</div>
									</Box>
								</Card>
							</Flex>
						</Grid>
						<Card my="5" className="shadow-md">
							<Heading size="3">Relevance per Job Title</Heading>
							<Grid my="3" columns={"2"} gap="5">
								{jobTitles.map((jobTitle) => (
									<Flex key={String(jobTitle.id)} direction={"column"}>
										<Heading size="2">{jobTitle.name}</Heading>
										<ul>
											{jobTitleSkills.map(
												(jobTitleSkill, index) =>
													jobTitleSkill.jobTitle.name === jobTitle.name && (
														<Flex justify={"end"} gap="4" mb="2" key={index}>
															<Text className="text-left">
																{jobTitleSkill.skill.name}
															</Text>
															<Field as="select" name={`relevance[${index}]`}>
																<option value="0">0</option>
																<option value="1">1</option>
																<option value="2">2</option>
																<option value="3" selected defaultValue={"3"}>
																	3
																</option>
															</Field>
														</Flex>
													)
											)}
										</ul>
									</Flex>
								))}
							</Grid>
						</Card>

						<Flex gap="3">
							<Button type="submit" disabled={submitting}>
								Submit article
							</Button>
							<GoBack />
						</Flex>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default NewArticleForm;
