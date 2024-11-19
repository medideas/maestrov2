"use client";
import { Box, Card, Inset, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
	article: Article;
}

type Article = {
	id: string;
	title: string;
	description: string;
	cover: string;
};

const ArticleCard = ({ article }: Props) => {
	console.log(article);
	return (
		<Link href={`articles/${article.id}`}>
			<Box>
				<Card className="shadow-lg">
					<Inset clip="padding-box" side="top" pb="current">
						<img
							src={`data:image/jpeg;base64, ${article.cover}`}
							style={{
								display: "block",
								objectFit: "cover",
								width: "100%",
								height: 250,
							}}
						/>
					</Inset>
					<Heading mb="2">{article.title}</Heading>
					<Text className="mb-4">{article.description}</Text>
				</Card>
			</Box>
		</Link>
	);
};

export default ArticleCard;
