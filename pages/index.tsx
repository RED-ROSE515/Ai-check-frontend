import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Text } from "@radix-ui/themes";
import DemoCard from "../components/shared/DemoCard";
import ReactMarkdown from "react-markdown";
import { CloudUpload } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import {
  Table,
  Button,
  LinearProgress,
  Snackbar,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

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
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [isGettingList, setIsGettingList] = useState(false);
  const [streamData, setStreamData] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

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
      await axios.post("http://localhost:8001/api/pdfs/", formData, {
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
      const response = await axios.get("http://localhost:8001/api/pdfs/");
      setPdfList(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGettingList(false);
    }
  };

  const handleAnalyze = async (id: number) => {
    setAnalyzingId(id);
    setStreamData("");
    setIsStreaming(true);

    const evtSource = new EventSource(
      `http://localhost:8001/api/pdfs/${id}/check_paper_stream/`,
      {
        withCredentials: true,
      }
    );
    evtSource.onmessage = (event) => {
      console.log("Received message:", event.data);
      if (event.data === "[$Analysis Done.$]") {
        evtSource.close();
        setAnalyzingId(null);
      } else {
        setStreamData((prev) => prev + event.data + "\n");
      }
    };

    // const response = await axios.get(
    //   `http://localhost:8001/api/pdfs/${id}/check_paper/`
    // );
    // console.log(response.data.analysis);
    // setStreamData(response.data.analysis);
    // evtSource.onerror = (error) => {
    //   console.error("EventSource error:", error);
    //   evtSource.close();
    //   setIsStreaming(false);
    // };
  };

  return (
    <Fragment>
      <div className="mx-auto flex grid w-full flex-row flex-wrap gap-6 p-12">
        <DemoCard
          isNew
          variant={DemoCard.variant.JustifyCenter}
          data={{
            title: "AI Error Detector",
          }}
        >
          <div className="flex w-full flex-row justify-start gap-4">
            <div className="w-1/3">
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
            <div className="flex w-2/3 flex-col gap-4">
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
                              {analyzingId === pdf.id
                                ? "Analyzing..."
                                : "Check"}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
              <div className="mt-4">
                <Text as="p" size="2" mb="2" weight="bold">
                  Analysis Results:
                </Text>
                <div className="max-h-[600px] overflow-y-auto rounded-md border border-gray-200 bg-white p-4">
                  <div className="mb-4 rounded-md bg-gray-100 p-3">
                    <Text as="p" size="2" color="gray">
                      Live Analysis:
                    </Text>

                    {streamData && (
                      <ReactMarkdown
                        components={{
                          h3: ({ children }) => (
                            <h3 className="mb-2 mt-6 text-xl font-bold">
                              {children}
                            </h3>
                          ),
                          h4: ({ children }) => (
                            <h4 className="mb-2 mt-4 text-lg font-semibold">
                              {children}
                            </h4>
                          ),
                          p: ({ children }) => (
                            <p className="mb-4">{children}</p>
                          ),
                          ul: ({ children }) => (
                            <ul className="mb-4 ml-6 list-disc">{children}</ul>
                          ),
                          li: ({ children }) => (
                            <li className="mb-2">{children}</li>
                          ),
                          strong: ({ children }) => (
                            <strong className="font-bold">{children}</strong>
                          ),
                          em: ({ children }) => (
                            <em className="italic">{children}</em>
                          ),
                          hr: () => <hr className="my-6 border-gray-200" />,
                        }}
                      >
                        {streamData}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DemoCard>
      </div>
    </Fragment>
  );
};

export default Demo;
