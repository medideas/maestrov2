import fetchInterceptor from "@/app/utils/fetchInterceptor";
import { Flex, Tabs, Text, Box, Heading } from "@radix-ui/themes";
import React from "react";

type Article = {
	id: String;
	title: String;
};

const ArticleRelevanceForJobTitleSkills = async ({
	article,
}: {
	article: Article;
}) => {
	const jobTitleSkills = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/job-title-skills`
	);
	const jobTitleSkills = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/job-title-skills`
	);
	return (
		<Flex direction={"column"} gap="4">
			<Heading size="3" weight={"bold"}>
				Relevance for {article.title}
			</Heading>
			<Tabs.Root defaultValue="account">
				<Tabs.List>
					{jobTitleSkills.map((jobTitle) => (
						<Tabs.Trigger value="documents">
							{jobTitle.jobTitle.name}
						</Tabs.Trigger>
					))}
				</Tabs.List>
				<Box pt="3">
					<Tabs.Content value="account">
						<Text size="2">Make changes to your account.</Text>
					</Tabs.Content>

					<Tabs.Content value="documents">
						<Text size="2">Access and update your documents.</Text>
					</Tabs.Content>

					<Tabs.Content value="settings">
						<Text size="2">
							Edit your profile or update contact information.
						</Text>
					</Tabs.Content>
				</Box>
			</Tabs.Root>
		</Flex>
	);
};

export default ArticleRelevanceForJobTitleSkills;
