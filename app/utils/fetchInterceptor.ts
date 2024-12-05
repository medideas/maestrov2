import { cookies } from "next/headers";

const fetchInterceptor = async (url: string, p0: { method: string; cache: string; }) => {
  const jwt = await (await cookies()).get("jwt")
  const data = await fetch(url, {
      headers: {
    Accept: "application/json",
    Authorization:
      "Bearer " + jwt?.value ,
  },
  });
  const res = await data.json();
  return (res);
}

export default fetchInterceptor;
