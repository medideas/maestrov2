import {
	Badge,
	Box,
	CheckboxGroup,
	Flex,
	Grid,
	Heading,
	Separator,
} from "@radix-ui/themes";
import cards from "../utils/cards";
import React from "react";
import CarouselCard from "../components/CarouselCard";
import FilterSideBar from "./FilterSideBar";

const MyLibrary = ({
	searchParams,
}: {
	searchParams?: { [key: string]: string | string[] | undefined };
}) => {
	const pageTitle = searchParams?.tags || "";
	return (
		<Grid columns={{ initial: "1", md: "4" }} m={{ initial: "4", md: "0" }}>
			<div className="column-gap-1 md:m-5">
				<FilterSideBar />
			</div>
			<Box className="mt-5 col-span-3">
				{/* <motion.div
					id="pageTitle"
					key={"Library"}
					animate={{ opacity: 1, translateX: 0 }}
					initial={{ opacity: 0, translateX: 30 }}
					transition={{ duration: 0.3 }}
				> */}
				<Heading mb="2" className="first-letter:uppercase">
					{pageTitle.toString().replace(/-/g, " ")}
				</Heading>
				{/* </motion.div> */}
				<Grid columns={{ initial: "1", md: "3" }} gap="5" mt="4">
					{cards.map((card) => (
						<CarouselCard
							title={card.title}
							category={card.category}
							duration={card.duration}
							image_url={card.image_url}
							key={card.title}
						/>
					))}
				</Grid>
			</Box>
		</Grid>
	);
};

export default MyLibrary;
