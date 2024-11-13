import { Link2Icon } from "@radix-ui/react-icons";
import {
	Box,
	Card,
	Text,
	Heading,
	Inset,
	Flex,
	Separator,
	Tooltip,
} from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { FaRegFilePdf } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import { BiSlideshow } from "react-icons/bi";

interface Props {
	id: number;
	title: string;
	excerpt: string;
	category: string;
	duration: string;
	cover: string;
	className?: string;
	tags: string[];
	type: string;
}

const CarouselCard = ({
	id,
	title,
	excerpt,
	category,
	duration,
	cover,
	className,
	type,
	tags,
}: Props) => {
	return (
		<Link href={`/articles/${id}`}>
			<Flex
				direction="column"
				className={`relative shadow-lg max-w-[360px] ${className}`}
			>
				<div className="h-[200px] relative">
					<div
						className="absolute"
						style={{
							backgroundColor: "rgba(0,0,0,0.4)",
							zIndex: "1",
							height: "inherit",
							width: "100%",
						}}
					></div>
					<Flex
						style={{
							backgroundImage: `url(${cover})`,
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							backgroundClip: "content-box",
						}}
						align="center"
						className="bg-center bg-cover h-[100%] w-max-[100%]"
					>
						<Heading
							ml="3"
							align="center"
							className="z-10 text-white [text-shadow:_3px_3px_12px_rgb(0_0_0_/_70%)]"
						>
							{title}
						</Heading>
					</Flex>
				</div>

				<Flex
					direction="column"
					className="bg-white border-[1px] z-[-10]"
					p="4"
				>
					<Flex>
						<Text size="2">{excerpt}</Text>
					</Flex>
					<Separator my="3" size="4" />
					<Flex justify="between" align="center">
						{type === "PDF" && (
							<Tooltip content="The attached file is in PDF format">
								<FaRegFilePdf size="20" />
							</Tooltip>
						)}
						{type === "VIDEO" && (
							<Tooltip content="The attached file is a video">
								<FaVideo size="20" />
							</Tooltip>
						)}
						{type === "PPT" && (
							<Tooltip content="The attached file is a presentation">
								<BiSlideshow size="24" />
							</Tooltip>
						)}
						<p>{duration} mins</p>
						<Flex justify="between" align="center">
							{tags}
							<button className="rounded-full border-[1px] p-2">
								<Link2Icon></Link2Icon>
							</button>
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Link>
	);
};

export default CarouselCard;
