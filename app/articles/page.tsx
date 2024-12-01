import { Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import React from "react";
import Link from "next/link";
import ArticleCard from "./_components/ArticleCard";
import fetchInterceptor from "../utils/fetchInterceptor";

type Article = {
	cover: string;
	id: string;
	title: string;
	description: string;
	aiGenerated: boolean;
	internalUseOnly: boolean;
};

const ArticlesPage = async () => {
	const articles = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/articles"
	);
	return (
		<Flex direction="column" gap="4" p="5">
			<Flex justify="between">
				<Flex direction="column">
					<Heading>Articles</Heading>
					<Text>In this section you can find all the articles</Text>
				</Flex>
				<Flex>
					<Link href="/articles/new">
						<Button>Add a new article</Button>
					</Link>
				</Flex>
			</Flex>
			<Grid columns="4" gap="3">
				{articles.map((article: Article) => (
					<ArticleCard key={article.id} article={article} />
				))}
			</Grid>
		</Flex>
	);
};

export default ArticlesPage;
