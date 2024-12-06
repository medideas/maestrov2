"use client";
import { Flex, Tooltip } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import React, { useState } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa6";

const PinArticleButton = ({ articleId }: { articleId: string }) => {
	const handleClickTrue = async (articleId: string) => {
		const jwt = getCookie("jwt");
		const data = { pinned: true };
		const req = await fetch(
			`${process.env.NEXT_PUBLIC_APIBASE}/my/articles/${articleId}/toggle/pinned`,
			{
				method: "PATCH",
				body: JSON.stringify(data),
				headers: {
					Authorization: `Bearer ${jwt}`,
					"Content-type": "Application/json",
				},
			}
		);
		setFavourite(true);
	};
	const [favourite, setFavourite] = useState(false);

	return (
		<Flex align={"center"} width={"30px"}>
			<Tooltip content="Add to my Pinned articles">
				{favourite ? (
					<FaBookmark className="pl-1" onClick={() => setFavourite(false)} />
				) : (
					<CiBookmark
						size="22"
						onClick={() => {
							handleClickTrue(articleId);
						}}
					/>
				)}
			</Tooltip>
		</Flex>
	);
};

export default PinArticleButton;
