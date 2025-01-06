import { getCookie } from "./cookies";

export const PUBLIC_ROUTES = ["/login"];

export const getJwt = () => getCookie("jwt");

export const hasJwtExpired = async () => {
    const jwt = await getJwt();

    if (!jwt) return true;

    try {
        const [_header, payload, _signature] = jwt.split('.');

        const { exp } = JSON.parse(atob(payload));
        const expiryTimestamp = exp * 1000;
        return expiryTimestamp <= Date.now();
    } catch (error) {
        console.warn("Can't decode JWT token");
        return true;
    }
}

export const mightBeLoggedIn = async () => !(await hasJwtExpired());
