"use client";
import { CheckboxGroup, Flex, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const FilterSideBar = ({ competencies }: { competencies: Competency[] }) => {
	const menuItems = ["recommended for you", "in progress", "saved"];
	const router = useRouter();
	// const competencies = [
	// 	"Clinical & Product Knowledge",
	// 	"Market & Business Expertise",
	// 	"Selling Skills",
	// 	"Operational Excellence",
	// ];
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const selectedTag = searchParams?.get("tag") as string;
	const selectedCompetency = searchParams?.get("competency");
	console.log(selectedCompetency);

	const [activeTag, setActiveTag] = useState(searchParams?.get("tag"));
	const [loading, setLoading] = useState(false);

	const handleTagChange = (tag: string) => {
		setLoading(true);
		router.push(`${pathname}?tag=${tag.replace(/\s+/g, "-").toLowerCase()}`);
		setActiveTag(tag);
		setLoading(false);
	};

	return (
		<div className="border-[1px] rounded-md shadow-md bg-gray-100 py-5">
			{loading && <div className="loading-indicator">Loading...</div>}
			{/* <Flex direction={"column"} p="4" gap="2">
				<Heading size="4">Search</Heading>
				<Flex justify={"between"}>
					<TextField.Root placeholder="Search the docs…" className="w-[100%]">
						<TextField.Slot>
							<MagnifyingGlassIcon height="16" width="16" />
						</TextField.Slot>
					</TextField.Root>
					<Button variant="outline" color="gray" ml="1">
						Search
					</Button>
				</Flex>
				<Separator my="3" size="4" />
			</Flex> */}
			<Heading as="h2" size="4" className="pb-2 px-5">
				Filters
			</Heading>
			<ul>
				<Link
					href="/mylibrary"
					key="all"
					onClick={() => {
						handleTagChange("all");
					}}
				>
					<li className={"first-letter:capitalize py-2 px-5 hover:bg-gray-300"}>
						Reset filters
					</li>
				</Link>
				{menuItems.map((item, index) => (
					<Link
						href={`?tag=${item.replace(/\s+/g, "-").toLowerCase()}`}
						key={index}
						onClick={() => {
							handleTagChange(item);
						}}
					>
						<li
							className={
								"first-letter:capitalize py-2 px-5 hover:bg-gray-300 " +
								(activeTag === item && " border-l-8 ")
							}
						>
							{item}
						</li>
					</Link>
				))}
			</ul>
			<div className="flex border-b-2 mx-4 my-4"></div>
			<div className="p-5">
				<Flex direction="column">
					<CheckboxGroup.Root defaultValue={["0"]}>
						{competencies.map((option, index) => (
							<CheckboxGroup.Item
								key={index}
								value={option.name}
								className="pb-2"
								disabled={index}
								onChange={() => {}}
							>
								{option.name}
							</CheckboxGroup.Item>
						))}
					</CheckboxGroup.Root>
				</Flex>
			</div>
		</div>
	);
};

export default FilterSideBar;
