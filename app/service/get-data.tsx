import useSWR from "swr";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function useGetData(url: string) {
  return useSWR(url && ` ${API_BASE_URL}/${url}`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
