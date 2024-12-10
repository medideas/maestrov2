import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const isUserAllowed = async (path: string, user: User) => {
    let result = true;
    // const currentUser = user;
    // const allowedRoutesForUserRole = [
    //     {role: "Learner", blockedRoutes: ["/", "/my/articles", "/articles/new", "/articles/edit", "/users", "/users/new", "/users/edit"]}, 
    //     {role: "Editor", blockedRoutes: ["/users", "/users/new", "/users/edit", "/articles"]},
    //     {role: "User Manager", blockedRoutes: ["/articles/new", "/articles/edit"]}
    // ]
    // allowedRoutesForUserRole.map(route => (
    //     currentUser.roleUsers.map(userRole => 
    //         userRole.role.name === route.role && 
    //             !route.blockedRoutes.includes(path) && (result = false)
    //     )
    // ))
    console.log(result)
    return result
}
export default isUserAllowed;