"use client";
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import api from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { usePagination } from "./PaginationContext";
import { usePathname } from "next/navigation";

interface SearchContextType {
  keyword: string;
  setKeyword: (keyword: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  order: string;
  setOrder: (order: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  totalResults: any[];
  totalCount: number;
  setTotalCount: (totalCount: number) => void;
  getTotalResults: (process_type?: string) => Promise<void>;
  setTotalResults: React.Dispatch<React.SetStateAction<any[]>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const { page, setTotalPage } = usePagination();
  const { toast } = useToast();
  const pathname = usePathname();

  const getTotalResults = useCallback(
    async (process_type?: string) => {
      try {
        setLoading(true);
        const response = await api.get(
          `/post/pagination?post_type=6&start=${(page - 1) * 3}&limit=3${process_type ? `&process_type=${process_type}` : pathname?.includes("/results/articles") ? "&process_type=GenerateArticle" : "&process_type=ResearchCheck"}${keyword ? `&keyword=${keyword}` : ""}${sortBy ? `&error_type=${sortBy}` : ""}`
        );

        setTotalResults(response.data.data);
        setTotalCount(response.data.total_count);
        setTotalPage(Math.ceil(response.data.total_count / 3));
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Analysis Data",
          description:
            "Uh, oh! Something went wrong!   (" +
            error.response.data.message +
            ")",
        });
      } finally {
        setLoading(false);
      }
    },
    [page, keyword, sortBy, toast]
  );

  useEffect(() => {
    getTotalResults();
  }, [page, keyword, sortBy, toast]);

  const value = {
    keyword,
    setKeyword,
    sortBy,
    setSortBy,
    order,
    setOrder,
    loading,
    setLoading,
    totalResults,
    totalCount,
    setTotalCount,
    getTotalResults,
    setTotalResults,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
