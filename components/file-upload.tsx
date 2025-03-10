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
import { Button, Select, SelectItem } from "@heroui/react";
import { useRef, useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import _ from "lodash";
import { useToast } from "../hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";
import { useTheme } from "next-themes";
import UserSearchBar from "./UserSearch";
import { useAnalyze } from "@/contexts/AnalyzeContext";
import { ShinyButton } from "./ui/shiny-button";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

const FileUpload = ({ getPdfList, onTriggerRef }: ImageUploadProps) => {
  const [currentFile, setCurrentFile] = useState<FileUploadProgress | null>(
    null
  );
  const [users, setUsers] = useState<Option[]>([]);
  const [visibility, setVisibility] = useState(["everyone"]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [s3_link, setS3Link] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleAnalyze } = useAnalyze();
  const { toast } = useToast();
  const { theme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
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
    <div>
      <div>
        <label
          {...getRootProps()}
          htmlFor="dropzone-file"
          className={`relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#C8E600]  ${theme === "dark" ? " bg-slate-700 py-6 hover:bg-slate-800" : " bg-gray-50 py-6 hover:bg-gray-100"}`}
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
          </div>
        </label>
        <Input
          {...getInputProps()}
          className="hidden"
          ref={fileInputRef}
          id="dropzone-file"
          type="file"
        />
      </div>

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
            <Button
              isLoading={loading}
              className={`w-full md:w-[20%] ${theme === "dark" ? "bg-[#C8E600] text-black" : "bg-[#EE43DE] text-white"}`}
              onPress={() => handleAnalyze(s3_link, visibility[0], users)}
            >
              <span
                className={`w-max mx-2 ${theme === "dark" ? " text-black" : "text-white"}`}
              >
                Analyze for Errors
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
