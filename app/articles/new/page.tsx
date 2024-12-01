import { Container, Heading, Text } from "@radix-ui/themes";
import React from "react";
import ArticleForm from "../_components/ArticleForm";
import fetchInterceptor from "@/app/utils/fetchInterceptor";

const NewArticle = async () => {
	const educationalFrameworks = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/educational-frameworks"
	);
	const educationalMethodolodies = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/educational-methodologies"
	);
	const medias = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/media"
	);
	const languages = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/languages"
	);
	const sources = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/sources"
	);
	const educationalTools = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/educational-tools"
	);
	return (
		<Container my="5">
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
