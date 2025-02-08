import {
	Box,
	Card,
	ChevronDownIcon,
	Container,
	Flex,
	Grid,
	Heading,
	Separator,
	Text,
} from "@radix-ui/themes";
import React, { Suspense } from "react";
import { BsStars } from "react-icons/bs";
import { IoBookOutline } from "react-icons/io5";
import { PiUsersThin } from "react-icons/pi";
import { AiOutlineUser } from "react-icons/ai";
import { PiFolderPlusThin } from "react-icons/pi";
import { MdWifiTethering } from "react-icons/md";
import { GoRocket } from "react-icons/go";
import * as Accordion from "@radix-ui/react-accordion";

const HelpPage = async () => {
	return (
		<div>
			<Suspense>
				<Flex direction="column" className="max-w-[1100px] mx-auto" gap="5">
					<Flex direction="column" className="mt-[40px]" gap="1">
						<Heading weight="light">About Maestro</Heading>
						<Heading size="4" weight="light" color="gray" mb="3">
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
					<Flex gap="4" my="3">
						<Box
							width="350px"
							className="transition ease-in-out hover:translate-y-[-10px] duration-300 hover:shadow-lg"
						>
							<Card size="2" className="bg-maestro min-h-[100%]">
								<Flex gap="4" align="center" p="2">
									<BsStars size="100" />
									<Box>
										<Heading size="4" weight="light" mb="1">
											Become better at your job
										</Heading>
										<Text size="2" color="gray">
											Self-improve every day and perform at the highest
											standards to serve patients at your best
										</Text>
									</Box>
								</Flex>
							</Card>
						</Box>

						<Box
							width="350px"
							className="transition ease-in-out hover:translate-y-[-10px] duration-300  hover:shadow-lg"
						>
							<Card size="2" className="bg-maestro">
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

						<Box
							width="350px"
							className="transition ease-in-out hover:translate-y-[-10px] duration-300 hover:shadow-lg"
						>
							<Card size="2" className="bg-maestro">
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
							designed to streamline and enhance their learning experience
							through advanced AI capabilities. By using the power of AI, 
							Maestro personalizes learning content for each user based on their
							specific role, competencies, and skills. This ensures that
							employees receive targeted educational materials relevant to their
							job functions, making their learning more efficient and impactful.
						</Text>
					</Flex>

					<Flex direction="column">
						<Heading weight="light">Getting started</Heading>
						<Heading size="4" weight="light" color="gray" mb="3">
							How you can use Maestro in your day-to-day job
						</Heading>
					</Flex>
					<Flex gap="5" align="start" mb="5">
						<div className="max-w-[160px] text-center mx-4">
							<div className="bg-maestro p-10 rounded-full w-[150px] mb-4">
								<IoBookOutline size="70" color="#ccc" />
							</div>

							<Text size="2" align="center">
								Personalized content based on your profile
							</Text>
						</div>

						<div className="max-w-[160px] text-center mx-4">
							<div className="bg-maestro p-10 rounded-full w-[150px] mb-4">
								<AiOutlineUser size="70" color="#ccc" />
							</div>
							<Text size="2" className="text-center">
								Content limited to one competency: Clinical & Product Knowledge
							</Text>
						</div>
						<div className="max-w-[160px] text-center mx-4">
							<div className="bg-maestro p-10 rounded-full w-[150px] mb-4">
								<PiFolderPlusThin size="70" color="#ccc" />
							</div>
							<Text size="2" className="text-center">
								+200 documents uploaded in the library
							</Text>
						</div>
						<div className="max-w-[160px] text-center mx-4">
							<div className="bg-maestro p-10 rounded-full w-[150px] mb-4">
								<MdWifiTethering size="70" color="#ccc" />
							</div>
							<Text size="2" className="text-center">
								Accessible via website from laptop, tablet and mobile phone
							</Text>
						</div>
						<div className="max-w-[160px] text-center mx-4">
							<div className="bg-maestro p-10 rounded-full w-[150px] mb-4">
								<GoRocket size="70" color="#ccc" />
							</div>
							<Text size="2" className="text-center">
								Constantly evolving and improving... many new features to come!
							</Text>
						</div>
					</Flex>
				</Flex>
				<Flex className="bg-maestro p-5 my-5">
					<Container>
						<Grid columns="3">
							<Box className="col-span-1" p="3" mr="5">
								<img alt="screenshot" src="./help-1.png" />
							</Box>
							<Flex
								justify="center"
								direction="column"
								className="align-middle col-span-2"
							>
								<Heading weight="light" mb="2">
									ChatMaestro
								</Heading>
								<Text className="readable">
									One of Maestro&apos;s standout features is ChatMaestro, an
									AI-driven assistant available directly within the platform,
									which provides instant, contextual answers to user queries,
									doubts and requests. This feature promotes an interactive
									learning environment, allowing employees to engage with
									content actively and receive immediate support, which is
									particularly beneficial for complex or technical subjects.
								</Text>
							</Flex>
						</Grid>
					</Container>
				</Flex>
				<Flex className="bg-maestro p-5 my-5">
					<Container>
						<Grid columns="3">
							<Flex
								justify="center"
								direction="column"
								className="align-middle col-span-2"
							>
								<Heading weight="light" mb="2">
									Home Page
								</Heading>
								<Text className="readable">
									By using the power of AI,  Maestro personalizes learning
									content for each user based on your specific role,
									competencies, and skills. This ensures that you receive
									targeted educational materials relevant to your job functions,
									making your learning more efficient and impactful.
								</Text>
							</Flex>
							<Box className="col-span-1">
								<img alt="screenshot" src="./help-2.png" />
							</Box>
						</Grid>
					</Container>
				</Flex>
				<Flex className="bg-maestro p-5 my-5">
					<Container>
						<Grid columns="3">
							<Box className="col-span-1" py="5" p="3" mr="5">
								<img alt="screenshot" src="./help-1.png" />
							</Box>
							<Flex
								justify="center"
								direction="column"
								className="align-middle col-span-2"
							>
								<Heading weight="light" mb="2">
									Profile
								</Heading>
								<Text className="readable">
									In your profile you’ll be able to test assess your level of
									proficiency in the 4 key competencies: Clinical & Product
									Knowledge, Market & Business Expertise, Operational Excellence
									and Selling Skills. Maestro will guide you through a
									personalized learning path and track your progress during
									time.
								</Text>
							</Flex>
						</Grid>
					</Container>
				</Flex>
				<Flex className="bg-maestro p-5 my-5">
					<Container>
						<Grid columns="3">
							<Flex
								justify="center"
								direction="column"
								className="align-middle col-span-2"
							>
								<Heading weight="light" mb="2">
									Library
								</Heading>
								<Text className="readable">
									Visit the Library page to explore the learning materials
									available on the platform. Utilize the filters to quickly find
									what you need and save your favorite documents so you can
									easily access them later when you have time.
								</Text>
							</Flex>
							<Box className="col-span-1">
								<img alt="screenshot" src="./help-2.png" />
							</Box>
						</Grid>
					</Container>
				</Flex>
				<Flex
					direction="column"
					className="mt-[50px] mb-[80px] max-w-[1100px] mx-auto"
					gap="5"
				>
					<Flex direction="column">
						<Flex direction="column" mb="4">
							<Heading weight="light" mb="2">
								Frequently Asked Questions
							</Heading>
							<Heading weight="light" color="gray" size="4" mb="5">
								How you can use Maestro in your day-to-day job
							</Heading>
						</Flex>
						<Flex direction="column" gap="4">
							<Accordion.Root
								type="single"
								collapsible
								className="bg-slate-100 p-5"
							>
								<Accordion.Item value="item-1">
									<Accordion.Header>
										<Accordion.Trigger className="w-[100%]">
											<Flex justify={"between"} align={"center"} width={"100%"}>
												<Heading as="h3" size="5" weight="light">
													1. How do I change my role in maestro
												</Heading>
												<ChevronDownIcon width={15} height={15} />
											</Flex>
										</Accordion.Trigger>
									</Accordion.Header>
									<Accordion.Content>
										<Separator my="3" size="4" />
										<Text className="readable" mb="5">
											Roles are assigned by the User Manager. Contact your User
											Manager if you need a change in access level or role
											permissions
										</Text>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>

							<Accordion.Root
								type="single"
								collapsible
								className="border-slate-100 border-[1px] p-5"
							>
								<Accordion.Item value="item-1">
									<Accordion.Header>
										<Accordion.Trigger className="w-[100%]">
											<Flex justify={"between"} align={"center"} width={"100%"}>
												<Heading as="h3" size="5" weight="light">
													2. Can I use Maestro on a mobile device?
												</Heading>
												<ChevronDownIcon width={15} height={15} />
											</Flex>
										</Accordion.Trigger>
									</Accordion.Header>
									<Accordion.Content>
										<Separator my="3" size="4" />
										<Text className="readable" mb="5">
											Yes, Maestro is designed to be responsive and works across
											devices, though a dedicated mobile app is in development.
										</Text>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>

							<Accordion.Root
								type="single"
								collapsible
								className="bg-slate-100 p-5"
							>
								<Accordion.Item value="item-1">
									<Accordion.Header>
										<Accordion.Trigger className="w-[100%]">
											<Flex justify={"between"} align={"center"} width={"100%"}>
												<Heading as="h3" size="5" weight="light">
													3. How do I save content for future reference?
												</Heading>
												<ChevronDownIcon width={15} height={15} />
											</Flex>
										</Accordion.Trigger>
									</Accordion.Header>
									<Accordion.Content>
										<Separator my="3" size="4" />
										<Text className="readable" mb="5">
											You can mark content as &quot;Saved&quot; within the
											Library section for easy access later.
										</Text>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>

							<Accordion.Root
								type="single"
								collapsible
								className="border-slate-100 border-[1px] p-5"
							>
								<Accordion.Item value="item-1">
									<Accordion.Header>
										<Accordion.Trigger className="w-[100%]">
											<Flex justify={"between"} align={"center"} width={"100%"}>
												<Heading as="h3" size="5" weight="light">
													4. How does ChatMaestro work?
												</Heading>
												<ChevronDownIcon width={15} height={15} />
											</Flex>
										</Accordion.Trigger>
									</Accordion.Header>
									<Accordion.Content>
										<Separator my="3" size="4" />
										<Text className="readable" mb="5">
											ChatMaestro is an integrated AI chatbot that provides
											instant assistance. Start a conversation by typing your
											question in the floating chat bar, available on the Home,
											Profile, and Help pages.
										</Text>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>

							<Accordion.Root
								type="single"
								collapsible
								className="bg-slate-100 p-5"
							>
								<Accordion.Item value="item-1">
									<Accordion.Header>
										<Accordion.Trigger className="w-[100%]">
											<Flex justify={"between"} align={"center"} width={"100%"}>
												<Heading as="h3" size="5" weight="light">
													5. Who can upload new content to Maestro?
												</Heading>
												<ChevronDownIcon width={15} height={15} />
											</Flex>
										</Accordion.Trigger>
									</Accordion.Header>
									<Accordion.Content>
										<Separator my="3" size="4" />
										<Text className="readable" mb="5">
											Users with the Editor role can upload and manage content
											within Maestro. If you’re an Editor, refer to the Content
											Creation page for guidance on uploading articles​.
										</Text>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>

							<Accordion.Root
								type="single"
								collapsible
								className="border-slate-100 border-[1px] p-5"
							>
								<Accordion.Item value="item-1">
									<Accordion.Header>
										<Accordion.Trigger className="w-[100%]">
											<Flex justify={"between"} align={"center"} width={"100%"}>
												<Heading as="h3" size="5" weight="light">
													6. What should I do if I encounter technical issues?
												</Heading>
												<ChevronDownIcon width={15} height={15} />
											</Flex>
										</Accordion.Trigger>
									</Accordion.Header>
									<Accordion.Content>
										<Separator my="3" size="4" />
										<Text className="readable" mb="5">
											Contact your IT support team or refer to the Help Section
											under “Technical Troubleshooting.”
										</Text>
									</Accordion.Content>
								</Accordion.Item>
							</Accordion.Root>
						</Flex>
					</Flex>
				</Flex>
			</Suspense>
		</div>
	);
};

export default HelpPage;
