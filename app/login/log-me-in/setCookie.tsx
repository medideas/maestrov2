"use client";
import { setCookie } from "cookies-next";
import { useEffect } from "react";

interface Props {
	jwt: string;
}

const SetCookie = ({ jwt }: Props) => {
	useEffect(() => {
		setCookie("jwt", jwt, { path: "/" });
	});
	return <div></div>;
};

export default SetCookie;
