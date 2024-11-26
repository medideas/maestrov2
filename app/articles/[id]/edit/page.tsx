import { Container, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import ArticleForm from "../../_components/ArticleForm";
import fetchInterceptor from "@/app/utils/fetchInterceptor";

const EditArticlePage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;
	const article = await fetchInterceptor(
		process.env.APIBASE + "/articles/" + params.id
	);
	const educationalFrameworks = await fetchInterceptor(
		process.env.APIBASE + "/educational-frameworks"
	);
	const educationalMethodolodies = await fetchInterceptor(
		process.env.APIBASE + "/educational-methodologies"
	);
	const medias = await fetchInterceptor(process.env.APIBASE + "/media");
	const languages = await fetchInterceptor(process.env.APIBASE + "/languages");
	const sources = await fetchInterceptor(process.env.APIBASE + "/sources");
	const educationalTools = await fetchInterceptor(
		process.env.APIBASE + "/educational-tools"
	);

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
