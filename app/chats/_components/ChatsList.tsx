"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
	id: string;
	title: string;
}

const Chatslist = ({ id, title }: Props) => {
	const path = usePathname();
	return (
		<li
			key={id}
			className={
				path.split("chats/").pop() === id
					? "my-1 py-1 px-3 bg-slate-300 duration-200 rounded-sm border-[2px] border-black"
					: "my-1 py-1 px-3 border-[2px] border-black hover:bg-slate-200 duration-200 rounded-sm"
			}
		>
			<Link href={"/chats/" + id}>{title}</Link>
		</li>
	);
};

export default Chatslist;
