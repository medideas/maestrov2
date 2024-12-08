import { Flex, Box, Heading, Text, Grid } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import ArticleCard from "../articles/_components/ArticleCard";
import fetchInterceptor from "../utils/fetchInterceptor";

const Home = async () => {
	const competencies = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/competencies"
	);
	const articles = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/articles"
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
			<Flex
				justify={"between"}
				height={"480px"}
				align="center"
				className="border-[1px] rounded-md"
			>
				<Flex
					height={"100%"}
					width={"50px"}
					align="center"
					justify={"center"}
					display={{ initial: "none", md: "flex" }}
				>
					<HiChevronLeft size="24" />
				</Flex>

				<Flex height={"100%"} width={"93%"} gap="4" position={"relative"}>
					<Flex
						position={"absolute"}
						width={"100%"}
						height={"100%"}
						gap="4"
						overflowX={"scroll"}
						overflowY={"hidden"}
					>
						{articles &&
							articles.map((article: Article) => (
								<ArticleCard key={article.id} article={article} />
							))}
					</Flex>
				</Flex>

				<Flex
					height={"100%"}
					width={"50px"}
					align="center"
					justify={"center"}
					display={{ initial: "none", md: "flex" }}
				>
					<HiChevronRight size="24" />
				</Flex>
			</Flex>

			<Flex mt="5" mb="3">
				<Box>
					<Heading>Recommended for you</Heading>
					<Text>Grouped by Competency</Text>
				</Box>
			</Flex>
			<Flex
				justify={"between"}
				height={"480px"}
				align="center"
				className="border-[1px] rounded-md"
			>
				<Flex
					height={"100%"}
					width={"50px"}
					align="center"
					justify={"center"}
					display={{ initial: "none", md: "flex" }}
				>
					<HiChevronLeft size="24" />
				</Flex>

				<Flex height={"100%"} width={"93%"} gap="4" position={"relative"}>
					<Flex
						position={"absolute"}
						width={"100%"}
						height={"100%"}
						gap="4"
						overflowX={"scroll"}
						overflowY={"hidden"}
					>
						{articles &&
							articles.map((article: Article) => (
								<ArticleCard key={article.id} article={article} />
							))}
					</Flex>
				</Flex>

				<Flex
					height={"100%"}
					width={"50px"}
					align="center"
					justify={"center"}
					display={{ initial: "none", md: "flex" }}
				>
					<HiChevronRight size="24" />
				</Flex>
			</Flex>
			<div className="flex flex-col-mt-10"></div>
		</main>
	);
};

export default Home;
