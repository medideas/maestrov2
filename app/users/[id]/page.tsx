import UserAvatar from "@/app/my/profile/_components/UserAvatar";
import UserDetailsCard from "@/app/my/profile/_components/UserDetailsCard";
import fetchInterceptor from "@/app/utils/fetchInterceptor";
import {
	Badge,
	Button,
	Code,
	Container,
	DataList,
	Flex,
	Heading,
	Separator,
} from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const UserPage = async (props: { params: Promise<{ id: string }> }) => {
	const params = await props.params;
	const id = params.id;
	const user = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/users/${id}`
	);
	console.log(user);
	return (
		<Container py={"50px"}>
			<Flex justify="between">
				<UserAvatar user={user} message="" />

				<UserDetailsCard user={user} />
				<Flex justify={"end"} align={"center"}>
					<Flex gap="3" direction={"column"} justify={"end"} align={"end"}>
						<Link href={`/users/${user.id}/edit`}>
							<Button color="jade">Edit user profile</Button>
						</Link>
						<Link href={`/users/${user.id}/delete`}>
							<Button color="red">Delete User</Button>
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</Container>
	);
};

export default UserPage;
