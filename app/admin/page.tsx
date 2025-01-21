"use client";
import React, { useEffect, useState } from "react";
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
import ShineBorder from "../../components/ui/shine-border";
import SummaryWrapper from "../../components/SummaryWrapper";
import SpecialSummary from "@/components/SpecialSummary";
import AnalysisResult from "../../components/AnalysisResult";
import { Spinner } from "@heroui/spinner";
import { useToast } from "@/hooks/use-toast";
import { ShinyButton } from "@/components/ui/shiny-button";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const CheckIcon = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height={24}
      viewBox="0 0 24 24"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM16.78 9.7L11.11 15.37C10.97 15.51 10.78 15.59 10.58 15.59C10.38 15.59 10.19 15.51 10.05 15.37L7.22 12.54C6.93 12.25 6.93 11.77 7.22 11.48C7.51 11.19 7.99 11.19 8.28 11.48L10.58 13.78L15.72 8.64C16.01 8.35 16.49 8.35 16.78 8.64C17.07 8.93 17.07 9.4 16.78 9.7Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const CrossIcon = ({ ...props }) => {
  return (
    <svg
      fill="none"
      height={24}
      viewBox="0 0 24 24"
      width={24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM16.3 15.59C16.59 15.88 16.59 16.35 16.3 16.64C16.15 16.79 15.96 16.86 15.77 16.86C15.58 16.86 15.39 16.79 15.24 16.64L12 13.41L8.76 16.64C8.61 16.79 8.42 16.86 8.23 16.86C8.04 16.86 7.85 16.79 7.7 16.64C7.41 16.35 7.41 15.88 7.7 15.59L10.94 12.36L7.7 9.12C7.41 8.83 7.41 8.36 7.7 8.07C7.99 7.78 8.46 7.78 8.76 8.07L12 11.31L15.24 8.07C15.53 7.78 16 7.78 16.3 8.07C16.59 8.36 16.59 8.83 16.3 9.12L13.06 12.36L16.3 15.59Z"
        fill="currentColor"
      />
    </svg>
  );
};
const ActiveChip = () => {
  return (
    <Chip color="success" startContent={<CheckIcon />} variant="faded">
      Checked
    </Chip>
  );
};
const NoActiveChip = () => {
  return (
    <Chip color="danger" startContent={<CrossIcon />} variant="faded">
      Not Checked
    </Chip>
  );
};
export default function App() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 4;

  const [isGettingList, setIsGettingList] = useState(false);
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
      setIsGettingList(true);
      const response = await axios.get(API_BASE_URL + "api/papers/");
      setPdfList(response.data);
      toast({
        title: "Paper Fetch",
        description: "Load Pdfs successfully!",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Paper Fetch",
        description: "Uh, oh! Something went wrong!" + { error },
      });
    } finally {
      setIsGettingList(false);
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
            className="relative flex w-full flex-col items-stretch overflow-hidden rounded-lg border-2 bg-[#EEEEEEF0] p-6 shadow-xl md:shadow-xl"
            color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
            borderWidth={3}
          >
            <div className="flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-4">
              {summaryLoading && <Spinner color="primary" className="my-4" />}
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
                  {checkLoading && <Spinner color="primary" className="my-4" />}
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
