import React from "react";
import { deleteCookie } from "cookies-next";

const DeleteCookie = () => {
	deleteCookie("jwt");
	return;
};

export default DeleteCookie;
