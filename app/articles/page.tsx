import {
	Badge,
	Box,
	Button,
	Card,
	Flex,
	Grid,
	Heading,
	Separator,
	Text,
	Tooltip,
} from "@radix-ui/themes";
import React, { Suspense } from "react";
import Link from "next/link";
import ArticleCard from "./_components/ArticleCard";
import fetchInterceptor from "../utils/fetchInterceptor";
import ArticlesTable from "./_components/ArticlesTable";
import currentUser from "../utils/currentUser";
import isUserAllowed from "../utils/isUserAllowed";
import { InfoCircledIcon } from "@radix-ui/react-icons";

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

	let ingestionJob = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/chatbot/ingestion-jobs/last`
	);

	// const fetchStatus = () => {
	// 	ingestionJob = fetchInterceptor(
	// 		`${process.env.NEXT_PUBLIC_APIBASE}/chatbot/ingestion-jobs/last`
	// 	);
	// };

	// useEffect(() => {
	// 	const myInterval = setInterval(fetchStatus, 5000);

	// 	return () => {
	// 		// should clear the interval when the component unmounts
	// 		clearInterval(myInterval);
	// 	};
	// }, []);
	// console.log(ingestionJob);
	return (
		<Flex direction="column" gap="4" p="5">
			<Flex
				direction={{ initial: "column", md: "row" }}
				justify="between"
				align={"center"}
				gap={{ initial: "3", md: "0" }}
				mb="4"
			>
				<Flex align={"center"} gap="5">
					<Flex direction="column">
						<Heading>Articles</Heading>
						<Text>In this section you can find all the articles</Text>
					</Flex>
					<Separator orientation="vertical" size="3" />
					<Flex>
						<Link href="/articles/new">
							<Button>Add a new article</Button>
						</Link>
					</Flex>
				</Flex>
				<Card>
					<Flex direction={"column"} gap="2" px="3" py="2">
						<Flex align="center" gap="2">
							<Tooltip
								content="Status of the syncronization of Maestro's knowledgebase with the
							Vector DB"
							>
								<InfoCircledIcon />
							</Tooltip>
							<Heading size="3" align={"right"}>
								Knowledgebase syncronization
							</Heading>
						</Flex>
						<Flex justify={"center"}>
							{ingestionJob.status === "COMPLETE" ? (
								<Badge size="3" color="green" className="text-center">
									Complete
								</Badge>
							) : (
								<Button
									variant="outline"
									color="gray"
									disabled={ingestionJob.locked}
								>
									{!ingestionJob.locked && "Sync ongoing"}
								</Button>
							)}
						</Flex>
					</Flex>
				</Card>
			</Flex>
			<Suspense>
				<ArticlesTable articles={articles} />
			</Suspense>
		</Flex>
	);
};

export default ArticlesPage;
