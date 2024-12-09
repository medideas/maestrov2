"use client";
import { Badge, Button, Flex } from "@radix-ui/themes";
import { getCookie } from "cookies-next";
import React, { useEffect, useState } from "react";

const SyncKnowledge = ({ ingestionJob }: { ingestionJob: IngestionJob }) => {
	const jwt = getCookie("jwt");
	const [submitting, setSubmitting] = useState(false);
	const handleClick = async () => {
		try {
			const req = await fetch(
				`${process.env.NEXT_PUBLIC_APIBASE}/chatbot/knowledge-base/sync`,
				{
					method: "GET",
					headers: {
						Accept: "application/json",
						Authorization: "Bearer " + jwt,
					},
				}
			);
			console.log(req);
			setSubmitting(false);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Flex justify={"center"}>
			{ingestionJob.locked || submitting ? (
				<Badge size="3" color="orange" className="text-center">
					Sync ongoing
				</Badge>
			) : (
				<Button
					variant="outline"
					color="gray"
					disabled={submitting || ingestionJob.locked}
					onClick={() => handleClick()}
				>
					Start syncing
				</Button>
			)}
		</Flex>
	);
};

export default SyncKnowledge;
