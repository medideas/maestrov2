import { Flex, Box, Heading, Text, Card, Grid, Inset } from "@radix-ui/themes";
import Link from "next/link";
import CarouselCard from "./components/CarouselCard";
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

interface Article {
	id: string;
	name: string;
	description: string;
}

interface Competency {
	id: string;
	name: string;
	description: string;
	color: string;
}

export default async function Home() {
	let dataArticles = await fetch("https://sviluppo4.arsdue.com/articles", {
		cache: "no-store",
	});
	let articles = await dataArticles.json();

	let dataCompetencies = await fetch(
		"https://sviluppo4.arsdue.com/competencies",
		{
			cache: "no-store",
		}
	);
	let competencies = await dataCompetencies.json();

	return (
		<>
			<main className="flex flex-col p-5">
				<Flex mb="3">
					<Box>
						<Heading>Main Library</Heading>
						<Text>Grouped by Competency</Text>
					</Box>
				</Flex>
				<Grid columns={{ initial: "2", sm: "4" }} gap="3" width="auto">
					{competencies.map((competency: Competency) => (
						<Link href={`/mylibrary`} key={competency.id}>
							<Box
								width="100"
								className={`border-none w-100 p-6 red rounded-md hover:scale-105 hover:shadow-md transition-all duration-300 ease-in-out md:py-10`}
							>
								<Text weight="light" className="px-1 py-1 text-lg font-bold">
									{competency.name}
								</Text>
							</Box>
						</Link>
					))}
				</Grid>

				<Flex mt="5" mb="3">
					<Box>
						<Heading>Recommended for you</Heading>
						<Text>Grouped by Competency</Text>
					</Box>
				</Flex>
				<Flex className="overflow-y-hidden overflow-x-scroll" p="3" px="5">
					<div className="absolute bg-white py-[11%] w-[50px] z-10 ml-[-50px] mt-[-10px]">
						<HiChevronLeft size="3x" />
					</div>
					<Flex gap="4" width="100%" justify="start">
						{/* {articles &&
							articles.map(
								(article: {
									id: number;
									title: string | null | undefined;
									excerpt: string;
									category: string;
									duration: string;
									cover: string;
									type: string;
									tags: string[];
								}) => (
									<CarouselCard
										id={article.id}
										title={article.title!}
										excerpt={article.excerpt}
										category={article.category}
										duration={article.duration}
										cover={article.cover}
										key={article.id}
										className="min-w-[350px]"
										type={article.type}
										tags={article.tags}
									/>
								)
							)} */}
					</Flex>
					<div className="absolute bg-white py-[11%] w-[40px] z-10 right-0 mr-[30px] mt-[-10px]">
						<HiChevronRight size="3x" />
					</div>
				</Flex>
				<Flex mt="5" mb="3">
					<Box>
						<Heading>Top Related Learning Activities</Heading>
						<Text>What's trending</Text>
					</Box>
				</Flex>
				<Flex className="overflow-y-hidden overflow-x-scroll" p="3">
					<div className="absolute bg-white py-[11%] w-[50px] z-10 ml-[-50px] mt-[-10px]">
						<HiChevronLeft size="3x" />
					</div>
					<Flex gap="4" width="100%" justify="start">
						{/* {articles &&
							articles.map(
								(article: {
									id: number;
									title: string | null | undefined;
									excerpt: string;
									category: string;
									duration: string;
									cover: string;
									type: string;
									tags: string[];
								}) => (
									<CarouselCard
										id={article.id}
										title={article.title!}
										excerpt={article.excerpt}
										category={article.category}
										duration={article.duration}
										cover={article.cover}
										key={article.id}
										className="min-w-[350px]"
										type={article.type}
										tags={article.tags}
									/>
								)
							)} */}
					</Flex>
					<div className="absolute bg-white py-[11%] w-[40px] z-10 right-0 mr-[30px] mt-[-10px]">
						<HiChevronRight size="3x" />
					</div>
				</Flex>
				<div className="flex flex-col-mt-10"></div>
			</main>
		</>
	);
}
