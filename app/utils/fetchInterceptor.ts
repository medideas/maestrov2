import { cookies } from "next/headers";

const fetchInterceptor = async (url: string) => {
  const jwt = await (await cookies()).get("jwt")
  try{
    const data = await fetch(url, {
        headers: {
      Accept: "application/json",
      Authorization:
        "Bearer " + jwt?.value ,
    },
    cache: "no-store"
    });
    const res = await data.json();
    if (data.status > 400){
      throw new Error('Failed to fetch. ' + data.status);  
    }
    return (res);
  }catch(error){
    console.log("Error: ", error);
    if ( error.status === 400 ){

      throw new Error('Failed to fetch.');
    }

  };
}

export default fetchInterceptor;
