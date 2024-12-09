import { Box, Flex, Grid } from "@radix-ui/themes";
import React from "react";
import ArticleCard from "../articles/_components/ArticleCard";
import FilterSideBar from "./FilterSideBar";
import fetchInterceptor from "../utils/fetchInterceptor";

type Article = {
	id: string;
	title: string;
	description: string;
	cover: string;
	aiGenerated: boolean;
	internalUseOnly: boolean;
};

const MyLibrary = async () => {
	const articles = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/articles"
	);
	const competencies = await fetchInterceptor(
		process.env.NEXT_PUBLIC_APIBASE + "/competencies"
	);
	return (
		<Grid
			columns={{ initial: "1", md: "4" }}
			m={{ initial: "4", md: "0" }}
			mb="9"
		>
			<div className="column-gap-1 md:m-5">
				<FilterSideBar competencies={competencies} />
			</div>
			<Box className="mt-5 col-span-3">
				<Grid
					columns={{ initial: "1", md: "2", lg: "3" }}
					gap="3"
					justify="start"
					maxWidth="1100px"
				>
					{articles.map((article: Article) => (
						<Box minwidth={"300px"}>
							<ArticleCard key={article.id} article={article} />
						</Box>
					))}
				</Grid>
			</Box>
		</Grid>
	);
};

export default MyLibrary;
