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
import { fetchApi } from "../utils/fetchInterceptor";
import ArticlesTable from "./_components/ArticlesTable";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import SyncKnowledge from "../my/chats/_components/SyncKnowledge";

const ArticlesPage = async () => {
	const articles = await fetchApi("/articles");

	let ingestionJob = await fetchApi(`/chatbot/ingestion-jobs/last`);

	const fetchStatus = () => {
		ingestionJob = fetchApi(`/chatbot/ingestion-jobs/last`);
	};
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

						<SyncKnowledge ingestionJob={ingestionJob} />
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
