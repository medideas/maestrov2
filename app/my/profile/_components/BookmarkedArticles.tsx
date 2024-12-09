import fetchInterceptor from "@/app/utils/fetchInterceptor";
import { Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import LinkBookmarkedArticle from "./LinkBookmarkedArticle";

const BookmarkedArticles = async () => {
	const myArticles: Article[] = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/my/articles/pinned`
	);
	return (
		<Flex direction={"column"}>
			{myArticles.length === 0 ? (
				<Text>You haven't pinned any article yet</Text>
			) : (
				myArticles.map((article) => <LinkBookmarkedArticle article={article} />)
			)}
		</Flex>
	);
};

export default BookmarkedArticles;
