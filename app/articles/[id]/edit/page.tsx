import { Container, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import EditArticleForm from "../../_components/EditArticleForm";
import fetchInterceptor from "@/app/utils/fetchInterceptor";

const EditArticlePage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;
	const article = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/articles/" + params.id
	);
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
		<Container className="py-[50px]" width={"100%"}>
			<Flex>
				<Heading>{article.title}</Heading>
			</Flex>
			<Flex>
				<EditArticleForm
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
