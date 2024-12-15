const isUserAllowed = (roles: string[], url: string) => {
    let result = false;
    if (url === "Manage users" && roles.includes("User Manager")) {
        result = true;
        return result;
    }
    if (url === "Articles" && roles.includes("Editor")) {
        result = true;
        return result;
    }
    if (url === "Home" && roles.includes("Learner")) {
        result = true;
        return result;
    }
    if (
        url === "My Profile" &&
        (roles.includes("Learner") || roles.includes("Editor"))
    ) {
        result = true;
        return result;
    }
    if (url === "Library" && roles.includes("Learner")) {
        result = true;
        return result;
    }
    if (
        url === "ChatMaestro" &&
        (roles.includes("Learner") ||
            roles.includes("Editor") ||
            roles.includes("User Manager"))
    ) {
        result = true;
        return result;
    }
};
export default isUserAllowed;