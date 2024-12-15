import { Flex, Box, Heading, Text, Grid } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import ArticleCard from "../articles/_components/ArticleCard";
import fetchInterceptor from "../utils/fetchInterceptor";
import { Carousel } from "../components/carousel/Carousel";
import carouselStyles from "../components/carousel/carousel.module.css";

const Home = async () => {
	const competencies = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/competencies"
	);
	const articles = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/articles"
	);
	const myArticles = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/my/articles/pinned"
	);
	const colors = ["bg-primary", "bg-secondary", "bg-tertiary", "bg-quartery"];

	return (
		<main className="flex flex-col p-5">
			<Flex mb="3">
				<Box>
					<Heading>Main Library</Heading>
					<Text>Grouped by Competency</Text>
				</Box>
			</Flex>
			<Grid columns={{ initial: "2", sm: "4" }} gap="3" width="auto">
				{competencies.map((competency: Competency, index: number) => (
					<Link href={`/mylibrary`} key={competency.id}>
						<Flex
							width="100"
							minHeight={"150px"}
							align={"center"}
							className={`border-none w-100 p-6 ${colors[index]} rounded-md hover:scale-105 hover:shadow-md transition-all duration-300 ease-in-out md:py-10`}
						>
							<Text weight="light" className="px-1 py-1 text-lg font-bold">
								{competency.name}
							</Text>
						</Flex>
					</Link>
				))}
			</Grid>

			<Flex mt="5" mb="3">
				<Box>
					<Heading>Recommended for you</Heading>
					<Text>Grouped by Competency</Text>
				</Box>
			</Flex>

			<Carousel>
				{articles &&
					articles.map((article: Article) => (
						<ArticleCard key={article.id} article={article} className={carouselStyles.item} />
					))}
			</Carousel>

			<Flex mt="5" mb="3">
				<Box>
					<Heading>My Articles</Heading>
					<Text>The articles you saved for later</Text>
				</Box>
			</Flex>
			<Carousel>
				{myArticles &&
					myArticles.map((article: Article) => (
						<ArticleCard key={article.id} article={article} />
					))}
			</Carousel>
			<div className="flex flex-col-mt-10"></div>
		</main>
	);
};

export default Home;
