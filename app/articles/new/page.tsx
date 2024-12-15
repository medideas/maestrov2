import { Container, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { fetchApi } from "@/app/utils/fetchInterceptor";
import NewArticleForm from "../_components/NewArticleForm";

const NewArticle = async () => {
	const [
		educationalFrameworks,
		educationalMethodolodies,
		medias,
		languages,
		sources,
		educationalTools,
	] = await Promise.all([
		fetchApi("/educational-frameworks"),
		fetchApi("/educational-methodologies"),
		fetchApi("/media"),
		fetchApi("/languages"),
		fetchApi("/sources"),
		fetchApi("/educational-tools"),
	]);
	
	return (
		<Container my="5">
			<Heading>New article</Heading>
			<Text>
				Add the required information to add content to the Knowledge base
			</Text>
			<NewArticleForm
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
