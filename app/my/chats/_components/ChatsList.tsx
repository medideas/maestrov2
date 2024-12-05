"use client";
import { TrashIcon } from "@radix-ui/react-icons";
import { Flex, Text, Button } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DeleteChatButton from "./DeleteChatButton";

interface Props {
	chat: Chat;
}

type Chat = {
	id: string;
	name: string;
};

const Chatslist = ({ chat }: Props) => {
	const path = usePathname();
	return (
		<li
			key={chat.id}
			className={
				path.split("chats/").pop() === chat.id
					? "my-1 py-1 px-3 bg-stone-100 duration-200 rounded-sm border-[1px] border-black"
					: "mb-2 py-2 px-3 bg-slate-50 hover:bg-slate-200 duration-200 rounded-md"
			}
		>
			<Flex justify={"between"} align={"center"}>
				<Link className="w-[100%]" href={"/my/chats/" + chat.id}>
					{chat.name}
				</Link>
				<DeleteChatButton chatId={chat.id} />
			</Flex>
		</li>
	);
};

export default Chatslist;
