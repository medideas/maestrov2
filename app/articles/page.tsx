import {
	Box,
	Button,
	Card,
	Flex,
	Grid,
	Heading,
	Inset,
	Text,
} from "@radix-ui/themes";
import React from "react";
import CarouselCard from "../components/CarouselCard";
import Link from "next/link";
import ArticleForm from "./_components/ArticleForm";
import ArticleCard from "./_components/ArticleCard";

type Article = {
	cover: string;
	id: string;
	title: string;
	description: string;
};

const ArticlesPage = async () => {
	const data = await fetch("https://sviluppo4.arsdue.com/articles");
	const articles: Article[] = await data.json();
	console.log(articles);
	return (
		<Flex direction="column" gap="4">
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
				{articles.map((article) => (
					<ArticleCard key={article.id} article={article} />
				))}
			</Grid>
		</Flex>
	);
};

export default ArticlesPage;
