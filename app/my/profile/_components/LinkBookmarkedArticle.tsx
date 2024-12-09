"use client";
import { Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const LinkBookmarkedArticle = ({ article }: { article: Article }) => {
	return (
		<Link
			href={`/articles/${article.id}`}
			className="w-[100%] border-[1px] hover:bg-slate-100 duration-200 mb-2 rounded-full"
		>
			<Flex p="2">
				<Heading size="2" className="pl-2">
					{article.title}
				</Heading>
			</Flex>
		</Link>
	);
};

export default LinkBookmarkedArticle;
