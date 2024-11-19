import { Container, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import ArticleForm from "../../_components/ArticleForm";

const EditArticlePage = async ({ params }: { params: { id: string } }) => {
	var data = await fetch("https://sviluppo4.arsdue.com/articles/" + params.id);
	const article = await data.json();
	data = await fetch("https://sviluppo4.arsdue.com/educational-frameworks");
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
