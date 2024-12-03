"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Flex } from "@radix-ui/themes";
import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = ({ placeholder }: { placeholder: string }) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	function handleSearch(term: string) {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set("query", term);
		} else {
			params.delete("query");
		}
		replace(`${pathname}?${params.toString()}`);
	}
	return (
		<Flex gap="3" align={"center"}>
			<label htmlFor="search">Search</label>
			<input
				type="text"
				placeholder={placeholder}
				defaultValue={searchParams.get("query")?.toString()}
				onChange={(e) => handleSearch(e.target.value)}
			/>
			<MagnifyingGlassIcon />
		</Flex>
	);
};

export default Search;
