"use client";
import React, { useEffect, useState, useRef } from "react";
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
  Card,
  Input,
  Button,
} from "@heroui/react";
import { Spinner } from "@heroui/spinner";
import _ from "lodash";
import SummaryWrapper from "../../components/SummaryWrapper";
import AnalysisResult from "../../components/AnalysisResult";
import FileUpload from "../../components/file-upload";
import SpecialSummary from "@/components/SpecialSummary";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";
import { ShinyButton } from "@/components/ui/shiny-button";
import { useAnalyze } from "@/contexts/AnalyzeContext";
import ReCAPTCHA from "react-google-recaptcha";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const ActiveChip = () => (
  <Chip color="success" variant="faded">
    Checked
  </Chip>
);
const NoActiveChip = () => (
  <Chip color="danger" variant="faded">
    Not Checked
  </Chip>
);

type TriggerRefType = {
  current: (() => void) | null;
};

export default function App() {
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 5;
  const { theme } = useTheme();
  const [pdfList, setPdfList] = useState([]);
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const { toast } = useToast();
  const triggerUploadRef: TriggerRefType = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<any>("");
  const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  // Get analyze context values
  const {
    analysisResult,
    summary,
    totalSummary,
    summaryLoading,
    checkLoading,
    isChecking,
    handleAnalyze,
    resetState,
  } = useAnalyze();
  const captchaRef = useRef<any>(null);

  const getPdfList = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "api/papers/");
      const data: any = _.sortBy(response.data, ["updated_at"]);
      setPdfList(data);
      toast({
        title: "Paper Fetch",
        description: "Load Pdfs successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Paper Fetch",
        description: "Uh, oh! Something went wrong!" + { error },
      });
    }
  };

  const handleAnalyzeWithId = async (id: number) => {
    setAnalyzingId(id);
    // await handleAnalyze(id);
    setAnalyzingId(null);
  };

  const handleAnalyzeWithPdf = async (s3_url: string) => {
    await handleAnalyze(s3_url);
  };
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(API_BASE_URL + `api/papers/${id}/`);
      await getPdfList();
      toast({
        title: "Success",
        description: "Paper deleted successfully!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete paper",
      });
    }
  };

  const handleLogin = async () => {
    setIsLoading(true);
    let token = captchaRef.current.getValue();
    try {
      if (token) {
        const response = await axios.get(
          API_BASE_URL + `api/papers/verify/?password=${password}`
        );

        if (response.data.status === "success") {
          setIsAuthenticated(true);
          toast({
            title: "Success",
            description: "Successfully authenticated!",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Invalid password",
          });
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Authentication failed",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const onChange = (value: any) => {
    setCaptchaValue(value);
  };
  const pages = Math.ceil(pdfList.length / rowsPerPage);
  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return pdfList.slice(start, end);
  }, [page, pdfList]);

  useEffect(() => {
    getPdfList();
  }, [totalSummary]);

  if (!isAuthenticated) {
    return (
      <div
        className="flex flex-col items-center justify-center p-4"
        style={{ height: "calc(100vh - 15rem)" }}
      >
        <Card
          className={`p-8 rounded-lg shadow-lg max-w-md w-full`}
          radius="lg"
          shadow="lg"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
          <Input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
            className="mb-4"
          />
          <ReCAPTCHA sitekey={SITE_KEY} onChange={onChange} ref={captchaRef} />
          <Button
            color="primary"
            type="submit"
            className="w-full mt-4"
            onPress={handleLogin}
            isDisabled={isLoading || !captchaValue}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <Table
        aria-label="PDF list table"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={setPage}
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
          <TableColumn key="updated_at">Updated Date</TableColumn>
          <TableColumn key="Summary">Summary</TableColumn>
          <TableColumn key="Analysis">Analysis</TableColumn>
          <TableColumn key="Action">Action</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.updated_at}</TableCell>
              <TableCell>
                {item.has_summary ? <ActiveChip /> : <NoActiveChip />}
              </TableCell>
              <TableCell>
                {item.has_analysis ? <ActiveChip /> : <NoActiveChip />}
              </TableCell>
              <TableCell>
                <div className="flex flex-row justify-center">
                  <ShinyButton
                    color="primary"
                    className="mr-2"
                    disabled={analyzingId !== null}
                    onClick={() => handleAnalyzeWithId(item.id)}
                  >
                    {analyzingId === item.id ? "Analyzing..." : "Check"}
                  </ShinyButton>
                  <ShinyButton
                    color="primary"
                    disabled={analyzingId !== null}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </ShinyButton>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="my-4 w-full">
        <FileUpload
          AnalyzePaper={handleAnalyzeWithPdf}
          getPdfList={getPdfList}
          onTriggerRef={triggerUploadRef}
        />
      </div>

      {isChecking && (
        <div
          className={`card mb-8 flex flex-col items-center justify-center rounded border-2 shadow-md w-full ${
            theme === "dark" ? "bg-[#1f2a37]" : "bg-[#EEEEEEF0]"
          }`}
        >
          <div className="flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-2 w-full">
            {summaryLoading && <Spinner className="my-4" color="primary" />}
            {summary && <SummaryWrapper summary={summary} />}
          </div>

          {summary && (
            <div className="mb-0 sm:mb-2 w-full">
              <SpecialSummary summary={totalSummary} />
              <div className="flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-6">
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
        </div>
      )}
    </div>
  );
}
