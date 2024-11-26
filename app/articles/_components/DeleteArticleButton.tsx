"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
	articleId: string;
}

const DeleteArticleButton = ({ articleId }: Props) => {
	const router = useRouter();
	const deleteArticle = () => {
		fetch(`https://sviluppo4.arsdue.com/articles/${articleId}`),
			{
				method: "DELETE",
			};
		router.push("/articles");
	};
	return (
		<Link href="#" onClick={() => deleteArticle()}>
			<Button>Delete article</Button>
		</Link>
	);
};

export default DeleteArticleButton;
