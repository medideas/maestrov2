import { fetchApi } from "@/app/utils/fetchInterceptor";
import { Flex, Heading } from "@radix-ui/themes";
import React from "react";

const MyArticlePage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const id = (await params).id;
	const article = await fetchApi(`/my/articles/${id}`);
	console.log(article);
	return (
		<Flex>
			<Heading>My article</Heading>
		</Flex>
	);
};

export default MyArticlePage;
