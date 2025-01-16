import React, { useState, useEffect } from "react";
import axios from "axios";
import DemoCard from "../components/DemoCard";
import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import useDeviceCheck from "../hooks/useDeviceCheck";
import {
  Table,
  Button,
  LinearProgress,
  CircularProgress,
  Snackbar,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import StatisticCard from "../components/StatisticCard";
import AnalysisResult from "../components/AnalysisResult";
import SummaryWrapper from "../components/SummaryWrapper";

interface Props {}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const Demo = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [pdfList, setPdfList] = useState([]);
  const [analysisResult, setAnalysisResult] = useState("");
  const [summary, setSummary] = useState("");
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [isGettingList, setIsGettingList] = useState(false);
  const [streamData, setStreamData] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [checkLoading, setCheckLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [totalSummary, setTotalSummary] = useState("");
  const deviceType = useDeviceCheck();
  // const API_BASE_URL = "https://devai1.nobleblocks.com/";
  const API_BASE_URL = "http://localhost:8000/";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setUploadStatus("");
    } else {
      setSelectedFile(null);
      setUploadStatus("Please select a valid PDF file.");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setUploadStatus("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("title", selectedFile.name);
    try {
      await axios.post(API_BASE_URL + "api/pdfs/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });
      setUploadStatus("Upload successful!");
      await getPdfList();
    } catch (error) {
      setUploadStatus("Upload failed.");
      console.error(error);
    }
  };

  const getPdfList = async () => {
    try {
      setIsGettingList(true);
      const response = await axios.get(API_BASE_URL + "api/pdfs/");
      setPdfList(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGettingList(false);
    }
  };

  const handleAnalyzeStream = async (id: number) => {
    setAnalyzingId(id);
    setStreamData("");
    setIsStreaming(true);

    const evtSource = new EventSource(
      API_BASE_URL + `api/pdfs/${id}/check_paper_fully/`,
      {
        withCredentials: true,
      }
    );
    evtSource.onmessage = (event) => {
      console.log("Received message:", event.data, event);
      if (event.data === "[$Analysis Done.$]") {
        evtSource.close();
        setAnalyzingId(null);
      } else {
        setStreamData((prev) => prev + event.data + "\n");
      }
    };
  };

  const handleAnalyze = async (id: number) => {
    setSummary("");
    setAnalysisResult("");
    setIsChecking(true);
    setAnalyzingId(id);
    setSummaryLoading(true);
    const resp = await axios.get(API_BASE_URL + `api/pdfs/${id}/get_summary/`);
    setSummaryLoading(false);
    setSummary(resp.data.summary);
    setCheckLoading(true);
    const response = await axios.get(
      API_BASE_URL + `api/pdfs/${id}/check_paper/`
    );
    setCheckLoading(false);
    setAnalysisResult(response.data.analysis);
    setTotalSummary(response.data.summary);
    setAnalyzingId(null);
  };

  return (
    <div style={{ backgroundColor: "#F3F7F9" }} className="px-8">
      <div
        className={
          deviceType === "mobile"
            ? "mx-auto grid w-full flex-row flex-wrap gap-6"
            : "mx-auto grid w-full flex-row flex-wrap gap-6 p-12 px-36"
        }
      >
        <StatisticCard />
      </div>
      <div>You are using a {deviceType} device.</div>
      <DemoCard
        isNew
        variant={DemoCard.variant.JustifyCenter}
        data={{
          title: "AI Error Detector",
        }}
      >
        <div className="flex w-full flex-col justify-start gap-4 md:flex-row">
          <div className="w-full md:w-1/3">
            <form onSubmit={handleUpload}>
              <div className="mb-2 flex flex-row items-center justify-start gap-2">
                <Button component="label" variant="contained" sx={{ mb: 2 }}>
                  Choose PDF
                  <VisuallyHiddenInput
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
                </Button>
                {selectedFile ? selectedFile.name : "No file selected"}
              </div>
              <div>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<CloudUpload />}
                  disabled={!selectedFile}
                >
                  Upload
                </Button>
              </div>
            </form>
            {progress > 0 && (
              <div className="mb-4 mt-4">
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                    },
                  }}
                />
                <div className="mt-1 text-right text-sm text-gray-600">
                  {Math.round(progress)}%
                </div>
              </div>
            )}
            {uploadStatus && (
              <Snackbar
                open={true}
                autoHideDuration={5000}
                message={uploadStatus}
              />
            )}
          </div>
          <div className="flex w-full flex-col gap-4 md:w-2/3">
            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={getPdfList}
                disabled={isGettingList}
              >
                Get PDF List
              </Button>
            </div>
            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="pdf list table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>ID</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {pdfList.map((pdf) => (
                      <TableRow
                        key={pdf.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {pdf.title}
                        </TableCell>
                        <TableCell>{pdf.id}</TableCell>
                        <TableCell>{pdf.created_at}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => handleAnalyze(pdf.id)}
                            variant="contained"
                            color="primary"
                            disabled={analyzingId !== null}
                            size="small"
                          >
                            {analyzingId === pdf.id ? "Analyzing..." : "Check"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </DemoCard>

      {isChecking && (
        <div className="mb-12 flex max-h-[600px] flex-row items-center justify-center overflow-y-auto rounded-md border-2 border-blue-600">
          {summaryLoading && <CircularProgress className="my-4" />}
          {summary && <SummaryWrapper summary={summary} />}
        </div>
      )}

      {isChecking && summary && (
        <div
          className="mb-12 flex max-h-[600px] flex-row justify-center overflow-y-auto rounded-md border-2 border-blue-600"
          style={{ backgroundColor: "#EEEEEEF0" }}
        >
          {checkLoading && <CircularProgress className="my-4" />}
          {analysisResult && <AnalysisResult results={analysisResult} />}
        </div>
      )}
    </div>
  );
};

export default Demo;
