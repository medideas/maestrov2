import { Container, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import ArticleForm from "../../_components/ArticleForm";

const EditArticlePage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;
	var data = await fetch(process.env.APIBASE + "/articles/" + params.id);
	const article = await data.json();
	data = await fetch(process.env.APIBASE + "/educational-frameworks");
	const educationalFrameworks = await data.json();
	data = await fetch(process.env.APIBASE + "/educational-methodologies");
	const educationalMethodolodies = await data.json();
	data = await fetch(process.env.APIBASE + "/media");
	const medias = await data.json();
	data = await fetch(process.env.APIBASE + "/languages");
	const languages = await data.json();
	data = await fetch(process.env.APIBASE + "/sources");
	const sources = await data.json();
	data = await fetch(process.env.APIBASE + "/educational-tools");
	const educationalTools = await data.json();
	return (
		<Container>
			<Flex>
				<Heading>{article.title}</Heading>
			</Flex>
			<Flex>
				<ArticleForm
					article={article}
					educationalFrameworks={educationalFrameworks}
					educationalMethodologies={educationalMethodolodies}
					medias={medias}
					languages={languages}
					sources={sources}
					educationalTools={educationalTools}
				/>
			</Flex>
		</Container>
	);
};

export default EditArticlePage;
