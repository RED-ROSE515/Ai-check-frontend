"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Tabs,
  Tab,
  Badge,
} from "@heroui/react";

import api from "@/utils/api";
import Pusher from "pusher-js";
import { useTheme } from "next-themes";
import LeftSider from "../components/LeftSider";
import StatisticCard from "../components/StatisticCard";
import SummaryWrapper from "../components/SummaryWrapper";
import { usePagination } from "@/contexts/PaginationContext";
import { TbThumbUp, TbMessage, TbEye } from "react-icons/tb";
import { PostCommentBox } from "@/components/Comments";
import { useToast } from "@/hooks/use-toast";
import { Chip } from "@heroui/chip";
import { ShinyButton } from "@/components/ui/shiny-button";
import ShareButtons from "@/components/ShareButtons";
import { useAuth } from "@/contexts/AuthContext";
import SignInDialog from "@/components/SignInDialog";
import { usePostActions } from "@/hooks/usePostActions";
import Loader from "@/components/Loader";
import { sleep } from "@/components/file-upload";

import { useRouter } from "next/navigation";

import Cookies from "js-cookie";
import type { Metadata } from "next";

const metadata: Metadata = {
  title: "AI-Powered Research Paper Error Detection",
  description:
    "Upload your research paper and get instant AI-powered analysis. Detect errors, receive suggestions, and improve your academic writing with NerdBunny.",
  alternates: {
    canonical: "https://nerdbunny.com",
  },
};

type TriggerRefType = {
  current: (() => void) | null;
};

