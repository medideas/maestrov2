//ATTENTION: TO UPLOAD THE FILES (cover and attachment) NEED TO CREATE A FORM DATA OBJECT AND PASS THE VALUES INTO IT, THEN PASS THE FORMDATA INTO THE BODY REQUEST

"use client";
import { Box, Button, Card, Flex, Grid } from "@radix-ui/themes";
import axios from "axios";
import { Field, Form, Formik, useField } from "formik";
import React, { useState } from "react";
import ArticleCard from "./ArticleCard";
import { usePathname, useRouter } from "next/navigation";

interface Props {
	article?: Article;
	educationalFrameworks: EducationalFramework[];
	educationalMethodologies: EducationalMethodology[];
	medias: Media[];
	languages: Language[];
	sources: Source[];
	educationalTools: EducationalTool[];
}

type Article = {
	id: string;
	title: string;
	description: string;
	cover: string;
	content: string;
	duration: string;
	educationalFrameworkId: string;
	educationalToolId: string;
	educationalMethodologyId: string;
	sourceId: string;
	mediaId: string;
	languageId: string;
	aiGenerated: boolean;
	internalUseOnly: boolean;
};

type EducationalFramework = {
	id: "string";
	name: "string";
};

type EducationalMethodology = {
	id: "string";
	name: "string";
};

type Media = {
	id: "string";
	name: "string";
};

type Language = {
	id: "string";
	name: "string";
};

type Source = {
	id: "string";
	name: "string";
};

type EducationalTool = {
	id: "string";
	name: "string";
};

const ArticleForm = ({
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
	return (
		<div>
			<Formik
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
					content: "",
				}}
				onSubmit={async (values) => {
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
					pathname.includes("/edit")
						? await fetch(
								"https://sviluppo4.arsdue.com/articles/" + article?.id,
								{
									method: "PATCH",
									body: formData, // Send FormData
								}
						  )
						: await fetch("https://sviluppo4.arsdue.com/articles", {
								method: "POST",
								body: formData, // Send FormData
						  });
					router.push("/articles");
				}}
			>
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
							</div>

							<div className="form-section">
								<label htmlFor="description">Description</label>
								<Field
									id="description"
									name="description"
									placeholder="Add article's description"
									as="textarea"
								/>
							</div>

							<div className="form-section">
								<label htmlFor="duration">Duration of article</label>
								<Field id="duration" name="duration" type="number" />
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
												setCoverFile(event.currentTarget.files[0]);
												console.log(coverFile);
											}}
										/>
									</div>

									<div className="form-section">
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
												setContentFile(event.currentTarget.files[0]);
											}}
										/>
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
									</div>

									<div className="form-section">
										<label htmlFor="educationalToolId">Educational Tools</label>
										<Field
											id="educationalToolId"
											name="educationalToolId"
											component="select"
											mulitple="false"
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
									</div>

									<div className="form-section">
										<label htmlFor="sourceId">Sources</label>
										<Field
											id="sourceId"
											name="sourceId"
											component="select"
											mulitple="false"
										>
											<option>Select an option</option>
											{sources.map((source) => (
												<option key={source.id} value={source.id}>
													{source.name}
												</option>
											))}
										</Field>
									</div>

									<div className="form-section">
										<label htmlFor="languageId">Languages</label>
										<Field
											id="languageId"
											name="languageId"
											component="select"
											mulitple="false"
										>
											<option>Select an option</option>
											{languages.map((language) => (
												<option key={language.id} value={language.id}>
													{language.name}
												</option>
											))}
										</Field>
									</div>

									<div className="form-section">
										<label htmlFor="mediaId">Medias</label>
										<Field
											id="mediaId"
											name="mediaId"
											component="select"
											mulitple="false"
										>
											<option>Select an option</option>
											{medias.map((media) => (
												<option key={media.id} value={media.id}>
													{media.name}
												</option>
											))}
										</Field>
									</div>
								</Box>
							</Card>
						</Flex>
					</Grid>

					<div>
						<Button type="submit">Submit article</Button>
					</div>
				</Form>
			</Formik>
		</div>
	);
};

export default ArticleForm;
