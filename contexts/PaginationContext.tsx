"use client";
import React, { createContext, useContext, useState } from "react";

type PaginationContextType = {
  page: number;
  totalPage: number;
  setPage: (page: number) => void;
  setTotalPage: (total: number) => void;
};

const PaginationContext = createContext<PaginationContextType | undefined>(
  undefined
);

export function PaginationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  return (
    <PaginationContext.Provider
      value={{ page, totalPage, setPage, setTotalPage }}
    >
      {children}
    </PaginationContext.Provider>
  );
}

export function usePagination() {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error("usePagination must be used within PaginationProvider");
  }
  return context;
}
