import {
	Badge,
	Box,
	CheckboxGroup,
	Flex,
	Grid,
	Heading,
	Separator,
} from "@radix-ui/themes";
import React from "react";
import ArticleCard from "../articles/_components/ArticleCard";
import FilterSideBar from "./FilterSideBar";

type Article = {
	id: string;
	title: string;
	description: string;
	cover: string;
	aiGenerated: boolean;
	internalUseOnly: boolean;
};

const MyLibrary = async () => {
	const data = await fetch(process.env.APIBASE + "/articles");
	const articles = await data.json();
	return (
		<Grid columns={{ initial: "1", md: "4" }} m={{ initial: "4", md: "0" }}>
			<div className="column-gap-1 md:m-5">
				<FilterSideBar />
			</div>
			<Box className="mt-5 col-span-3">
				{/* <Heading mb="2" className="first-letter:uppercase">
					{pageTitle.toString().replace(/-/g, " ")}
				</Heading> */}
				<Grid
					columns={{ initial: "1", md: "3" }}
					gap="3"
					justify="start"
					maxWidth="1100px"
				>
					{articles.map((article: Article) => (
						<ArticleCard key={article.id} article={article} />
					))}
				</Grid>
			</Box>
		</Grid>
	);
};

export default MyLibrary;
