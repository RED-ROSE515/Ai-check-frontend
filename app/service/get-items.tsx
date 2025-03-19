import useSWR from "swr";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useGetItem(paperId: string) {
  return useSWR(paperId && ` ${API_BASE_URL}/post/${paperId}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
