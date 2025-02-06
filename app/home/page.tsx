import { Flex, Box, Heading, Text, Grid, Tooltip } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import ArticleCard from "../articles/_components/ArticleCard";
import { fetchApi } from "../utils/fetchInterceptor";
import { Carousel } from "../components/carousel/Carousel";
import carouselStyles from "../components/carousel/carousel.module.css";
import CompetencyCard from "./CompetencyCard";

const Home = async () => {
	try {
		const [competencies, suggestedArticles, myArticles] = await Promise.all([
			fetchApi("/competencies"),
			fetchApi("/my/articles/suggested"),
			fetchApi("/my/articles"),
		]);

		// Add logging to debug the response data
		console.log("Home page data:", {
			competenciesIsArray: Array.isArray(competencies),
			competenciesLength: competencies?.length,
			suggestedArticlesIsArray: Array.isArray(suggestedArticles),
			suggestedArticlesLength: suggestedArticles?.length,
			myArticlesIsArray: Array.isArray(myArticles),
			myArticlesLength: myArticles?.length,
		});

		// Ensure we have arrays, even if empty
		const safeCompetencies = Array.isArray(competencies) ? competencies : [];
		const safeSuggestedArticles = Array.isArray(suggestedArticles)
			? suggestedArticles
			: [];
		const safeMyArticles = Array.isArray(myArticles) ? myArticles : [];

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
					{safeCompetencies.map((competency: Competency, index: number) =>
						index === 0 ? (
							<Link href={`/mylibrary`} key={competency?.id || index}>
								<CompetencyCard
									competency={competency}
									colors={colors}
									index={index}
								/>
							</Link>
						) : (
							<Tooltip
								key={competency?.id?.toString() || index}
								content={"Not available yet: coming soon"}
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
					{safeSuggestedArticles.length > 0 ? (
						safeSuggestedArticles.map((suggestedArticle: Article) => (
							<ArticleCard
								key={suggestedArticle?.id?.toString() || "suggested-article"}
								article={suggestedArticle}
								className={carouselStyles.item}
							/>
						))
					) : (
						<Text color="gray">No suggested articles available</Text>
					)}
				</Carousel>

				<Flex mt="5" mb="3">
					<Box>
						<Heading>Trending content</Heading>
						<Text>Trending now among Maestro&apos;s users</Text>
					</Box>
				</Flex>
				<Carousel>
					{safeMyArticles.length > 0 ? (
						safeMyArticles.map((article: Article) => (
							<ArticleCard
								key={article?.id?.toString() || "my-article"}
								article={article}
							/>
						))
					) : (
						<Text color="gray">No trending content available</Text>
					)}
				</Carousel>
				<div className="flex flex-col-mt-10"></div>
			</main>
		);
	} catch (error) {
		console.error("Error in Home page:", error);
		return (
			<main className="flex flex-col p-5">
				<Flex direction="column" gap="3">
					<Heading color="red">Error Loading Content</Heading>
					<Text>
						There was an error loading the page content. Please try refreshing
						the page.
					</Text>
					{error instanceof Error && (
						<Text size="2" color="gray">
							{error.message}
						</Text>
					)}
				</Flex>
			</main>
		);
	}
};

export default Home;
