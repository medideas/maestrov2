"use client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
	Button,
	CheckboxGroup,
	Flex,
	Heading,
	Separator,
	TextField,
} from "@radix-ui/themes";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const FilterSideBar = ({ competencies }: { competencies: Competency[] }) => {
	const menuItems = ["recommended for you", "in progress", "saved"];
	// const competencies = [
	// 	"Clinical & Product Knowledge",
	// 	"Market & Business Expertise",
	// 	"Selling Skills",
	// 	"Operational Excellence",
	// ];
	const searchParams = useSearchParams();
	const selectedTag = searchParams?.tag as string;
	const selectedCompetency = searchParams?.get("competency");
	console.log(selectedCompetency);

	const [activeTag, setActiveTag] = useState(searchParams?.tag);

	return (
		<div className="border-[1px] rounded-md shadow-md bg-gray-100 py-5">
			<Flex direction={"column"} p="4" gap="2">
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
			</Flex>
			<Heading as="h2" size="4" className="pb-2 px-5">
				Filters
			</Heading>
			<ul>
				{menuItems.map((item, index) => (
					<Link
						href={`?tag=${item
							.replace(/\s+/g, "-")
							.toLowerCase()}&competencies=${selectedCompetency}`}
						key={index}
						onClick={() => setActiveTag(item)}
					>
						<li
							className={
								"first-letter:capitalize py-2 px-5 hover:bg-gray-300 " +
								(activeTag === item && " border-l-8 ")
							}
						>
							{selectedTag}
							{item}
						</li>
					</Link>
				))}
			</ul>
			<div className="flex border-b-2 mx-4 my-4"></div>
			<div className="p-5">
				<Flex direction="column">
					<CheckboxGroup.Root defaultValue={["1"]} name="example">
						{competencies.map((option, index) => (
							<CheckboxGroup.Item
								key={index}
								value={option.name}
								className="pb-2"
								onChange={() => {
									console.log("ciao");
								}}
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
