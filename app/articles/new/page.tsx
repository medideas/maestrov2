import { Container, Heading, Text } from "@radix-ui/themes";
import React from "react";
import ArticleForm from "../_components/ArticleForm";
import fetchInterceptor from "@/app/utils/fetchInterceptor";

const NewArticle = async () => {
	const educationalFrameworks = await fetchInterceptor(
		process.env.APIBASE + "/educational-frameworks"
	);
	const educationalMethodolodies = await fetchInterceptor(
		process.env.APIBASE + "/educational-methodologies"
	);
	const medias = await fetchInterceptor(process.env.APIBASE + "/medias");
	const languages = await fetchInterceptor(process.env.APIBASE + "/languages");
	const sources = await fetchInterceptor(process.env.APIBASE + "/sources");
	const educationalTools = await fetchInterceptor(
		process.env.APIBASE + "/educational-tools"
	);
	return (
		<Container>
			<Heading>New article</Heading>
			<Text>
				Add the required information to add content to the Knowledge base
			</Text>
			<ArticleForm
				educationalFrameworks={educationalFrameworks}
				educationalMethodologies={educationalMethodolodies}
				educationalTools={educationalTools}
				sources={sources}
				medias={medias}
				languages={languages}
			/>
		</Container>
	);
};

export default NewArticle;
