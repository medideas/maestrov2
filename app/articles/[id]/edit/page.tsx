import { Container, Flex, Heading } from "@radix-ui/themes";
import React from "react";
import EditArticleForm from "../../_components/EditArticleForm";
import { fetchApi } from "@/app/utils/fetchInterceptor";

const EditArticlePage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;

	const [
		article,
		educationalFrameworks,
		educationalMethodolodies,
		medias,
		languages,
		sources,
		educationalTools,
	] = await Promise.all([
		fetchApi("/articles/" + params.id),
		fetchApi("/educational-frameworks"),
		fetchApi("/educational-methodologies"),
		fetchApi("/media"),
		fetchApi("/languages"),
		fetchApi("/sources"),
		fetchApi("/educational-tools")
	]);

	return (
		<Flex
			direction={"column"}
			className="py-[50px] mx-auto"
			width={"100%"}
			maxWidth={"1000px"}
		>
			<Flex>
				<Heading>{article.title}</Heading>
			</Flex>
			<Flex width={"100%"}>
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
		</Flex>
	);
};

export default EditArticlePage;
