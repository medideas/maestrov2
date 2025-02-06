import DownloadFile from "@/app/articles/_components/DownloadFile";
import PinArticleButton from "@/app/articles/_components/PinArticleButton";
import GoBack from "@/app/components/GoBack";
import { fetchApi } from "@/app/utils/fetchInterceptor";
import {
	AspectRatio,
	Badge,
	Box,
	Card,
	Container,
	Flex,
	Grid,
	Heading,
	Separator,
	Text,
} from "@radix-ui/themes";
import React, { Suspense } from "react";

export const dynamic = "force-dynamic";

const MyArticlePage = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}) => {
	const id = (await params).id;
	try {
		const article = await fetchApi(`/my/articles/${id}`);

		// Add detailed logging for debugging
		console.log("Article data:", {
			id: article?.id,
			hasBusinessUnits: !!article?.articleBusinessUnits,
			businessUnitsLength: article?.articleBusinessUnits?.length,
			hasRegions: !!article?.articleRegions,
			regionsLength: article?.articleRegions?.length,
			hasCover: !!article?.cover,
			hasMedia: !!article?.media,
			hasSource: !!article?.source,
			hasEducationalFramework: !!article?.educationalFramework,
			hasEducationalMethodology: !!article?.educationalMethodology,
			hasEducationalTool: !!article?.educationalTool,
		});

		// Validate required article data
		if (!article || typeof article !== "object") {
			throw new Error("Invalid article data received from API");
		}

		return (
			<Container my={{ initial: "0", md: "5" }} p={{ initial: "4", md: "0" }}>
				<Flex justify="end" mb="3">
					<GoBack />
				</Flex>
				<Grid columns={{ initial: "1", md: "3" }} mt="6" gap="5">
					<Box className="col-span-2" mr="3">
						<Suspense>
							<AspectRatio ratio={9 / 3}>
								{article.cover ? (
									<img
										src={`data:image/jpeg;base64, ${article.cover}`}
										style={{
											objectFit: "cover",
											width: "100%",
											height: "100%",
											borderRadius: "5px",
										}}
										alt={article.title || "Article cover"}
									/>
								) : (
									<div
										style={{
											background: "#f0f0f0",
											borderRadius: "5px",
											width: "100%",
											height: "100%",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
										}}
									>
										<Text color="gray">No cover image available</Text>
									</div>
								)}
							</AspectRatio>
						</Suspense>
						<Flex my="5" direction="column" gap="5">
							<Flex
								justify="between"
								direction={{ initial: "column", md: "row" }}
								gap={{ initial: "3", md: "0" }}
							>
								<Flex>
									{article.id && <PinArticleButton articleId={article.id} />}
									<Heading>{article.title || "Untitled Article"}</Heading>
								</Flex>
							</Flex>
							<Text as="p">
								{article.description || "No description available"}
							</Text>
						</Flex>
						<Flex gap="3" direction="column">
							{article.internalUseOnly === true && (
								<Flex direction="column">
									<Separator my="3" size="4" />
									<Flex>
										<Badge color="orange" mr="2">
											Warning
										</Badge>
										<Text>This article is for internal use only</Text>
									</Flex>
								</Flex>
							)}
						</Flex>
					</Box>
					<Box>
						<Card className="shadow-lg mb-5">
							<Box p="3">
								<Flex justify={"between"}>
									<Heading size="2">Business Units</Heading>
									<Flex gap="3">
										{!article.articleBusinessUnits?.length && (
											<Badge color="gray">Valid for all BU</Badge>
										)}
										{article.articleBusinessUnits?.map((bu) => (
											<Badge key={bu?.id || "unknown"} color="gray">
												{bu?.businessUnit?.name || "Unknown BU"}
											</Badge>
										))}
									</Flex>
								</Flex>
								<Separator my="3" size="4" />

								<Flex justify={"between"}>
									<Heading size="2">Regions</Heading>
									<Flex gap="3">
										{!article.articleRegions?.length && (
											<Badge color="grass">Valid for all Regions</Badge>
										)}
										{article.articleRegions?.map((r) => (
											<Badge key={r?.id || "unknown"} color="grass">
												{r?.region?.name || "Unknown Region"}
											</Badge>
										))}
									</Flex>
								</Flex>

								<Separator my="3" size="4" />

								<Flex justify={"between"} direction={"row"}>
									<Heading mb="3" size="2">
										Courses
									</Heading>
									<Flex gap="3">
										{!article.articleCourses?.length && (
											<Badge color="gray">Not included in any course</Badge>
										)}
										{article.articleCourses?.map((c) => (
											<Badge key={c?.id || "unknown"} color="gold">
												{c?.course?.name || "Unknown Course"}
											</Badge>
										))}
									</Flex>
								</Flex>
							</Box>
						</Card>
						<Card className="shadow-lg">
							<Box p="3">
								<Flex justify={"between"}>
									<Heading size="2">Duration</Heading>
									<Text>{article.duration || "N/A"} pages</Text>
								</Flex>

								<Separator my="3" size="4" />
								<Flex justify="between">
									<Heading size="2">Media</Heading>
									<Text>{article.media?.name || "N/A"}</Text>
								</Flex>
								<Separator my="3" size="4" />
								<Flex justify="between">
									<Heading size="2">Source</Heading>
									<Text>{article.source?.name || "N/A"}</Text>
								</Flex>
								<Separator my="3" size="4" />
								<Flex justify="between">
									<Heading size="2">Educational Framework</Heading>
									<Text>{article.educationalFramework?.name || "N/A"}</Text>
								</Flex>
								<Separator my="3" size="4" />
								<Flex justify="between">
									<Heading size="2">Educational Methodology</Heading>
									<Text>{article.educationalMethodology?.name || "N/A"}</Text>
								</Flex>
								<Separator my="3" size="4" />
								<Flex justify="between">
									<Heading size="2">Educational Tool</Heading>
									<Text>{article.educationalTool?.name || "N/A"}</Text>
								</Flex>

								<Flex minWidth={"100%"} mt="5">
									{article.id && <DownloadFile articleId={article.id} />}
								</Flex>
							</Box>
						</Card>
					</Box>
				</Grid>
				<Separator my="4" size="4" />
			</Container>
		);
	} catch (error) {
		console.error("Error in MyArticlePage:", error);
		return (
			<Container p="4">
				<Flex direction="column" gap="3">
					<Heading color="red">Error Loading Article</Heading>
					<Text>
						There was an error loading the article. Please try refreshing the
						page.
					</Text>
					{error instanceof Error && (
						<Text size="2" color="gray">
							{error.message}
						</Text>
					)}
					<GoBack />
				</Flex>
			</Container>
		);
	}
};

export default MyArticlePage;
