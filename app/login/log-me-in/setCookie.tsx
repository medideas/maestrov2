"use client";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Props {
	jwt: string;
}

const SetCookie = ({ jwt }: Props) => {
	const router = useRouter();
	useEffect(() => {
		setCookie("jwt", jwt, { path: "/" });
		router.push("/");
	});
	return <div></div>;
};

export default SetCookie;
