"use client";
import { Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const GoBack = () => {
	const router = useRouter();
	const handleClick = () => {
		router.back();
	};
	return (
		<Button variant="outline" color="grass" onClick={() => handleClick()}>
			Go back
		</Button>
	);
};

export default GoBack;
