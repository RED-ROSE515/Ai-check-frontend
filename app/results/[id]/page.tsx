"use client";
import React, { useState, useEffect, use } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import axios from "axios";
import {
  Spinner,
  Button,
  Badge,
  Card,
  CardBody,
  Avatar,
  Link,
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

const ResultPage = ({ params }: any) => {
  const resolvedParams = use(params);
  const { id } = resolvedParams as any;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const [pageTitle, setPageTitle] = useState("AI Error Detector Result: ");
  const [pageDescription, setpageDescription] = useState(
    "Check out this AI error detection result: "
  );
  const [pageUrl, setPageUrl] = useState(`${API_BASE_URL}results/${id}`);
  const pageImage = "https:/nobleblocks.com/nerdbunny.png";
  const { theme } = useTheme();
  const [analysisResult, setAnalysisResult] = useState("");
  const [summary, setSummary] = useState<any>();
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [costdata, setCostData] = useState<any>({});
  const [totalSummary, setTotalSummary] = useState("");
  const [author, setAuthor] = useState<any>();
  const [postDate, setPostDate] = useState("");
  const [result, setResult] = useState<any>();
  const [comments, setComments] = useState<any>([]);
  const [link, setLink] = useState("");
  const [recentPapers, setRecentPapers] = useState<any>([]);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const getResultById = async (paperId: number) => {
    try {
      setAnalysisResult("");
      setSummaryLoading(true);
      const response = await api.get(`/post/${paperId}`);
      setResult(response.data);
      setAuthor(response.data.user);
      setSummary({
        ...JSON.parse(response.data.description),
        post_id: response.data.id,
        post_title: response.data.title,
        attached_links: response.data.attached_links,
      });
      const total_result = JSON.parse(response.data.ai_error_json);
      setAnalysisResult(total_result.paperAnalysis.analysis);
      setCostData({
        input_tokens: total_result.input_tokens,
        output_tokens: total_result.output_tokens,
        total_cost: total_result.total_cost,
      });
      setPostDate(response.data.updated_at);
      setTotalSummary(total_result.paperAnalysis.summary);
      const resp = await api.get(
        `/post/comments?parent_is_post=true&parent_id=${response.data.id}&start=0&limit=1000`
      );
      setComments(resp.data);
      setLink(
        "/results/" +
          response.data.title
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .toLowerCase()
            .split(" ")
            .join("-") +
          "_" +
          response.data.id +
          "/"
      );
      setSummaryLoading(false);
      setPageTitle(`AI Error Detector Result: ${response.data.title}`);
      setpageDescription(
        `Check out this AI error detection result: ${summary.child + summary.college + summary.phd}`
      );
      setPageUrl(`${API_BASE_URL}results/${id}`);
      // const result = await res.json();
      const result = { data: "KKK", title: id, description: "Description" };
      return result;
    } catch (error) {
      // Handle network or other errors
      // console.error("Error fetching result:", error);
      return null;
    }
  };

  const like = async (post_id: string, liked_me: boolean) => {
    try {
      await api.post(`/post/${liked_me ? "unlike" : "like"}/post`, { post_id });
      toast({
        title: "Success",
        description: "Successfully like the post.",
      });
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

  useEffect(() => {
    const fetchData = async () => {
      const newId = id.split("_")[1];
      const response = await axios.get(
        `${API_BASE_URL}/post/pagination?post_type=6&start=0&limit=5`
      );
      setRecentPapers(response.data.data);
      await getResultById(newId);
    };
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={pageImage} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content={pageImage} />
      </Head>
      <div className="flex flex-row justify-center mt-16">
        {summary && (
          <div className="w-full md:w-5/6 flex flex-row">
            <div
              className={`card w-full md:w-4/5 mb-8 flex flex-col items-center justify-center rounded border-2 shadow-md ${theme === "dark" ? "bg-[#1f2a37]" : "bg-[#EEEEEEF0]"}`}
            >
              <div className="flex flex-col items-center justify-center rounded-md p-0 md:flex-row md:p-2 w-full">
                {summaryLoading && <Spinner className="my-4" color="primary" />}
                {summary && (
                  <SummaryWrapper
                    summary={summary}
                    isResult={true}
                    link={
                      "/results/" +
                      summary.post_title
                        .replace(/[^a-zA-Z0-9\s]/g, "")
                        .toLowerCase()
                        .split(" ")
                        .join("-") +
                      "_" +
                      summary.post_id +
                      "/"
                    }
                    userData={{ ...author }}
                    postDate={postDate}
                    input_tokens={costdata.input_tokens}
                    output_tokens={costdata.output_tokens}
                    total_cost={costdata.total_cost}
                  />
                )}
              </div>

              {analysisResult && (
                <div className="mb-0 sm:mb-2 w-full">
                  <SpecialSummary summary={totalSummary} />
                  <div
                    className={
                      "flex flex-col items-center justify-center rounded-md p-0 md:flex-row"
                    }
                  >
                    <AnalysisResult
                      results={analysisResult}
                      total_summary={totalSummary}
                    />
                  </div>
                </div>
              )}
              <div className="flex items-center justify-start gap-4 w-full px-4 py-2 mt-2">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  color={result.liked_me ? "warning" : "default"}
                  isDisabled={!isAuthenticated}
                  onPress={() => like(result.id, result.liked_me)}
                >
                  <TbThumbUp size={24} />
                  <span>{result.count_like || 0}</span>
                </Button>

                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  isDisabled={!isAuthenticated}
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
                <ShareButtons url={DOMAIN + link} title={summary.post_title} />
              </div>
              <Comments
                comments={comments}
                setComments={(data: any) => setComments(data)}
                postId={summary.post_id}
                onCommentAdded={refreshComments}
              />
            </div>
            <div className="ml-4 hidden md:flex flex-col gap-2 w-full">
              <span className="font-bold text-xl mb-2">
                Recently Checked Papers
              </span>
              {recentPapers.map((paper: any, index: number) => {
                return (
                  <Link
                    key={index}
                    href={
                      "/results/" +
                      paper.title
                        .replace(/[^a-zA-Z0-9\s]/g, "")
                        .toLowerCase()
                        .split(" ")
                        .join("-") +
                      "_" +
                      paper.id +
                      "/"
                    }
                  >
                    <Card
                      isHoverable
                      shadow="sm"
                      className="cursor-pointer w-full"
                    >
                      <CardBody>
                        <div className="flex flex-row justify-start items-center w-full">
                          <Avatar
                            isBordered
                            radius="full"
                            size="sm"
                            src={paper.user.avatar}
                          />
                          <p className="ml-2">
                            {_.truncate(paper.title, {
                              length: 27,
                              omission: "...",
                            })}
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
      <div className="fixed bottom-12 right-5">
        <Badge
          color="warning"
          content={result?.count_comment || 0}
          variant="flat"
        >
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
        </Badge>
      </div>
    </>
  );
};

export default ResultPage;
