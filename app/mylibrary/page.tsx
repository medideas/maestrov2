import { Box, Flex, Grid } from "@radix-ui/themes";
import React, { Suspense } from "react";
import ArticleCard from "../articles/_components/ArticleCard";
import FilterSideBar from "./FilterSideBar";
import fetchInterceptor from "../utils/fetchInterceptor";

const MyLibrary = async () => {
	await new Promise((resolve) => setTimeout(resolve, 2000));
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
				<Suspense>
					<FilterSideBar competencies={competencies} />
				</Suspense>
			</div>
			<Box className="mt-5 col-span-3">
				<Suspense>
					<Grid
						columns={{ initial: "1", md: "2", lg: "3" }}
						gap="3"
						justify="start"
						maxWidth="1100px"
					>
						{articles.map((article: Article) => (
							<Box minWidth={"300px"}>
								<ArticleCard key={article.id} article={article} />
							</Box>
						))}
					</Grid>
				</Suspense>
			</Box>
		</Grid>
	);
};

export default MyLibrary;
