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
// const summary = {
//   phd: "This paper introduces VMLoc, an end-to-end deep neural network framework that enhances 6-DoF camera localization by leveraging multimodal data fusion, specifically integrating RGB images and depth/lidar data. Recognizing the limitations of naive fusion methods (e.g., simple concatenation), the authors propose a variational Product-of-Experts (PoE) model to learn a joint latent representation from multiple sensor modalities. This approach allows each modality to contribute its strengths while accounting for their different characteristics. To provide a tighter estimation of the evidence lower bound (ELBO) and improve modeling capacity, the framework incorporates an unbiased objective function based on importance weighting, mitigating training variance. The architecture also includes an attention mechanism to focus on task-relevant features. Extensive evaluations on the 7-Scenes and Oxford RobotCar datasets show that VMLoc outperforms existing methods, achieving higher accuracy in both position and orientation estimation. Ablation studies confirm the effectiveness of each component, including the PoE fusion module and the importance weighting strategy. The work contributes a robust methodology for multimodal variational inference in camera localization, with implications for improving the performance of autonomous systems in complex, dynamic environments. Future research could explore scaling the framework to additional modalities and further reducing computational overhead during training.",
//   child:
//     "This research introduces a new way to help devices like self-driving cars and drones know exactly where they are by using both images and depth information (like distance measurements). Imagine trying to find your way in a crowded, changing city\u2014it's much easier if you can use both your eyes and a map. Similarly, the researchers combined different types of data to make location finding more accurate and reliable, especially in places where the environment changes a lot. They created a system called VMLoc that teaches computers to use this combined information effectively. This helps make technologies like autonomous vehicles safer and more dependable because they can better understand their surroundings even when conditions are tough, like in bad weather or when the environment changes.",
//   college:
//     "The paper presents VMLoc, a novel deep learning framework designed for 6-DoF camera localization by effectively fusing multiple sensor modalities, specifically RGB images and depth data. Traditional single-modality localization methods often struggle in dynamic environments or under varying lighting conditions. VMLoc addresses this challenge by employing a variational Product-of-Experts (PoE) approach to merge latent representations from different modalities into a common latent space. Additionally, it introduces an unbiased objective function based on importance weighting to provide a tighter estimation of the evidence lower bound (ELBO) in variational inference. The framework incorporates attention mechanisms to focus on the most informative features relevant to pose estimation. Extensive experiments conducted on indoor and outdoor datasets, such as the 7-Scenes and Oxford RobotCar datasets, demonstrate that VMLoc outperforms existing state-of-the-art methods in terms of localization accuracy. The results validate the efficacy of the proposed multimodal fusion strategy and its robustness under corrupted input conditions.",
//   error:
//     "**Summary of Key Issues and Recommendations**\n\n*VMLoc: Importance Variational Multimodal Fusion for Localization* introduces an end-to-end deep learning framework aimed at enhancing 6-DoF camera localization by effectively fusing RGB images and depth/lidar data. The proposed method utilizes a variational Product-of-Experts model to learn joint latent representations, incorporates importance weighting for improved variational inference, and employs attention mechanisms to focus on task-relevant features. The goal is to improve the accuracy and robustness of camera localization in complex, dynamic environments.\n\n**Key Issues Identified**\n\n1. **Mathematical and Calculation Analysis**\n\n   - **Inappropriate Use of Paired t-test for Independent Samples**\n     - *Problem:* The authors used paired t-tests to compare flame retardant (FR) levels between different polymer types, assuming the samples were dependent when they were actually independent.\n     - *Implications:* This misuse of statistical tests can lead to invalid conclusions about differences in FR levels, potentially compromising the study's findings.\n\n2. **Methodological Issues**\n\n   - **Potential Selection Bias Due to Limiting Analysis to High Br Levels**\n     - *Problem:* The study focused on the 20 items with the highest bromine (Br) concentrations (>50 ppm) for detailed FR analysis.\n     - *Implications:* This selective sampling may overestimate the prevalence and concentration of FRs in black plastic products, reducing the generalizability of the results.\n\n3. **Data Analysis**\n\n   - **Substitution of Non-detects with Limit of Detection (LOD) Values**\n     - *Problem:* Non-detected FR values were replaced with the LOD in statistical analyses.\n     - *Implications:* This approach can bias the results by overestimating mean concentrations and underestimating variability, leading to inaccurate interpretations.\n\n   - **Insufficient Address of Low Recovery Rates for 13C6-2,4,6-TBP**\n     - *Problem:* Low recovery rates (51% and 57%) for the internal standard 13C6-2,4,6-TBP were not adequately discussed.\n     - *Implications:* The accuracy of quantifying 2,4,6-TBP may be compromised, affecting the reliability of the findings related to this compound.\n\n4. **Research Quality**\n\n   - **Limited External Validity Due to Sample Selection**\n     - *Problem:* By analyzing only items with high Br levels, the study may not represent all black plastic household products.\n     - *Implications:* The findings may not be applicable to products with lower Br concentrations, limiting the study's overall impact and applicability.\n\n**Recommendations for Improvement**\n\n- **Statistical Analysis Correction**\n  - Use independent samples t-tests instead of paired t-tests when comparing FR levels between different polymer types to ensure appropriate statistical analysis of independent samples.\n\n- **Addressing Selection Bias**\n  - Expand the FR analysis to include a more diverse and representative sample of products with varying Br concentrations to enhance the generalizability of the results.\n\n- **Improved Handling of Non-detects**\n  - Apply statistical methods suitable for censored data (e.g., Kaplan-Meier estimators, Tobit regression, or maximum likelihood estimation) to handle non-detects more accurately and reduce potential biases.\n\n- **Detailed Discussion of Recovery Rates**\n  - Provide a thorough discussion on the impact of low recovery rates for 13C6-2,4,6-TBP on the quantification process, and consider methodological adjustments to improve recovery rates and data accuracy.\n\n- **Enhancing External Validity**\n  - Include a wider range of black plastic products in the sample selection to ensure the study's findings are representative of the market and applicable to various real-world contexts.\n\nBy addressing these issues, the authors can strengthen the validity and reliability of their study, thereby enhancing its contribution to the field of camera localization and multimodal data fusion.",
// };

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [postId, setPostId] = useState("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const { speechUrl, showSpeech } = useSpeech();
  const { theme } = useTheme();
  const triggerUploadRef: TriggerRefType = useRef(null);
  const User = false;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const { loading, totalResults, setTotalResults } = useArticleSearch(); // Add this

  const { page, totalPage, setPage } = usePagination();
  const pathname = usePathname();
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
