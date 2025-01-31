"use client";
import ArticleCard from "@/app/articles/_components/ArticleCard";
import { fetchApi } from "@/app/utils/fetchInterceptor";
import { Grid, Spinner, Flex, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const LibraryArticles = () => {
	const [articles, setArticles] = useState<Article[]>([]);
	const [loading, setLoading] = useState(true);
	const searchParams = useSearchParams();

	const fetchArticles = async () => {
		const tag = searchParams.get("tag") || "";
		const apiPaths: Record<string, string> = {
			"": "/my/articles",
			saved: "/my/articles/status/pinned",
			"in-progress": "/my/articles/status/last-viewed",
			"recommended-for-you": "/my/articles/suggested",
		};

		const data = await fetchApi(apiPaths[tag]);
		setArticles(data);
		setLoading(false);
	};
	useEffect(() => {
		fetchArticles();
	}, [searchParams]);

	return loading ? (
		<Flex align={"center"} justify={"center"} height="100vh">
			<Spinner />
			<Text>Loading your articles...</Text>
		</Flex>
	) : (
		<Grid columns={{ initial: "1", md: "2", lg: "3" }} gap="4">
			{articles.map((article) => (
				<ArticleCard key={article.id.toString()} article={article} />
			))}
		</Grid>
	);
};

export default LibraryArticles;
