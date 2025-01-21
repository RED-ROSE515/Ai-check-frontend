"use client";

import axios, { AxiosProgressEvent, CancelTokenSource } from "axios";
import { useToast } from "../hooks/use-toast";
import {
  AudioWaveform,
  File,
  FileImage,
  FolderArchive,
  UploadCloud,
  Video,
  X,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "./ui/input";
import { Progress } from "./ui/progress";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/";

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

export interface ImageUploadProps {
  getPdfList: () => void;
  AnalyzePaper: (id: number) => void;
}

const FileUpload = ({ getPdfList, AnalyzePaper }: ImageUploadProps) => {
  const [currentFile, setCurrentFile] = useState<FileUploadProgress | null>(
    null
  );
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const getFileIconAndColor = (file: File) => {
    if (file.type.includes(FileTypes.Image)) {
      return {
        icon: <FileImage size={40} className={ImageColor.fillColor} />,
        color: ImageColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Pdf)) {
      return {
        icon: <File size={40} className={PdfColor.fillColor} />,
        color: PdfColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Audio)) {
      return {
        icon: <AudioWaveform size={40} className={AudioColor.fillColor} />,
        color: AudioColor.bgColor,
      };
    }

    if (file.type.includes(FileTypes.Video)) {
      return {
        icon: <Video size={40} className={VideoColor.fillColor} />,
        color: VideoColor.bgColor,
      };
    }

    return {
      icon: <FolderArchive size={40} className={OtherColor.fillColor} />,
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
    formData.append("title", file.name);

    try {
      const response = await axios.post(
        API_BASE_URL + "api/papers/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          cancelToken: cancelSource.token,
          onUploadProgress: (progressEvent) => {
            onUploadProgress(progressEvent, file, cancelSource);
          },
        }
      );
      toast({
        title: "Paper Upload",
        description: "Upload successful!",
      });
      AnalyzePaper(response.data.id);
      getPdfList();
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Upload cancelled");
        toast({
          title: "Paper Upload",
          description: "Upload cancelled",
        });
      } else {
        console.error("Upload failed:", error);
        toast({
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

  return (
    <div>
      <div>
        <label
          {...getRootProps()}
          className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-6 hover:bg-gray-100"
        >
          <div className="text-center">
            <div className="mx-auto max-w-min rounded-md border p-2">
              <UploadCloud size={20} />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              <span className="font-semibold">Drop a file</span>
            </p>
            <p className="text-xs text-gray-500">
              Click to upload a file &#40;file should be under 10 MB&#41;
            </p>
          </div>
        </label>
        <Input
          {...getInputProps()}
          id="dropzone-file"
          type="file"
          className="hidden"
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
                  value={currentFile.progress}
                  className={getFileIconAndColor(currentFile.file).color}
                />
              </div>
            </div>
            <button
              onClick={() => {
                if (currentFile.source)
                  currentFile.source.cancel("Upload cancelled");
                removeFile();
              }}
              className="hidden cursor-pointer items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {uploadedFile && (
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
              onClick={removeFile}
              className="hidden items-center justify-center bg-red-500 px-2 text-white transition-all group-hover:flex"
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
