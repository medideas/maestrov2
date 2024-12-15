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
	businessUnits: BusinessUnit[];
	courses: Course[];
	regions: Region[];
}

function dataURLtoFile(dataurl: string, filename: string) {
	var arr = dataurl.split(","),
		mime = arr[0].match(/:(.*?);/)![1],
		bstr = atob(arr[arr.length - 1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, { type: mime });
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
const EditArticleForm = ({
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
}: Props) => {
	const [coverFile, setCoverFile] = useState(article?.cover || "");
	const pathname = usePathname();
	const router = useRouter();
	const jwt = getCookie("jwt");

	const [submitting, setSubmitting] = useState(false);

	var file = dataURLtoFile(
		`data:image/jpeg;base64, ${article?.cover}`,
		"image.jpg"
	);

	useEffect(() => {
		const fileInput = document.querySelector('input[type="file"]');
		console.log(fileInput);
		const dataTransfer = new DataTransfer();
		dataTransfer.items.add(file);
		fileInput.files = dataTransfer.files;
		setCoverFile(file);
	}, []);

	return (
		<Flex direction={"column"} width={"100%"}>
			<Formik
				enableReinitialize={false}
				initialValues={{
					title: article?.title || "",
					description: article?.description || "",
					duration: article?.duration || 0,
					aiGenerated: article?.aiGenerated || false,
					internalUseOnly: article?.internalUseOnly || false,
					revokedAt: "2050-01-01",
					mediaId: article?.mediaId || "",
					sourceId: article?.sourceId || "",
					educationalMethodologyId: article?.educationalMethodologyId || "",
					educationalFrameworkId: article?.educationalFrameworkId || "",
					educationalToolId: article?.educationalToolId || "",
					languageId: article?.languageId || "",
					cover: "",
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
					formData.append("aiGenerated", values.aiGenerated);
					formData.append("internalUseOnly", values.internalUseOnly);
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

					await fetch(
						process.env.NEXT_PUBLIC_APIBASE + "/articles/" + article?.id,
						{
							headers: {
								Accept: "application/json",
								Authorization: "Bearer " + jwt,
							},
							method: "PUT",
							body: formData, // Send FormData
						}
					);
					router.push("/articles/" + article?.id);
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
									<label htmlFor="duration">Duration of article (pages)</label>
									<Field id="duration" name="duration" type="number" />
									<ErrorMessage name="duration" component="div">
										{(msg) => <FormCallout msg={msg} />}
									</ErrorMessage>
								</div>

								<div className="form-section">
									<div role="group" aria-labelledby="my-radio-group">
										<label htmlFor="internalUseOnly">
											Internal Use Only
											<Field
												id="internalUseOnly"
												name="internalUseOnly"
												type="checkbox"
												value={Boolean(values.internalUseOnly)}
												checked={Boolean(values.internalUseOnly)}
											/>
										</label>
										<ErrorMessage name="internalUseOnly" component="div">
											{(msg) => <FormCallout msg={msg} />}
										</ErrorMessage>
									</div>
								</div>

								<div className="form-section">
									<div role="group" aria-labelledby="my-radio-group">
										<label htmlFor="aiGenerated">
											AI Generated
											<Field
												id="aiGenerated"
												name="aiGenerated"
												type="checkbox"
												value={Boolean(values.aiGenerated)}
												checked={Boolean(values.aiGenerated)}
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

						<Flex gap="3">
							<Button type="submit" disabled={submitting}>
								Save changes
							</Button>
							<GoBack />
						</Flex>
					</Form>
				)}
			</Formik>
		</Flex>
	);
};

export default EditArticleForm;
