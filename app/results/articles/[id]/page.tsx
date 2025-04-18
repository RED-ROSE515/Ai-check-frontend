"use client";
import React, { useState, useEffect, use, useCallback } from "react";
import { useTheme } from "next-themes";
import axios from "axios";
import {
  Button,
  Card,
  CardBody,
  Avatar,
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import api from "@/utils/api";
import { TbThumbUp, TbMessage, TbEye } from "react-icons/tb";
import _ from "lodash";
import SummaryWrapper from "@/components/SummaryWrapper";
import SpecialSummary from "@/components/SpecialSummary";
import AnalysisResult from "@/components/AnalysisResult";
import Comments from "@/components/Comments";
import ShareButtons from "@/components/ShareButtons";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import SignInDialog from "@/components/SignInDialog";
import { usePostActions } from "@/hooks/usePostActions";
import Loader from "@/components/Loader";
import { IoIosWarning } from "react-icons/io";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useSpeech } from "@/contexts/SpeechContext";
import SpeechPlayer from "@/components/SpeechPlayer";
import ArticleWrapper from "@/components/ArticleWrapper";
import { useAnalyze } from "@/contexts/AnalyzeContext";

const ResultPage = ({ params }: any) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams as any;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const pathName = usePathname();
  const [pageUrl, setPageUrl] = useState(
    `${API_BASE_URL}results/articles/${id}`
  );
  const { postId, setPostId } = useAnalyze();
  const { theme } = useTheme();
  const { showSpeech, speechUrl } = useSpeech();
  const [summary, setSummary] = useState<any>();
  const [isMounted, setIsMounted] = useState(false);
  const [costdata, setCostData] = useState<any>({});
  const [articleData, setArticleData] = useState<any>();
  const [author, setAuthor] = useState<any>();
  const [postDate, setPostDate] = useState("");
  const [result, setResult] = useState<any>();
  const [showSignIn, setShowSignIn] = useState(false);
  const [comments, setComments] = useState<any>([]);
  const [link, setLink] = useState("");
  const [recentPapers, setRecentPapers] = useState<any>([]);
  const [errorModal, setErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const router = useRouter();
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
  const getResultById = useCallback(
    async (paperId: number) => {
      try {
        const response = await api.get(`/post/${paperId}`);
        setResult(response.data);
        setAuthor(response.data.user);
        setSummary({
          ...JSON.parse(response.data.description),
          post_id: response.data.id,
          post_title: response.data.title,
          attached_links: response.data.attached_links,
        });
        const article_result = JSON.parse(response.data.ai_error_json);
        setArticleData({
          metadata: article_result.paperSummary.metadata,
          abstract: article_result.articleData.abstract,
          introduction: article_result.articleData.introduction,
          conclusion: article_result.articleData.conclusion,
          article: article_result.articleData.article,
          references: article_result.articleData.references,
        });
        const total_result = JSON.parse(response.data.ai_error_json);
        setCostData({
          input_tokens: total_result.input_tokens,
          output_tokens: total_result.output_tokens,
          total_cost: total_result.total_cost,
        });
        setPostDate(response.data.updated_at);
        const resp = await api.get(
          `/post/comments?parent_is_post=true&parent_id=${response.data.id}&start=0&limit=1000`
        );
        setComments(resp.data);
        setLink("/results/articles/" + response.data.id);
        setPageUrl(`${API_BASE_URL}results/articles/${id}`);
        // const result = await res.json();
        const result = { data: "KKK", title: id, description: "Description" };
        return result;
      } catch (error: any) {
        if (error.response?.status === 500) {
          setErrorMessage(error.response.data.message || "An error occurred");
          setErrorModal(true);
        }
        return null;
      }
    },
    [setErrorModal]
  );

  const like = async (post_id: string, liked_me: boolean) => {
    try {
      await api.post(`/post/${liked_me ? "unlike" : "like"}/post`, { post_id });

      setResult({
        ...result,
        liked_me: !result.liked_me,
        count_like: result.liked_me
          ? result.count_like - 1
          : result.count_like + 1,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Uh, oh! Something went wrong!" + { error },
      });
    }
  };

  const refreshComments = async () => {
    try {
      const resp = await api.get(
        `/post/comments?parent_is_post=true&parent_id=${summary.post_id}&start=0&limit=1000`
      );
      setComments(resp.data);
    } catch (error) {
      console.error("Error refreshing comments:", error);
    }
  };

  const reportPost = async () => {
    const res = await handleReport(result.id, result.reported_me);
    res && setResult({ ...result, reported_me: !result.reported_me });
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${API_BASE_URL}/post/pagination?post_type=6&start=0&limit=4&process_type=GenerateArticle`
      );
      setRecentPapers(response.data.data);
    };
    getResultById(id);
    fetchData();
  }, [id, getResultById]);

  useEffect(() => {
    if (pathName?.includes(postId)) {
      setPostId("");
    }
  }, [pathName]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={`${theme === "dark" ? "bg-transparent" : "bg-white"} min-h-[80vh] pt-2 md:pt-6 lg:pt-16`}
    >
      <div className="w-full fixed bottom-0 z-10">
        <AnimatePresence>
          {showSpeech && speechUrl && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full sm:px-12 mb-4 overflow-hidden"
            >
              <SpeechPlayer audio_url={speechUrl} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {!errorMessage && (
        <div
          className={`flex flex-row justify-center px-2 md:px-0 ${theme === "dark" ? "bg-transparent" : "bg-white"}`}
        >
          <SignInDialog
            isOpen={showSignIn}
            onClose={() => setShowSignIn(false)}
          />
          {summary && (
            <div className="w-full md:w-[1100px] flex flex-col xl:flex-row justify-center items-center xl:items-start">
              <div
                className={`card w-full md:w-3/4 mb-8 flex flex-col items-center justify-center gap-4`}
              >
                <div
                  className={`w-full rounded-xl border-none shadow-md ${theme === "dark" ? "bg-[#1f2a37]" : "bg-[#F7F7F7]"}`}
                >
                  {!summary ? (
                    <Loader />
                  ) : (
                    <div>
                      <ArticleWrapper
                        summary={summary}
                        isResult={true}
                        totalData={result}
                        link={DOMAIN + "/results/articles/" + summary.post_id}
                        showSignInModal={showSignInModal}
                        reportPost={reportPost}
                        userData={{ ...author }}
                        postDate={postDate}
                        input_tokens={costdata.input_tokens}
                        output_tokens={costdata.output_tokens}
                        total_cost={costdata.total_cost}
                        articleData={articleData}
                      />
                      <div
                        className={`rounded-xl w-full border-none ${theme === "dark" ? "bg-[#1f2a37]" : "bg-[#F7F7F7]"}`}
                      >
                        <div className="flex items-center justify-start gap-4 w-full px-4 py-2 mt-6">
                          <Button
                            variant="ghost"
                            className="flex items-center gap-2"
                            color={result?.liked_me ? "warning" : "default"}
                            // isDisabled={!isAuthenticated}
                            onPress={() =>
                              isAuthenticated
                                ? like(result.id, result.liked_me)
                                : showSignInModal(
                                    "You need to sign in to continue."
                                  )
                            }
                          >
                            <TbThumbUp size={24} />
                            <span>{result.count_like || 0}</span>
                          </Button>

                          <Button
                            variant="ghost"
                            className="flex items-center gap-2"
                            // isDisabled={!isAuthenticated}
                            onPress={() => console.log("Comments clicked")}
                          >
                            <TbMessage size={24} />
                            <span>{result.count_comment || 0}</span>
                          </Button>

                          <Button
                            variant="ghost"
                            className="flex items-center gap-2"
                            isDisabled={!isAuthenticated}
                            onPress={() => console.log("Views clicked")}
                          >
                            <TbEye size={24} />
                            <span>{result.count_view || 0}</span>
                          </Button>
                          <ShareButtons
                            url={DOMAIN + link}
                            title={summary.post_title}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={`w-full rounded-xl border-none shadow-md ${theme === "dark" ? "bg-[#1f2a37]" : "bg-[#EEEEEEF0]"}`}
                >
                  <Comments
                    comments={comments}
                    setComments={(data: any) => setComments(data)}
                    postId={summary.post_id}
                    onCommentAdded={refreshComments}
                    showSignInModal={showSignInModal}
                  />
                </div>
              </div>
              <div
                className={`ml-4 hidden md:w-1/4 md:flex flex-col gap-2 w-full h-fit overflow-hidden card rounded-xl p-2 ${theme === "dark" ? "bg-[#1f2a37]" : "bg-[#F7F7F7]"}`}
              >
                <span className="text-md mb-2 truncate ml-2">
                  Recently Checked Papers
                </span>
                {recentPapers.map((paper: any, index: number) => {
                  return (
                    <Link
                      key={index}
                      className="w-full"
                      href={"/results/articles/" + paper.id}
                    >
                      <Card
                        isHoverable
                        shadow="sm"
                        className={`cursor-pointer w-full ${theme === "dark" ? "bg-[#273340]" : "bg-[#FFF]"}`}
                      >
                        <CardBody>
                          <div className="flex flex-row justify-start items-center w-full max-w-full">
                            <div>
                              <Avatar
                                isBordered
                                radius="full"
                                size="sm"
                                src={paper.user.avatar}
                              />
                            </div>
                            <p className="ml-2 truncate w-full">
                              {paper.title}
                            </p>
                          </div>
                        </CardBody>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      <Modal
        isOpen={errorModal}
        onClose={() => {
          setErrorModal(false);
          router.push(DOMAIN + "");
        }}
      >
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalBody>
            <div>
              <span className="flex flex-row justify-center items-center">
                <IoIosWarning size={64} className="bg-warning rounded-lg" />
              </span>
              <span className="w-full flex flex-row justify-center">
                <strong className="text-xl text-center mt-2">
                  {errorMessage}
                </strong>
              </span>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="fixed bottom-12 right-5 z-50">
        <Button
          isIconOnly
          onPress={() => {
            const mainElement = document.getElementById("main");
            mainElement?.scrollTo({
              top: mainElement.scrollHeight,
              behavior: "smooth",
            });
          }}
        >
          <TbMessage size={24} />
        </Button>
        {/* </Badge> */}
      </div>
    </div>
  );
};

export default ResultPage;
