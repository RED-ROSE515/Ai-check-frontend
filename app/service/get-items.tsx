import useSWR from "swr";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = (url: string) => {
  const user = localStorage.getItem("user");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (user) {
    const userData = JSON.parse(user);
    headers["Authorization"] = `Bearer ${userData.token}`;
  }

  return fetch(url, { headers }).then((res) => {
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    return res.json();
  });
};
export default function useGetItem(paperId: string) {
  return useSWR(paperId && ` ${API_BASE_URL}/post/${paperId}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
