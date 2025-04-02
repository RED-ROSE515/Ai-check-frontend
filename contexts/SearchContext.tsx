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
  getTotalResults: () => Promise<void>;
  setTotalResults: React.Dispatch<React.SetStateAction<any[]>>;
  processType: string;
  setProcessType: (processType: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [keyword, setKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("desc");
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState<any[]>([]);
  const [processType, setProcessType] = useState("");
  const { page, setTotalPage } = usePagination();
  const { toast } = useToast();

  const getTotalResults = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/post/pagination?post_type=6&start=${(page - 1) * 3}&limit=3${processType ? `&process_type=${processType}` : ""}${keyword ? `&keyword=${keyword}` : ""}${sortBy ? `&error_type=${sortBy}` : ""}`
      );

      setTotalResults(response.data.data);
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
  }, [page, keyword, sortBy, processType, setTotalPage, toast]);

  useEffect(() => {
    getTotalResults();
  }, [page, keyword, sortBy, processType, setTotalPage, toast]);

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
    getTotalResults,
    setTotalResults,
    processType,
    setProcessType,
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
