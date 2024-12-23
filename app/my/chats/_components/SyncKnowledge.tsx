"use client";
import { Badge, Button, Flex } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SyncKnowledge = ({ ingestionJob }: { ingestionJob: IngestionJob }) => {
	const [submitting, setSubmitting] = useState(false);
	useEffect(() => {
		console.log("ingestionJob", ingestionJob);
		if (!ingestionJob || Object.keys(ingestionJob).length === 0) {
			toast.error("Failed to fetch ingestion job status");
		}
	}, [ingestionJob]);

	const handleClick = async () => {
		try {
			await fetchApi('/chatbot/knowledge-base/sync');
			toast.success("Knowledge base sync started");
		} catch (error) {
			toast.error("Failed to sync knowledge base");
		}
		setSubmitting(false);
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
