import { Flex, Container, Heading, Text } from "@radix-ui/themes";
import React from "react";
import ArticleForm from "../_components/ArticleForm";

const NewArticle = async () => {
	var data = await fetch("https://sviluppo4.arsdue.com/educational-frameworks");
	const educationalFrameworks = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/educational-methodologies");
	const educationalMethodolodies = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/media");
	const medias = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/languages");
	const languages = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/sources");
	const sources = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/educational-tools");
	const educationalTools = await data.json();
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
