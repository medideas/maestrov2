import { Button, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import React, { Suspense } from "react";
import Link from "next/link";
import ArticleCard from "./_components/ArticleCard";
import fetchInterceptor from "../utils/fetchInterceptor";
import ArticlesTable from "./_components/ArticlesTable";

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
			<Flex
				direction={{ initial: "column", md: "row" }}
				justify="between"
				gap={{ initial: "3", md: "0" }}
			>
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
			<Suspense>
				<ArticlesTable articles={articles} />
			</Suspense>
		</Flex>
	);
};

export default ArticlesPage;
