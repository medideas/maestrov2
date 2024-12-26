import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { deleteCookie } from "cookies-next";
import { mightBeLoggedIn } from "./auth";
import { UnauthorizedError } from "./api/errors";
import { fetchApi } from "./fetchInterceptor";
import links from './navlink';
import isUserAllowed from './isUserAllowed';
import { Toast } from '../components/ClientToast';

const gerUnauthorizedErrorMessage = (pathname: string, userRoles: string[]) => {
	const listFormatter = new Intl.ListFormat('en-GB', {
		style: 'short',
		type: 'disjunction',
	});
	const rolesString = listFormatter.format(userRoles);
	return `Not authorized to access ${pathname} as a ${rolesString}`;
}

const getCurrentPathname = async () => {
	const headersList = await headers();
	return headersList.get('x-pathname') || "";
};

export const AuthenticatedPage = (PageComponent: () => React.ReactNode) => async (props: any) => {
	// Authenticate
	if (!(await mightBeLoggedIn())) {
		return <Toast type="error" message="Login required" />;
	}

	try {
		const loggedUser = await fetchApi(`/my/profile`);
		// Authorize
		const userRoles = loggedUser.roleUsers.map((r) => r.role.name);
		const pathname = await getCurrentPathname();
		const matchingRoute = links.find(link => link.href === pathname);

		if (matchingRoute && !isUserAllowed(userRoles, matchingRoute.for)) {
			const error = gerUnauthorizedErrorMessage(pathname, userRoles);
			return <Toast type="error" message={error} />;
		}

		return <PageComponent {...props} />;
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			console.warn('Unauthorized, redirecting to login');
			deleteCookie('jwt');
			redirect('/login?unauthorized=true');
		} else {
			throw error;
		}
	}
};
