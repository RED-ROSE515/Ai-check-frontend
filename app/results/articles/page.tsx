"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
} from "@heroui/react";
import { Pagination } from "@heroui/react";
import api from "@/utils/api";
// import Pusher from "pusher-js";
import { useTheme } from "next-themes";
import LeftSider from "@/components/LeftSider";
import { usePagination } from "@/contexts/PaginationContext";
import { TbThumbUp, TbMessage, TbEye } from "react-icons/tb";
import { PostCommentBox } from "@/components/Comments";
import { useToast } from "@/hooks/use-toast";
import { ShinyButton } from "@/components/ui/shiny-button";
import ShareButtons from "@/components/ShareButtons";
import { useAuth } from "@/contexts/AuthContext";
import SignInDialog from "@/components/SignInDialog";
import { usePostActions } from "@/hooks/usePostActions";
import Loader from "@/components/Loader";
import type { Metadata } from "next";
import { AnimatePresence, motion } from "framer-motion";
import { useSpeech } from "@/contexts/SpeechContext";
import SpeechPlayer from "@/components/SpeechPlayer";
import { usePathname } from "next/navigation";
import ArticleWrapper from "@/components/ArticleWrapper";
import { useArticleSearch } from "@/contexts/ArticleSearchContext";
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
  const [isMounted, setIsMounted] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [postId, setPostId] = useState("");
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const { speechUrl, showSpeech } = useSpeech();
  const { theme } = useTheme();
  const triggerUploadRef: TriggerRefType = useRef(null);
  const User = false;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { loading, totalResults, setTotalResults, totalCount } =
    useArticleSearch(); // Add this

  const { page, totalPage, setPage, setTotalPage } = usePagination();
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

  useEffect(() => {
    setTotalPage(Math.ceil(totalCount / 3));
  }, [totalCount]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <section className="w-full min-h-[80vh]">
      <div
        className={`w-full flex flex-col justify-center items-center ${theme === "dark" ? "bg-black" : "bg-white"}`}
      >
        <div className={`flex flex-row justify-center mb-8`}>
          <span className="md:pt-[60px] text-2xl md:text-5xl md:font-semibold text-center max-w-[75%] md:max-w-[80%] text-balance">
            Generate summaries and articles for Research Papers Effortlessly
          </span>
        </div>
      </div>
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
      <div
        className={`flex flex-col md:flex-row items-start justify-center  gap-4 ${theme === "dark" ? "bg-black" : "bg-white"}`}
      >
        {User && (
          <div className="w-full md:w-1/6">
            <LeftSider onUpload={() => triggerUploadRef.current?.()} />
          </div>
        )}
        <title>
          NerdBunny - AI Discrepancies Detection for Research Papers
        </title>
        <meta
          name="description"
          content="NerdBunny is a DeSci AI agent that detects errors in research papers, makes complex studies easier to understand, and adds a fun meme culture to science. 🧬🐇"
        />

        <div className="mt-4 w-full md:w-[1100px] items-center flex flex-col justify-center">
          <SignInDialog
            isOpen={showSignIn}
            onClose={() => setShowSignIn(false)}
          />
          <div className="w-full items-center px-2">
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
            <div className="flex flex-col gap-[36px] mt-15">
              {loading ? (
                <Loader />
              ) : totalResults.length > 0 ? (
                <React.Fragment>
                  {totalResults.map((result: any, index) => {
                    return (
                      <div
                        key={index}
                        className={`card flex flex-col items-center justify-center rounded-2xl shadow-md w-full ${theme === "dark" ? "bg-[#1f2a37]" : "bg-[#F7F7F7]"}`}
                      >
                        <div className="flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-2 w-full">
                          {result?.description &&
                            result?.description[0] === "{" && (
                              <ArticleWrapper
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
                                link={DOMAIN + "/results/articles/" + result.id}
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
                            onPress={() => {
                              if (isAuthenticated) {
                                setPostId(result.id);
                                onOpen();
                              } else {
                                showSignInModal(
                                  "You need to sign in to continue."
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
                            url={DOMAIN + "/results/articles/" + result.id}
                            title={result.title}
                            // summary={result.summary.child}
                          />
                        </div>
                        <div className="flex flex-row justify-center w-full mb-3">
                          <ShinyButton
                            className={`mr-2 mb-2 ${theme === "dark" ? "bg-[#C8E600]" : "bg-[#EE43DE]"}`}
                            onClick={() =>
                              (window.location.href =
                                "/results/articles/" + result.id)
                            }
                          >
                            <strong
                              className={`${theme === "dark" ? "text-black" : "text-white"} font-bold`}
                            >
                              {"Read full report  ➜"}
                            </strong>
                          </ShinyButton>
                        </div>
                      </div>
                    );
                  })}
                </React.Fragment>
              ) : (
                <div className="w-full flex flex-row justify-center">
                  <strong className="text-lg md:text-4xl">
                    Nothing to show!
                  </strong>
                </div>
              )}
              <div className="order-1 md:order-2 w-full flex justify-center mb-2">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  initialPage={1}
                  page={page}
                  total={totalPage}
                  onChange={(newPage) => setPage(newPage)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
