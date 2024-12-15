import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import fetchInterceptor from "./fetchInterceptor";

const isUserAllowed = async (user: User, role: String) => {
    const currentUser = await fetchInterceptor(
		`${process.env.NEXT_PUBLIC_APIBASE}/my/profile`
	);
    let userRoles = <String[]>[];
    currentUser.roleUsers.map((r: { role: { name: String; }; }) => userRoles.push(r.role.name))
    console.log(userRoles);
    if(userRoles.includes(role)){
        return true
    };
}
export default isUserAllowed;