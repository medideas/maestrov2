import { getCookie } from "./cookies";
import { toast } from 'react-toastify';

export class ClientError extends Error {}
export class ServerError extends Error {}

const fetchInterceptor = async (url: string, options?: RequestInit) => {
	let res;
	const resource = url.replace(/\/$/, '').split('/').pop();

	try {
		const jwt = await getCookie("jwt");
		const data = await fetch(url, {
			...options,
			headers: {
				Accept: "application/json",
				Authorization: jwt ? "Bearer " + jwt : '',
				...options?.headers
			},
			cache: "no-store"
		});
		res = await data.json();
	} catch (error) {
		toast.error(`Failed to fetch ${resource}`);
		console.error(`Fetch request failed ${url}`, error);
	}

	if (res?.status >= 500) {
		toast.error(`Server error for ${resource}: ${res.status} ${res.statusText}`);
		throw new ServerError(`${res.status} ${res.statusText}`);
	}

	if (res?.status >= 400) {
		throw new ClientError(`Client error ${res.status} ${res.statusText}`);
	}

	return res;
};

export const fetchApi = (url: string, options?: RequestInit) =>
	fetchInterceptor(`${process.env.NEXT_PUBLIC_APIBASE}${url}`, options);
