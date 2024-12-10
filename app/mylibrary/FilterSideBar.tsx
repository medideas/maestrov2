"use client";
import { CheckboxGroup, Flex, Heading, Separator } from "@radix-ui/themes";
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
			<Heading as="h2" size="4" className="py-2 px-5">
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
						<Separator my="3" size="4" />
					</CheckboxGroup.Root>
				</Flex>
			</div>
		</div>
	);
};

export default FilterSideBar;