export default function Home() {
  const { page, setTotalPage } = usePagination();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("desc");
  const [showSignIn, setShowSignIn] = useState(false);
  const [postId, setPostId] = useState("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;

  const { theme } = useTheme();
  const triggerUploadRef: TriggerRefType = useRef(null);
  const User = false;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const getTotalResults = async () => {
    try {
      setLoading(true);
      // const response = await axios.get(
      //   `${API_BASE_URL}api/papers/get_analyzed_results/?page=${page}&sort_by=${sortBy}&order=${order}`
      // );
      const response = await api.get(
        `/post/pagination?post_type=6&start=${(page - 1) * 3}&limit=3`
      );

      setTotalResults(response.data.data);
      setTotalPage(Math.ceil(response.data.total_count / 3));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Analysis Data",
        description: "Uh, oh! Something went wrong!" + { error },
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const mainElement = document.getElementById("main");
      mainElement?.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      await getTotalResults();
    };
    fetchData();
  }, [page, sortBy]);

  const like = async (post_id: string, liked_me: boolean) => {
    try {
      await api.post(`/post/${liked_me ? "unlike" : "like"}/post`, { post_id });

      setTotalResults((totalResults: any) =>
        totalResults.map((paper: any) =>
          paper.id === post_id
            ? {
                ...paper,
                liked_me: !paper.liked_me,
                count_like: paper.liked_me
                  ? paper.count_like - 1
                  : paper.count_like + 1,
              }
            : paper
        )
      );
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Uh, oh! Something went wrong!" + { error },
      });
    }
  };
  const reportPost = async (id: string, reported_me: boolean) => {
    try {
      const res = await handleReport(id, reported_me);
      res &&
        setTotalResults((totalResults: any) =>
          totalResults.map((paper: any) =>
            paper.id === id
              ? {
                  ...paper,
                  reported_me: !paper.reported_me,
                }
              : paper
          )
        );
    } catch (err) {
      console.log(err);
    }
  };
  const showSignInModal = async (action: string) => {
    toast({
      title: "Info",
      description: action,
    });
    setShowSignIn(true);
  };
  const { handleReport } = usePostActions({
    showSignInModal,
  });
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Initialize Pusher
  //       const response = await axios.get(
  //         API_BASE_URL + `api/papers/get_current_paper_status/`
  //       );
  //       if (response.data.paper === undefined || response.data.paper === null) {
  //         setStatus("The next paper will be analysed shortly...");
  //       } else {
  //         setStatus(`Processing :  ${response.data.paper}`);
  //       }

  //       const pusher = new Pusher("0d514904adb1d8e8521e", {
  //         cluster: "us3",
  //       });

  //       // Subscribe to the channel
  //       const channel = pusher.subscribe("my-channel");
  //       channel.bind("my-event", function (data: any) {
  //         setStatus(data.message);
  //         if (
  //           data.message ===
  //           "Paper Check finished. Next paper will be processed momentarily..."
  //         ) {
  //           getTotalResults();
  //         }
  //       });
  //     } catch (error) {
  //       console.error("Error fetching paper status:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // First, add a ref for the tabs container and a scroll amount state

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <section className="flex flex-col md:flex-row items-start justify-center gap-4">
      {User && (
        <div className="w-full md:w-1/6">
          <LeftSider onUpload={() => triggerUploadRef.current?.()} />
        </div>
      )}
      <title>NerdBunny - AI Error Detection for Research Papers</title>
      <meta
        name="description"
        content="NerdBunny is a DeSci AI agent that detects errors in research papers, makes complex studies easier to understand, and adds a fun meme culture to science. 🧬🐇"
      />

      <div className="mt-4 w-full md:w-5/6 items-center flex flex-col justify-center">
        {/* <div>
          <h1>OpenAI Response Preview</h1>
          <ReactMarkdown
            components={{
              h3: ({ children }) => (
                <h3 className="mb-2 mt-6 text-xl font-bold">{children}</h3>
              ),
              h4: ({ children }) => (
                <h4 className="mb-2 mt-4 text-lg font-semibold">{children}</h4>
              ),
              p: ({ children }) => <p className="mb-4">{children}</p>,
              ul: ({ children }) => (
                <ul className="mb-4 ml-6 list-disc">{children}</ul>
              ),
              li: ({ children }) => <li className="mb-2">{children}</li>,
              strong: ({ children }) => (
                <strong className="font-bold">{children}</strong>
              ),
              em: ({ children }) => <em className="italic">{children}</em>,
              hr: () => <hr className="my-6 border-gray-200" />,
            }}
          >
            {openAIResponse}
          </ReactMarkdown>
        </div> */}
        <div className="mx-auto grid w-full flex-row flex-wrap gap-6 p-4 md:p-12 md:px-36 justify-center md:pt-0">
          <StatisticCard setSortBy={setSortBy} setOrder={setOrder} />
        </div>
        <SignInDialog
          isOpen={showSignIn}
          onClose={() => setShowSignIn(false)}
        />
        <div className="w-full items-center">
          {status && (
            <Chip color="success" variant="bordered" radius="sm" size="lg">
              {status}
            </Chip>
          )}
          <Modal
            backdrop={"blur"}
            isOpen={isOpen}
            onClose={onClose}
            size={"2xl"}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <PostCommentBox
                      postId={postId}
                      onCommentAdded={() => {
                        setTotalResults((totalResults: any) =>
                          totalResults.map((paper: any) =>
                            paper.id === postId
                              ? {
                                  ...paper,
                                  count_comment: paper.count_comment + 1,
                                }
                              : paper
                          )
                        );
                        onClose();
                      }}
                    />
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>

          {loading ? (
            <Loader />
          ) : (
            totalResults.length > 0 &&
            totalResults.map((result: any, index) => {
              return (
                <div
                  key={index}
                  className={`card mb-8 md:mb-24 flex flex-col items-center justify-center rounded border-2 shadow-md w-full ${theme === "dark" ? "bg-[#1f2a37]" : "bg-[#EEEEEEF0]"}`}
                >
                  <div className="flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-2 w-full">
                    {result?.description && result?.description[0] === "{" && (
                      <SummaryWrapper
                        summary={JSON.parse(result.description)}
                        // input_tokens={result.input_tokens}
                        // output_tokens={result.output_tokens}
                        // total_cost={result.total_cost}
                        reportPost={() =>
                          reportPost(result.id, result.reported_me)
                        }
                        totalData={result}
                        userData={result.user}
                        showSignInModal={showSignInModal}
                        postDate={result.updated_at}
                        link={
                          DOMAIN +
                          "/results/" +
                          result.title
                            .replace(/[^a-zA-Z0-9\s]/g, "")
                            .toLowerCase()
                            .split(" ")
                            .join("-") +
                          "_" +
                          result.id +
                          "/"
                        }
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-start gap-4 w-full px-4 py-2">
                    <Button
                      variant="ghost"
                      color={result.liked_me ? "warning" : "default"}
                      className="flex items-center gap-2"
                      onPress={() =>
                        isAuthenticated
                          ? like(result.id, result.liked_me)
                          : showSignInModal(
                              "You need to Sign in first to like this post."
                            )
                      }
                    >
                      <TbThumbUp size={24} />
                      <span>{result.count_like || 0}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      className="flex items-center gap-2"
                      onPress={() => {
                        if (isAuthenticated) {
                          setPostId(result.id);
                          onOpen();
                        } else {
                          showSignInModal(
                            "You need to Sign in first to leave a comment."
                          );
                        }
                      }}
                    >
                      <TbMessage size={24} />
                      <span>{result.count_comment || 0}</span>
                    </Button>

                    <Button
                      variant="ghost"
                      className="flex items-center gap-2"
                      isDisabled
                    >
                      <TbEye size={24} />
                      <span>{result.count_view || 0}</span>
                    </Button>
                    <ShareButtons
                      url={
                        API_BASE_URL +
                        "/results/" +
                        result.title
                          .replace(/[^a-zA-Z0-9\s]/g, "")
                          .toLowerCase()
                          .split(" ")
                          .join("-") +
                        "_" +
                        result.id +
                        "/"
                      }
                      title={result.title}
                      // summary={result.summary.child}
                    />
                  </div>
                  <div className="flex flex-row justify-center w-full">
                    <ShinyButton
                      className={`mr-2 mb-2 ${theme === "dark" ? "bg-[#C8E600]" : "bg-[#EE43DE]"}`}
                      onClick={() =>
                        (window.location.href =
                          "/results/" +
                          result.title
                            .replace(/[^a-zA-Z0-9\s]/g, "")
                            .toLowerCase()
                            .split(" ")
                            .join("-") +
                          "_" +
                          result.id +
                          "/")
                      }
                    >
                      <strong
                        className={`${theme === "dark" ? "text-black" : "text-white"} font-bold`}
                      >
                        {"Read full report  ➜"}
                      </strong>
                    </ShinyButton>
                  </div>
                  {/* <div className="mb-0 sm:mb-2 w-full">
                      <SpecialSummary summary={result.paperAnalysis.summary} />
                      <div
                        className={
                          "flex flex-col items-center justify-center rounded-md p-0 md:flex-row"
                        }
                      >
                        {result.paperAnalysis?.analysis && (
                          <AnalysisResult
                            results={result.paperAnalysis.analysis}
                            total_summary={result.paperAnalysis.summary}
                          />
                        )}
                      </div>
                    </div> */}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
