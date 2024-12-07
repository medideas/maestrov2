//ATTENTION: TO UPLOAD THE FILES (cover and attachment) NEED TO CREATE A FORM DATA OBJECT AND PASS THE VALUES INTO IT, THEN PASS THE FORMDATA INTO THE BODY REQUEST

"use client";
import { Box, Button, Callout, Card, Flex, Grid, Text } from "@radix-ui/themes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import * as Yup from "yup";
import FormCallout from "@/app/components/FormCallout";
import { InfoCircledIcon } from "@radix-ui/react-icons";

interface Props {
	article?: Article;
	educationalFrameworks: EducationalFramework[];
	educationalMethodologies: EducationalMethodology[];
	medias: Media[];
	languages: Language[];
	sources: Source[];
	educationalTools: EducationalTool[];
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
}: Props) => {
	const [coverFile, setCoverFile] = useState(article?.cover || "");
	const [contentFile, setContentFile] = useState(article?.content || "");
	const pathname = usePathname();
	const router = useRouter();
	const jwt = getCookie("jwt");

	// useEffect(() => {
	// 	fetch(
	// 		`${process.env.NEXT_PUBLIC_APIBASE}/articles/${article?.id}/download`,
	// 		{
	// 			method: "GET",
	// 			headers: {
	// 				Authorization: `Bearer ${jwt}`,
	// 				"Content-type": "Application/json",
	// 			},
	// 		}
	// 	)
	// 		.then((response) => response.json())
	// 		.then((json) => setContentFile(json));
	// }, []);
	const [submitting, setSubmitting] = useState(false);
	return (
		<div>
			<Formik
				enableReinitialize={false}
				initialValues={{
					title: article?.title || "",
					description: article?.description || "",
					duration: article?.duration || 0,
					aiGenerated: String(article?.aiGenerated) || String(false),
					internalUseOnly: String(article?.internalUseOnly) || String(false),
					revokedAt: "2050-01-01",
					mediaId: article?.mediaId || "",
					sourceId: article?.sourceId || "",
					educationalMethodologyId: article?.educationalMethodologyId || "",
					educationalFrameworkId: article?.educationalFrameworkId || "",
					educationalToolId: article?.educationalToolId || "",
					languageId: article?.languageId || "",
					cover: "",
					content: "",
				}}
				// validationSchema={articleSchema}
				onSubmit={async (values) => {
					setSubmitting(true);
					console.log(JSON.stringify(values));
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

					await fetch(process.env.NEXT_PUBLIC_APIBASE + "/articles", {
						headers: {
							Accept: "application/json",
							Authorization: "Bearer " + jwt,
						},
						method: "POST",
						body: formData, // Send FormData
					});
					router.push("/articles");
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
											<label htmlFor="coverFile">Cover for article</label>
											<Field
												id="cover"
												name="cover"
												type="file"
												className="file"
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

											{coverFile && (
												<Callout.Root color="grass" mb="3">
													<Callout.Icon>
														<InfoCircledIcon />
													</Callout.Icon>
													<Callout.Text>Cover is already selected</Callout.Text>
												</Callout.Root>
											)}
											{coverFile && (
												<img
													src={`data:image/jpg;base64, ${values.coverFile}`}
													style={{
														objectFit: "cover",
														width: "150px",
														height: "100%",
														borderRadius: "5px",
													}}
												/>
											)}
											<ErrorMessage name="cover" component="div">
												{(msg) => <FormCallout msg={msg} />}
											</ErrorMessage>
										</div>

										<div className="form-section">
											{contentFile && <Text>The file is still here</Text>}
											<label htmlFor="contentFile">
												Content file for article
											</label>
											<Field
												id="content"
												name="content"
												type="file"
												className="file"
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
												Educational Tools
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
											<label htmlFor="sourceId">Sources</label>
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
											<label htmlFor="languageId">Languages</label>
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
											<label htmlFor="mediaId">Medias</label>
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

						<div>
							<Button type="submit" disabled={submitting}>
								Submit article
							</Button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default NewArticleForm;
