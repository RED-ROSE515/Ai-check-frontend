"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@heroui/react";
import axios from "axios";

interface Paper {
  id: number;
  title: string;
  abstract: string;
  updated: string;
  // Add other fields you might need
}

interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  totalItems: number;
}

const App = () => {
  const categories = [
    { label: "Computer Science", value: "cs" },
    { label: "Economics", value: "econ" },
    { label: "Electrical Engineering and Systems Science", value: "eess" },
    { label: "Mathematics", value: "math" },
    { label: "Physics", value: "physics" },
    { label: "Astrophysics", value: "physics:astro-ph" },
    { label: "Condensed Matter", value: "physics:cond-mat" },
    {
      label: "General Relativity and Quantum Cosmology",
      value: "physics:gr-qc",
    },
    { label: "High Energy Physics - Experiment", value: "physics:hep-ex" },
    { label: "High Energy Physics - Lattice", value: "physics:hep-lat" },
    { label: "High Energy Physics - Phenomenology", value: "physics:hep-ph" },
    { label: "High Energy Physics - Theory", value: "physics:hep-th" },
    { label: "Mathematical Physics", value: "physics:math-ph" },
    { label: "Nonlinear Sciences", value: "physics:nlin" },
    { label: "Nuclear Experiment", value: "physics:nucl-ex" },
    { label: "Nuclear Theory", value: "physics:nucl-th" },
    { label: "Physics (Other)", value: "physics:physics" },
    { label: "Quantum Physics", value: "physics:quant-ph" },
    { label: "Quantitative Biology", value: "q-bio" },
    { label: "Quantitative Finance", value: "q-fin" },
    { label: "Statistics", value: "stat" },
  ];
  const [loading, setLoading] = useState(false);
  const [processLoading, setProcessLoading] = useState(false);
  const [papers, setPapers] = useState([]);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const paginate = (
    papers: Paper[],
    currentPage: number,
    itemsPerPage: number
  ): { paginatedData: Paper[]; pagination: Pagination } => {
    const totalItems = papers.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const paginatedData = papers.slice(startIndex, endIndex);

    return {
      paginatedData,
      pagination: {
        currentPage,
        itemsPerPage,
        totalPages,
        totalItems,
      },
    };
  };
  let { paginatedData, pagination } = paginate(
    papers,
    currentPage,
    itemsPerPage
  );

  useEffect(() => {
    const data = paginate(papers, currentPage, itemsPerPage);
    paginatedData = data.paginatedData;
    pagination = data.pagination;
  }, [currentPage]);
  const scrape_papers = async (category: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}api/papers/scrape_papers/?category=${category}`
      );
      setPapers(response.data.data);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const process_paper = async (paper_id: number) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}api/papers/process_paper/?id=${paper_id}`
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const processPapers = async (paperIds: number[]): Promise<void> => {
    try {
      // Create an array of axios requests for all paper IDs
      setProcessLoading(true);
      const requests = paperIds.map((paperId) =>
        axios.get(`${API_BASE_URL}api/papers/process_paper/?id=${paperId}`)
      );

      // Execute all requests simultaneously
      const responses = await Promise.all(requests);

      // Handle responses
      responses.forEach((response, index) => {
        console.log(`Response for paper ID ${paperIds[index]}:`, response.data);
      });
    } catch (error) {
      console.error("Error processing papers:", error);
      // Handle individual request failures if needed
    } finally {
      setProcessLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-row justify-start gap-2">
      <div className="w-1/5">
        <Table
          aria-label="Example static collection table"
          color={"primary"}
          defaultSelectedKeys={["2"]}
          selectionMode="single"
        >
          <TableHeader>
            <TableColumn>CATEGORY</TableColumn>
            <TableColumn>ACTION</TableColumn>
          </TableHeader>
          <TableBody>
            {categories.map((category, index) => (
              <TableRow key={index}>
                <TableCell>{category.label}</TableCell>
                <TableCell>
                  <Button
                    onPress={() => scrape_papers(category.value)}
                    isLoading={loading}
                  >
                    {loading ? "Loading" : "Get"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="w-4/5">
        <Table
          aria-label="Example static collection table"
          color={"primary"}
          defaultSelectedKeys={["2"]}
          selectionMode="single"
          bottomContent={
            <div className="flex w-full justify-center">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={currentPage}
                total={pagination.totalPages}
                onChange={(page: number) => setCurrentPage(page)}
              />
            </div>
          }
        >
          <TableHeader>
            <TableColumn>Title</TableColumn>
            <TableColumn>Id</TableColumn>
            <TableColumn>Date</TableColumn>
            <TableColumn>Abstract</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>
          <TableBody>
            <>
              {paginatedData.map((paper: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{paper.title}</TableCell>
                  <TableCell>{paper.id}</TableCell>
                  <TableCell>{paper.updated}</TableCell>
                  <TableCell>{paper.abstract}</TableCell>
                  <TableCell>
                    <Button onPress={() => process_paper(paper.id)}>
                      Process
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedData.length && (
                <TableRow>
                  <TableCell>{"Total"}</TableCell>
                  <TableCell>{""}</TableCell>
                  <TableCell>{""}</TableCell>
                  <TableCell>{""}</TableCell>
                  <TableCell>
                    <div className="flex flex-col justify-center w-full">
                      <Button
                        onPress={() => {
                          const ids = paginatedData.map((item) => item.id);
                          processPapers(ids);
                        }}
                      >
                        Process Page
                      </Button>
                      <Button
                        className="mt-2"
                        onPress={() => {
                          const ids = papers.map((item: any) => item.id);
                          processPapers(ids);
                        }}
                      >
                        Process All
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default App;
