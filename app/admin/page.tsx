"use client";
import React, { useEffect, useState, FC } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Chip,
} from "@heroui/react";
import { Spinner } from "@heroui/spinner";

import ShineBorder from "../../components/ui/shine-border";
import SummaryWrapper from "../../components/SummaryWrapper";
import AnalysisResult from "../../components/AnalysisResult";

import SpecialSummary from "@/components/SpecialSummary";
import { useToast } from "@/hooks/use-toast";
import { ShinyButton } from "@/components/ui/shiny-button";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ActiveChip = () => {
  return (
    <Chip color="success" variant="faded">
      Checked
    </Chip>
  );
};
const NoActiveChip = () => {
  return (
    <Chip color="danger" variant="faded">
      Not Checked
    </Chip>
  );
};

export default function App() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const [pdfList, setPdfList] = useState([]);

  const [analysisResult, setAnalysisResult] = useState("");
  const [summary, setSummary] = useState("");
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [totalSummary, setTotalSummary] = useState("");
  const { toast } = useToast();
  const getPdfList = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "api/papers/");

      setPdfList(response.data);
      toast({
        title: "Paper Fetch",
        description: "Load Pdfs successfully!",
      });
    } catch (error) {
      toast({
        title: "Paper Fetch",
        description: "Uh, oh! Something went wrong!" + { error },
      });
    }
  };

  const handleAnalyze = async (id: number) => {
    setSummary("");
    setAnalysisResult("");
    setIsChecking(true);
    setAnalyzingId(id);
    setSummaryLoading(true);
    const resp = await axios.get(
      API_BASE_URL + `api/papers/${id}/get_summary/`
    );

    setSummaryLoading(false);
    setSummary(resp.data.summary);
    setCheckLoading(true);
    const response = await axios.get(
      API_BASE_URL + `api/papers/${id}/check_paper/`
    );

    setCheckLoading(false);
    setAnalysisResult(response.data.analysis);
    setTotalSummary(response.data.summary);
    setAnalyzingId(null);
  };

  const pages = Math.ceil(pdfList.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return pdfList.slice(start, end);
  }, [page, pdfList]);

  useEffect(() => {
    getPdfList();
  }, []);

  return (
    <div>
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="id">Id</TableColumn>
          <TableColumn key="title">Title</TableColumn>
          <TableColumn key="created_at">Created Date</TableColumn>
          <TableColumn key="Summary">Summary</TableColumn>
          <TableColumn key="Analysis">Analysis</TableColumn>
          <TableColumn key="Action">Action</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.created_at}</TableCell>
              <TableCell>
                {item.has_summary ? <ActiveChip /> : <NoActiveChip />}
              </TableCell>
              <TableCell>
                {item.has_analysis ? <ActiveChip /> : <NoActiveChip />}
              </TableCell>
              <TableCell>
                <ShinyButton
                  color="primary"
                  disabled={analyzingId !== null}
                  onClick={() => handleAnalyze(item.id)}
                >
                  {analyzingId === item.id ? "Analyzing..." : "Check"}
                </ShinyButton>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isChecking && (
        <div className="card mb-8 flex flex-col items-center justify-center rounded border-2 shadow-md w-full">
          <ShineBorder
            borderWidth={3}
            className="relative flex w-full flex-col items-stretch overflow-hidden rounded-lg border-2 bg-[#EEEEEEF0] p-6 shadow-xl md:shadow-xl"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          >
            <div className="flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-4">
              {summaryLoading && <Spinner className="my-4" color="primary" />}
              {summary && <SummaryWrapper summary={summary} />}
            </div>

            {summary && (
              <div className="mb-6 md:mb-12">
                <SpecialSummary summary={totalSummary} />
                <div
                  className={
                    "flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-6"
                  }
                >
                  {checkLoading && <Spinner className="my-4" color="primary" />}
                  {analysisResult && (
                    <AnalysisResult
                      results={analysisResult}
                      total_summary={totalSummary}
                    />
                  )}
                </div>
              </div>
            )}
          </ShineBorder>
        </div>
      )}
    </div>
  );
}
