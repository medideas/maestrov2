import { cookies } from "next/headers";

const fetchInterceptor = async (url: string) => {
  const jwt = await (await cookies()).get("jwt")
  const data = await fetch(url, {
    headers: {
      Accept: "application/json",
      Authorization:
        "Bearer " + jwt?.value ,
    },
    cache: "no-store"
  });
  const res = await data.json();
  return (res);
}

export default fetchInterceptor;

export const fetchApi = (url: string) =>
  fetchInterceptor(`${process.env.NEXT_PUBLIC_APIBASE}${url}`);
