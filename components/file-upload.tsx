"use client";
import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";
import api from "@/utils/api";
import {
  AudioWaveform,
  File,
  FileImage,
  FolderArchive,
  UploadCloud,
  Video,
  X,
} from "lucide-react";
import {
  Button,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input as HeroInput,
  useDisclosure,
  Tabs,
  Tab,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Image,
  Checkbox,
} from "@heroui/react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { useRef, useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import _ from "lodash";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { useTheme } from "next-themes";
import UserSearchBar from "./UserSearch";
import APAImage from "@/public/citations/APA.png";
import AIPImage from "@/public/citations/AIP.png";
import ACSImage from "@/public/citations/ACS.png";
import ChicagoImage from "@/public/citations/Chicago.png";
import CSEImage from "@/public/citations/CSE.png";
import IEEEImage from "@/public/citations/IEEE.png";
import { useAnalyze } from "@/contexts/AnalyzeContext";
import { FaFile, FaLink } from "react-icons/fa";
import { LuScrollText } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { SiRoamresearch } from "react-icons/si";
import { MdError, MdArticle } from "react-icons/md";

interface FileUploadProgress {
  progress: number;
  file: File;
  source: CancelTokenSource | null;
}

enum FileTypes {
  Image = "image",
  Pdf = "pdf",
  Audio = "audio",
  Video = "video",
  Other = "other",
}
export interface Option {
  value: string;
  label: string;
  disable?: boolean;
  avatar: string;
  /** fixed option that can't be removed. */
  fixed?: boolean;
  /** Group the options by providing key. */
  [key: string]: string | boolean | undefined;
}

const ImageColor = {
  bgColor: "bg-purple-600",
  fillColor: "fill-purple-600",
};

const PdfColor = {
  bgColor: "bg-blue-400",
  fillColor: "fill-blue-400",
};

const AudioColor = {
  bgColor: "bg-yellow-400",
  fillColor: "fill-yellow-400",
};

const VideoColor = {
  bgColor: "bg-green-400",
  fillColor: "fill-green-400",
};

const OtherColor = {
  bgColor: "bg-gray-400",
  fillColor: "fill-gray-400",
};

export const options = [
  { key: "everyone", label: "Everyone" },
  { key: "followers", label: "My Followers" },
  { key: "specific_users", label: "Specific Users" },
  { key: "nobody", label: "Nobody" },
];
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export interface ImageUploadProps {
  getPdfList: () => void;
  onTriggerRef: React.MutableRefObject<(() => void) | null>;
}

