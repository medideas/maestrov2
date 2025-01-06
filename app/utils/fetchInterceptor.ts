import { getCookie } from "./cookies";
import { toast } from 'react-toastify';
import { 
	ServerConnectionError,
	OfflineError,
	ServerError,
	ClientError,
	UnauthorizedError
} from './api/errors'
import { HttpStatusCode } from "./api/httpStatusCodes";

const fetchInterceptor = async (url: string, options?: RequestInit) => {
	let res;
	let data;
	const { pathname } = new URL(url);
	const resource = pathname.replace(/\/$/, '').split('/').pop();

	try {
		const jwt = await getCookie("jwt");
		res = await fetch(url, {
			...options,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: jwt ? "Bearer " + jwt : '',
				...options?.headers
			},
			cache: "no-store"
		});
		data = await res.json();
	} catch (error) {
		console.error(`Fetch request failed ${url}`, error);
		if (navigator.onLine) {
			toast.error('Server seems to be offline');
			throw new ServerConnectionError();
		} else {
			toast.error('No internet connection');
			throw new OfflineError();
		}
	}

	const status = res?.status;

	if (status >= 500) {
		toast.error(`Server error for ${resource}: ${res.status} ${res.statusText}`);
		console.error('500 error', data, res);
		throw new ServerError(res, data, pathname);
	}

	if (status >= 400) {
		if (status === HttpStatusCode.UNAUTHORIZED) {
			throw new UnauthorizedError(res, data, pathname);
		}

		throw new ClientError(res, data, pathname);
	}

	return data;
};

export const fetchApi = (url: string, options?: RequestInit) =>
	fetchInterceptor(`${process.env.NEXT_PUBLIC_APIBASE}${url}`, options);
