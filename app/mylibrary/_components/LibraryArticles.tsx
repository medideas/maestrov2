"use client";
import ArticleCard from "@/app/articles/_components/ArticleCard";
import { fetchApi } from "@/app/utils/fetchInterceptor";
import { Box, Grid, Spinner, Flex, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const LibraryArticles = () => {
	const [articles, setArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();

	const fetchArticles = async () => {
		if (searchParams.get("tag") === null) {
			const data = await fetchApi("/my/articles");
			setArticles(data);
			setLoading(false);
		}
		if (searchParams.get("tag") === "saved") {
			const data = await fetchApi("/my/articles/pinned");
			setArticles(data);
			setLoading(false);
		}
		if (searchParams.get("tag") === "in-progress") {
			const data = await fetchApi("/my/articles/last-viewed");
			setArticles(data);
			setLoading(false);
		}
		if (searchParams.get("tag") === "recommended-for-you") {
			const data = await fetchApi("/my/articles/suggested");
			setArticles(data);
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchArticles();
	}, []);
	return loading ? (
		<Flex align={"center"} gap="2">
			<Spinner />
			<Text>We are loading your articles </Text>
		</Flex>
	) : (
		<Grid
			columns={{ initial: "1", md: "2", lg: "3" }}
			gap="3"
			justify="start"
			maxWidth="1100px"
		>
			{articles.map((article: Article) => (
				<Box minWidth={"300px"} key={article?.id.toString()}>
					<ArticleCard article={article} />
				</Box>
			))}
		</Grid>
	);
};

export default LibraryArticles;
