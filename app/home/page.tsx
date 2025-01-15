import { Flex, Box, Heading, Text, Grid, Tooltip } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import ArticleCard from "../articles/_components/ArticleCard";
import { fetchApi } from "../utils/fetchInterceptor";
import { Carousel } from "../components/carousel/Carousel";
import carouselStyles from "../components/carousel/carousel.module.css";
import CompetencyCard from "./CompetencyCard";

const Home = async () => {
	const [competencies, suggestedArticles, myArticles] = await Promise.all([
		fetchApi("/competencies"),
		fetchApi("/my/articles/suggested"),
		fetchApi("/my/articles"),
	]);

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
				{competencies.map((competency: Competency, index: number) =>
					index === 0 ? (
						<Link href={`/mylibrary`} key={competency.id}>
							<CompetencyCard
								competency={competency}
								colors={colors}
								index={index}
							/>
						</Link>
					) : (
						<Tooltip
							key={competency.id.toString()}
							content={"Now available yet: coming soon"}
						>
							<CompetencyCard
								competency={competency}
								colors={colors}
								index={index}
							/>
						</Tooltip>
					)
				)}
			</Grid>

			<Flex mt="5" mb="3">
				<Box>
					<Heading>Recommended for you</Heading>
					<Text>Based on your assessment and interests</Text>
				</Box>
			</Flex>
			<Carousel>
				{suggestedArticles &&
					suggestedArticles.map((suggestedArticle: Article) => (
						<ArticleCard
							key={suggestedArticle.id.toString()}
							article={suggestedArticle}
							className={carouselStyles.item}
						/>
					))}
			</Carousel>

			<Flex mt="5" mb="3">
				<Box>
					<Heading>Trending content</Heading>
					<Text>Trending now among maestro&apos;s users</Text>
				</Box>
			</Flex>
			<Carousel>
				{myArticles &&
					myArticles.map((article: Article) => (
						<ArticleCard key={article.id.toString()} article={article} />
					))}
			</Carousel>
			<div className="flex flex-col-mt-10"></div>
		</main>
	);
};

export default Home;
