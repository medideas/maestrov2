import { setCookie } from "cookies-next";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Redirect = () => {
	const searchParams = useSearchParams();
	const jwt = searchParams.get("jwt");
	useEffect(() => {
		setCookie("jwt", jwt, { path: "/" });
	}, []);
	redirect("/");
	return <div>Redirect</div>;
};

export default Redirect;
