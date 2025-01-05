import React, { Fragment, useState } from "react";
import axios from "axios";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { Text, Table } from "@radix-ui/themes";
import Button from "../components/shared/Button";
import DemoCard from "../components/shared/DemoCard";
import ReactMarkdown from "react-markdown";

interface Props {}

const Demo = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [pdfList, setPdfList] = useState([]);
  const [analysisResult, setAnalysisResult] = useState("");
  const [analyzingId, setAnalyzingId] = useState<number | null>(null);
  const [isGettingList, setIsGettingList] = useState(false);
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
      const response = await axios.post(
        "http://localhost:8000/api/pdfs/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );
      setUploadStatus("Upload successful!");
      console.log(response.data);
    } catch (error) {
      setUploadStatus("Upload failed.");
      console.error(error);
    }
  };

  const getPdfList = async () => {
    try {
      setIsGettingList(true);
      const response = await axios.get("http://localhost:8000/api/pdfs/");
      setPdfList(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGettingList(false);
    }
  };

  const handleAnalyze = async (id: number) => {
    try {
      setAnalyzingId(id);
      const response = await axios.get(
        `http://localhost:8000/api/pdfs/${id}/check_paper/`
      );
      setAnalysisResult(response.data.analysis);
    } catch (error) {
      console.error(error);
      setAnalysisResult("Error analyzing PDF");
    } finally {
      setAnalyzingId(null);
    }
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
                <label
                  htmlFor="file-upload"
                  className="bg-Primary-500 rounded-md px-4 py-2 text-white"
                >
                  Choose File
                </label>
                <label>
                  {selectedFile ? selectedFile.name : "No file selected"}
                </label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  hidden
                  id="file-upload"
                />
                <Button type="submit">Upload</Button>
              </form>
              {progress > 0 && (
                <ProgressPrimitive.Root
                  value={progress}
                  className="h-3 w-full overflow-hidden rounded-full bg-white dark:bg-gray-900"
                >
                  <ProgressPrimitive.Indicator
                    style={{ width: `${progress}%` }}
                    className="h-full bg-purple-500 duration-300 ease-in-out dark:bg-white"
                  />
                </ProgressPrimitive.Root>
              )}
              {uploadStatus && <p>{uploadStatus}</p>}
            </div>
            <div className="flex w-2/3 flex-col gap-4">
              <div>
                <Button onClick={getPdfList} loading={isGettingList}>
                  Get PDF List
                </Button>
              </div>
              <div>
                <Table.Root variant="surface">
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>
                        Created At
                      </Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {pdfList.map((pdf) => (
                      <Table.Row key={pdf.id}>
                        <Table.RowHeaderCell>{pdf.title}</Table.RowHeaderCell>
                        <Table.Cell>{pdf.id}</Table.Cell>
                        <Table.Cell>{pdf.uploaded_at}</Table.Cell>
                        <Table.Cell>
                          <Button
                            onClick={() => handleAnalyze(pdf.id)}
                            disabled={analyzingId === pdf.id}
                          >
                            {analyzingId === pdf.id ? "Analyzing..." : "Check"}
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Root>
              </div>
              {analysisResult && (
                <div className="mt-4">
                  <Text as="p" size="2" mb="2" weight="bold">
                    Analysis Results:
                  </Text>
                  <div className="max-h-[600px] overflow-y-auto rounded-md border border-gray-200 bg-white p-4">
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
                        p: ({ children }) => <p className="mb-4">{children}</p>,
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
                      {analysisResult}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DemoCard>
      </div>
    </Fragment>
  );
};

export default Demo;
