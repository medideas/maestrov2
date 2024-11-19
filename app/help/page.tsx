import {
	Avatar,
	Box,
	Card,
	Container,
	Flex,
	Grid,
	Heading,
	Text,
} from "@radix-ui/themes";
import React from "react";
import { BsStars } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";
import { PiUsersThin } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";
import { PiFolderPlusThin } from "react-icons/pi";
import { MdWifiTethering } from "react-icons/md";
import { GoRocket } from "react-icons/go";

const HelpPage = () => {
	return (
		<div>
			<Flex direction="column" className="max-w-[1100px] mx-auto" gap="5">
				<Flex direction="column">
					<Heading>About Maestro</Heading>
					<Heading size="4" weight="light" color="gray">
						Why would everyone in Edwards benefit from Maestro?
					</Heading>
					<Text className="readable">
						Maestro is a software that uses the power of AI to provide an
						interactive and engaging learning environment for Edwards
						Lifesciences employees. This section will guide you through the
						basics of Maestro, helping you navigate and utilize its features
						effectively.
					</Text>
				</Flex>
				<Flex gap="4">
					<Box width="350px">
						<Card size="2" className="bg-red-300">
							<Flex gap="4" align="center" p="2">
								<BsStars size="100" />
								<Box>
									<Heading size="4" weight="light" mb="1">
										Become better at your job
									</Heading>
									<Text size="2" color="gray">
										Self-improve every day and perform at the highest standards
										to serve patients at your best
									</Text>
								</Box>
							</Flex>
						</Card>
					</Box>

					<Box width="350px">
						<Card size="2" className="bg-red-300">
							<Flex gap="4" align="center" p="2">
								<IoBookOutline size="100" />
								<Box>
									<Heading size="4" weight="light" mb="1">
										Transform curiosity into knowledge
									</Heading>
									<Text size="2" color="gray">
										Fulfill your desire for knowing and understanding more.
										Anytime and anywhere!
									</Text>
								</Box>
							</Flex>
						</Card>
					</Box>

					<Box width="350px">
						<Card size="2" className="bg-red-300">
							<Flex gap="4" align="center" p="2">
								<PiUsersThin size="100" />
								<Box>
									<Heading size="4" weight="light" mb="1">
										Democratize learning for everyone
									</Heading>
									<Text size="2" color="gray">
										Make personalized education possible and collaborate with
										others for common good.
									</Text>
								</Box>
							</Flex>
						</Card>
					</Box>
				</Flex>

				<Flex>
					<Text className="readable">
						Maestro is a valuable tool for Edwards Lifesciences employees,
						designed to streamline and enhance their learning experience through
						advanced AI capabilities. By using the power of AI,  Maestro
						personalizes learning content for each user based on their specific
						role, competencies, and skills. This ensures that employees receive
						targeted educational materials relevant to their job functions,
						making their learning more efficient and impactful.
					</Text>
				</Flex>

				<Flex direction="column">
					<Heading>Getting started</Heading>
					<Heading size="4" weight="light" color="gray">
						How you can use Maestro in your day-to-day job
					</Heading>
				</Flex>
				<Flex gap="5">
					<div className="max-w-[200px]">
						<div className="bg-red-200 p-10 rounded-full w-[150px] mb-4">
							<IoBookOutline size="70" />
						</div>

						<Text>Personalized content based on your profile</Text>
					</div>

					<div className="max-w-[200px]">
						<div className="bg-red-200 p-10 rounded-full w-[150px] mb-4">
							<AiOutlineUser size="70" />
						</div>
						<Text className="text-center">
							Content limited to one competency: Clinical & Product Knowledge
						</Text>
					</div>
					<div className="max-w-[200px]">
						<div className="bg-red-200 p-10 rounded-full w-[150px] mb-4">
							<PiFolderPlusThin size="70" />
						</div>
						<Text className="text-center">
							+200 documents uploaded in the library
						</Text>
					</div>
					<div className="max-w-[200px]">
						<div className="bg-red-200 p-10 rounded-full w-[150px] mb-4">
							<MdWifiTethering size="70" />
						</div>
						<Text className="text-center">
							Accessible via website from laptop, tablet and mobile phone
						</Text>
					</div>
					<div className="max-w-[200px]">
						<div className="bg-red-200 p-10 rounded-full w-[150px] mb-4">
							<GoRocket size="70" />
						</div>
						<Text className="text-center">
							CConstantly evolving and improving... many new features to come!
						</Text>
					</div>
				</Flex>
			</Flex>
			<Flex className="bg-red-100 p-5 my-5">
				<Container>
					<Grid columns="3">
						<Box className="col-span-1">
							<img alt="screenshot" />
						</Box>
						<Box className="col-span-2">
							<Heading>ChatMaestro</Heading>
							<Text>
								One of Maestro's standout features is ChatMaestro, an AI-driven
								assistant available directly within the platform, which provides
								instant, contextual answers to user queries, doubts and
								requests. This feature promotes an interactive learning
								environment, allowing employees to engage with content actively
								and receive immediate support, which is particularly beneficial
								for complex or technical subjects.
							</Text>
						</Box>
					</Grid>
				</Container>
			</Flex>
			<Flex className="bg-red-100 p-5 my-5">
				<Container>
					<Grid columns="3">
						<Box className="col-span-2 text-right">
							<Heading>Home Page</Heading>
							<Text>
								By using the power of AI,  Maestro personalizes learning content
								for each user based on your specific role, competencies, and
								skills. This ensures that you receive targeted educational
								materials relevant to your job functions, making your learning
								more efficient and impactful.
							</Text>
						</Box>
						<Box className="col-span-1">
							<img alt="screenshot" />
						</Box>
					</Grid>
				</Container>
			</Flex>
			<Flex className="bg-red-100 p-5 my-5">
				<Container>
					<Grid columns="3">
						<Box className="col-span-1">
							<img alt="screenshot" />
						</Box>
						<Box className="col-span-2">
							<Heading>Profile</Heading>
							<Text>
								In your profile you’ll be able to test assess your level of
								proficiency in the 4 key competencies: Clinical & Product
								Knowledge, Market & Business Expertise, Operational Excellence
								and Selling Skills. Maestro will guide you through a
								personalized learning path and track your progress during time.
							</Text>
						</Box>
					</Grid>
				</Container>
			</Flex>
			<Flex className="bg-red-100 p-5 my-5">
				<Container>
					<Grid columns="3">
						<Box className="col-span-2 text-right">
							<Heading>Library</Heading>
							<Text>
								Visit the Library page to explore the learning materials
								available on the platform. Utilize the filters to quickly find
								what you need and save your favorite documents so you can easily
								access them later when you have time.
							</Text>
						</Box>
						<Box className="col-span-1">
							<img alt="screenshot" />
						</Box>
					</Grid>
				</Container>
			</Flex>
			<Flex direction="column" className="max-w-[1100px] mx-auto" gap="5">
				<Flex direction="column">
					<Heading>Frequently Asked Questions</Heading>
					<Heading weight="light">
						How you can use Maestro in your day-to-day job
					</Heading>
				</Flex>
			</Flex>
		</div>
	);
};

export default HelpPage;