export const ListboxWrapper = ({ children }: any) => (
  <div className="w-full border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

export const citations = [
  { key: "APA", label: "APA", image: APAImage },
  { key: "Chicago", label: "Chicago", image: ChicagoImage },
  { key: "CSE", label: "CSE", image: CSEImage },
  { key: "AIP", label: "AIP", image: AIPImage },
  { key: "ACS", label: "ACS", image: ACSImage },
  { key: "IEEE", label: "IEEE", image: IEEEImage },
];

export const AnalyzeForm = ({
  loading,
  theme,
  onOpen,
  disabled,
  setResearchPaperLink,
  paper_link,
  visibility,
}: {
  loading: boolean;
  theme: string;
  onOpen: () => void;
  disabled?: boolean;
  visibility: string;
  paper_link: string;
  setResearchPaperLink: (link: string) => void;
}) => {
  return (
    <Button
      isLoading={loading}
      className={` ${theme === "dark" ? "bg-[#C8E600] text-black" : "bg-[#EE43DE] text-white"}`}
      onPress={() => {
        setResearchPaperLink(paper_link);
        onOpen();
      }}
      isDisabled={disabled}
    >
      <span
        className={`w-max mx-2 ${theme === "dark" ? " text-black" : "text-white"}`}
      >
        Analyze
      </span>
    </Button>
  );
};

const FileUpload = ({ getPdfList, onTriggerRef }: ImageUploadProps) => {
  const [currentFile, setCurrentFile] = useState<FileUploadProgress | null>(
    null
  );
  const [users, setUsers] = useState<Option[]>([]);
  const [visibility, setVisibility] = useState(["everyone"]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [s3_link, setS3Link] = useState("");
  const [paper_url, setPaperUrl] = useState("");
  const [paper_value, setPaperValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleAnalyze, setProcessType } = useAnalyze();
  const { toast } = useToast();
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [researchPaperUrl, setResearchPaperUrl] = useState("");
  const [selected, setSelected] = useState("equal");
  const [citation, setCitation] = useState("APA");
  const [analyzeOption, setAnalyzeOption] = useState("ResearchCheck");
  const [summaryOption, setSummaryOption] = useState("basic");
  const [advancedMethods, setAdvancedMethods] = useState<string[]>(["Method"]);

  onTriggerRef.current = () => {
    fileInputRef.current?.click();
  };

  const getFileIconAndColor = (file: File) => {
    if (file.type.includes(FileTypes.Image)) {
      return {
        icon: <FileImage className={ImageColor.fillColor} size={40} />,
        color: ImageColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Pdf)) {
      return {
        icon: <File className={PdfColor.fillColor} size={40} />,
        color: PdfColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Audio)) {
      return {
        icon: <AudioWaveform className={AudioColor.fillColor} size={40} />,
        color: AudioColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Video)) {
      return {
        icon: <Video className={VideoColor.fillColor} size={40} />,
        color: VideoColor.bgColor,
      };
    }

    return {
      icon: <FolderArchive className={OtherColor.fillColor} size={40} />,
      color: OtherColor.bgColor,
    };
  };

  const onUploadProgress = (
    progressEvent: AxiosProgressEvent,
    file: File,
    cancelSource: CancelTokenSource
  ) => {
    const progress = Math.round(
      (progressEvent.loaded / (progressEvent.total ?? 0)) * 100
    );

    if (progress === 100) {
      setUploadedFile(file);
      setCurrentFile(null);

      return;
    }

    setCurrentFile({
      progress,
      file,
      source: cancelSource,
    });
  };

  const removeFile = () => {
    setCurrentFile(null);
    setUploadedFile(null);
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    const cancelSource = axios.CancelToken.source();

    setCurrentFile({
      progress: 0,
      file,
      source: cancelSource,
    });

    const formData = new FormData();

    formData.append("file", file);
    setLoading(true);
    try {
      toast({
        description: `Uploading file: ${_.truncate(file.name, {
          length: 15,
          omission: "...",
        })} Please wait.`,
      });
      const response = await api.post("/util/upload/add/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        cancelToken: cancelSource.token,
        onUploadProgress: (progressEvent) => {
          onUploadProgress(progressEvent, file, cancelSource);
        },
      });

      toast({
        description: `Your file ${_.truncate(file.name, {
          length: 15,
          omission: "...",
        })} has been uploaded and is now in the queue for AI analysis.`,
        duration: 2500,
      });
      await sleep(2500);
      toast({
        description: "File uploaded successfully!",
        action: (
          <ToastAction
            altText="View Paper"
            onClick={() => window.open(response.data.attached_link, "_blank")}
          >
            View
          </ToastAction>
        ),
        duration: 5000,
      });
      await sleep(3000);
      setS3Link(response.data.attached_link);
      setLoading(false);
      // AnalyzePaper(response.data.attached_link);
      // getPdfList();
    } catch (error) {
      if (axios.isCancel(error)) {
        toast({
          variant: "destructive",
          title: "Paper Upload",
          description: "Upload cancelled",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Paper Upload",
          description: "Upload failed: " + error,
        });
      }
      removeFile();
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="">
      <p className="text-lg font-semibold">Analyze a Research Paper</p>
      <p className="text-sm mb-2">
        Submit research papers that matter to you—whether they’re trending in
        your field, influencing public conversations, or raising important
        questions.NerdBunny helps uncover inconsistencies, flawed reasoning, or
        methodological issues and publishes the results for open community
        review.
      </p>
      <Tabs
        aria-label="Options"
        color="primary"
        variant="bordered"
        className="mt-8"
      >
        <Tab
          key="file"
          title={
            <div className="flex items-center space-x-2">
              <FaFile />
              <span>File</span>
            </div>
          }
        >
          <div className="">
            <label
              {...getRootProps()}
              htmlFor="dropzone-file"
              className={`relative h-[350px] flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed   ${theme === "dark" ? " bg-[#090C0F] border-[#293847] py-6 hover:bg-[#081524] hover:border-[#3C6B99]" : " bg-gray-50 py-6 hover:bg-gray-100"}`}
            >
              <div className="text-center">
                <div className="mx-auto max-w-min rounded-md border p-2">
                  <UploadCloud size={20} />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  <span className="font-semibold">Drop a file or Browse</span>
                </p>
                <p className="text-xs text-gray-500">
                  Click to upload a file &#40;file should be under 25 MB&#41;
                </p>
                <br />
              </div>
            </label>
            <Input
              {...getInputProps()}
              className="hidden"
              ref={fileInputRef}
              id="dropzone-file"
              type="file"
            />
            {uploadedFile && (
              <div>
                <div>
                  <p className="my-2 mt-6 text-sm font-medium text-muted-foreground">
                    Uploaded File
                  </p>
                  <div className="group flex justify-between gap-2 overflow-hidden rounded-lg border border-slate-100 pr-2 transition-all hover:border-slate-300 hover:pr-0">
                    <div className="flex flex-1 items-center p-2">
                      <div className="text-white">
                        {getFileIconAndColor(uploadedFile).icon}
                      </div>
                      <div className="ml-2 w-full space-y-1">
                        <div className="flex justify-between text-sm">
                          <p className="text-muted-foreground">
                            {uploadedFile.name.slice(0, 25)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      className="hidden items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex"
                      onClick={removeFile}
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
                <div className="flex md:flex-row flex-col justify-center w-full gap-5 mt-4">
                  <div className="w-full md:w-[20%]">
                    <Select
                      isRequired
                      variant="faded"
                      className="max-w-xs"
                      defaultSelectedKeys={["everyone"]}
                      placeholder="Select visibility."
                      selectedKeys={new Set(visibility)}
                      onSelectionChange={(keys) =>
                        setVisibility([...keys] as string[])
                      }
                    >
                      {options.map((option) => (
                        <SelectItem key={option.key}>{option.label}</SelectItem>
                      ))}
                    </Select>
                  </div>
                  <UserSearchBar
                    setUsers={setUsers}
                    users={users}
                    disabled={visibility[0] !== "specific_users"}
                  />

                  <AnalyzeForm
                    loading={loading}
                    theme={theme!}
                    paper_link={s3_link}
                    onOpen={onOpen}
                    setResearchPaperLink={setResearchPaperUrl}
                    visibility={visibility[0]}
                    disabled={!s3_link}
                  />
                </div>
              </div>
            )}
          </div>
        </Tab>
        <Tab
          key="url"
          title={
            <div className="flex items-center space-x-2">
              <FaLink />
              <span>URL</span>
            </div>
          }
        >
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-lg">Paste Paper URL</p>
            <div className="mt-2 flex flex-row justify-between gap-3">
              <HeroInput
                className="w-full"
                label="Paper URL : "
                variant="bordered"
                value={paper_url}
                onValueChange={(val) => setPaperUrl(val)}
                labelPlacement="outside-left"
                placeholder="https://arxiv.org/abs/..."
                classNames={{ mainWrapper: "w-full" }}
              />
              <AnalyzeForm
                loading={loading}
                theme={theme!}
                paper_link={paper_url}
                onOpen={onOpen}
                setResearchPaperLink={setResearchPaperUrl}
                visibility={visibility[0]}
                disabled={!paper_url}
              />
            </div>
            <span className="text-xs ml-2 text-gray-500">
              Note: Currently supporting papers from: arXiv, bioRxiv, medRxiv,
              and OpenAlex. More sources are coming soon.
            </span>
          </div>
        </Tab>
        <Tab
          key="text"
          className=""
          title={
            <div className="flex items-center space-x-2">
              <LuScrollText />
              <span>Text</span>
            </div>
          }
        >
          <div className="flex flex-col justify-center gap-3">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="paper">Paper Content</Label>
              <Textarea
                placeholder="Input the paper."
                id="paper"
                className="h-[300px] z-10"
                value={paper_value}
                onChange={(e: any) => setPaperValue(e.target.value)}
              />
            </div>
            <div className="flex flex-row justify-end gap-4">
              <AnalyzeForm
                loading={loading}
                theme={theme!}
                paper_link={paper_url}
                setResearchPaperLink={setResearchPaperUrl}
                onOpen={onOpen}
                visibility={visibility[0]}
                disabled={!paper_url}
              />
            </div>
          </div>
        </Tab>
      </Tabs>

      <Modal backdrop="opaque" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Analyze Options
              </ModalHeader>
              <ModalBody className="flex flex-col justify-center items-center">
                <Tabs
                  selectedKey={analyzeOption}
                  onSelectionChange={(key) => setAnalyzeOption(key as string)}
                >
                  <Tab
                    key="ResearchCheck"
                    title={
                      <div className="flex items-center space-x-2">
                        <MdError size={20} />
                        <span>Discrepancies</span>
                      </div>
                    }
                  >
                    <div className="min-h-[250px]">
                      <span>
                        Analyze the paper for inconsistencies, flawed reasoning,
                        or methodological issues.
                      </span>
                    </div>
                  </Tab>
                  <Tab
                    key="GenerateArticle"
                    title={
                      <div className="flex items-center space-x-2">
                        <MdArticle />
                        <span>Article</span>
                      </div>
                    }
                  >
                    <div className="min-h-[250px] flex flex-col justify-center items-center">
                      <Tabs
                        aria-label="Options"
                        color="primary"
                        variant="bordered"
                        className="mt-2"
                        selectedKey={summaryOption}
                        onSelectionChange={(key) =>
                          setSummaryOption(key as string)
                        }
                      >
                        <Tab
                          key="Basic"
                          title={
                            <div className="flex items-center space-x-2">
                              <IoSettingsOutline />
                              <span>Basic</span>
                            </div>
                          }
                        >
                          <div className="min-h-[250px]">
                            <span>
                              Generate the basic concept summary for this
                              research paper.
                            </span>
                          </div>
                        </Tab>
                        <Tab
                          key="Advanced"
                          title={
                            <div className="flex items-center space-x-2">
                              <SiRoamresearch />
                              <span>Advanced</span>
                            </div>
                          }
                        >
                          <div className="min-h-[250px] flex flex-col gap-2">
                            <RadioGroup
                              label="Select your favorite city"
                              value={selected}
                              onValueChange={setSelected}
                            >
                              <Radio value="equal">
                                Weight all sections equally
                              </Radio>
                              <Radio value="seperate">
                                Based on these methods
                              </Radio>
                            </RadioGroup>
                            <CheckboxGroup
                              isDisabled={selected === "equal"}
                              defaultValue={["Method"]}
                              value={advancedMethods}
                              onValueChange={(keys) => {
                                setAdvancedMethods(keys as string[]);
                                console.log(advancedMethods);
                              }}
                              label="Select methods"
                            >
                              <Checkbox value="Method">
                                Focus on methods
                              </Checkbox>
                              <Checkbox value="Result">
                                Focus on Result
                              </Checkbox>
                              <Checkbox value="Limitation">
                                Highlight limitations
                              </Checkbox>
                              <Checkbox value="Finding">
                                Highlight main findings/take home messages
                              </Checkbox>
                              <Checkbox value="Data">
                                Data availability
                              </Checkbox>
                            </CheckboxGroup>
                            <div className="flex flex-row justify-between">
                              <Select
                                key={"outside"}
                                className="max-w-[250px]"
                                defaultSelectedKeys={["APA"]}
                                label="Citation Format"
                                labelPlacement={"outside"}
                                selectedKeys={new Set([citation])}
                                placeholder="Select Citation Format"
                              >
                                {citations.map((citation) => (
                                  <SelectItem
                                    key={citation.key}
                                    onPress={() => setCitation(citation.key)}
                                  >
                                    {citation.label}
                                  </SelectItem>
                                ))}
                              </Select>
                              <Image
                                alt="HeroUI hero Image with delay"
                                height={100}
                                src={
                                  citations.find(
                                    (value) => value.key === citation
                                  )?.image.src
                                }
                                width={100}
                              />
                            </div>
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    setProcessType(analyzeOption);
                    if (analyzeOption === "ResearchCheck") {
                      handleAnalyze(s3_link, visibility[0], users, [
                        "ResearchCheck",
                      ]);
                    } else {
                      handleAnalyze(
                        researchPaperUrl,
                        "nobody",
                        users,
                        ["GenerateArticle"],
                        summaryOption,
                        advancedMethods,
                        citation
                      );
                    }
                    onClose();
                  }}
                >
                  Generate
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {currentFile && (
        <div>
          <p className="my-2 mt-6 text-sm font-medium text-muted-foreground">
            File to upload
          </p>
          <div className="group flex justify-between gap-2 overflow-hidden rounded-lg border border-slate-100 pr-2 hover:pr-0">
            <div className="flex flex-1 items-center p-2">
              <div className="text-white">
                {getFileIconAndColor(currentFile.file).icon}
              </div>
              <div className="ml-2 w-full space-y-1">
                <div className="flex justify-between text-sm">
                  <p className="text-muted-foreground">
                    {currentFile.file.name.slice(0, 25)}
                  </p>
                  <span className="text-xs">{currentFile.progress}%</span>
                </div>
                <Progress
                  className={getFileIconAndColor(currentFile.file).color}
                  value={currentFile.progress}
                />
              </div>
            </div>
            <button
              className="hidden cursor-pointer items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex"
              onClick={() => {
                if (currentFile.source)
                  currentFile.source.cancel("Upload cancelled");
                removeFile();
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
