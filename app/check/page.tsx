"use client";
import React, { useRef, useEffect, useState } from "react";
import { Spinner, Card } from "@heroui/react";
import FileUpload from "../../components/file-upload";
import { useTheme } from "next-themes";
import { useAnalyze } from "@/contexts/AnalyzeContext";
import { useAuth } from "@/contexts/AuthContext";
import SignInDialog from "@/components/SignInDialog";
import Loader from "@/components/Loader";
import { useRouter } from "next/navigation";

type TriggerRefType = {
  current: (() => void) | null;
};

export default function App() {
  const { theme } = useTheme();
  const { isChecking, handleAnalyze, postId, processType } = useAnalyze();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
  const triggerUploadRef: TriggerRefType = useRef(null);

  useEffect(() => {
    if (handleProtectedAction()) {
      setIsLoading(true);
      const accepted = localStorage.getItem("disclaimerAccepted");
      if (accepted === "true") {
        setHasAccepted(true);
        setShowDisclaimer(false);
      }
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (postId) {
      if (processType.includes("ResearchCheck")) {
        router.push(DOMAIN + "/results/discrepancies/" + postId);
      } else {
        router.push(DOMAIN + "/results/articles/" + postId);
      }
    }
  }, [postId]);
  const handleAccept = () => {
    setHasAccepted(true);
    setShowDisclaimer(false);
    localStorage.setItem("disclaimerAccepted", "true");
  };

  const handleDeny = () => {
    setHasAccepted(false);
    setShowDisclaimer(false);
  };

  const handleProtectedAction = () => {
    if (!isAuthenticated) {
      setShowSignIn(true);
      return false;
    }
    return true;
  };

  return (
    <div className="flex w-full flex-col items-center justify-start min-h-[80vh]">
      <SignInDialog isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
      {isLoading ? (
        <Spinner className="my-4" color="primary" />
      ) : (
        <>
          {showDisclaimer && isAuthenticated && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card
                className={`max-w-3xl p-6 rounded-lg  pt-8 ${theme === "dark" ? "bg-[#1C243E]" : "bg-[#fff]"}`}
              >
                <div
                  className={`${theme === "dark" ? "bg-[#0B1022]" : "bg-[#ddd]"} p-3 rounded-lg max-h-[80vh] overflow-y-auto`}
                >
                  <h2 className="text-2xl font-bold mb-4">
                    Disclaimer & Upload Guidelines for AI Discrepancies
                    Detection
                  </h2>
                  <div className="prose max-w-none mb-6 space-y-4">
                    <p>
                      By uploading a document to NobleBlocks.com or
                      NerdBunny.com, you agree to the following terms and
                      conditions. Our AI-powered system will analyze the
                      document for errors, and if set to public, other users may
                      interact with it by leaving comments, critiques, and
                      reactions.
                    </p>

                    <div>
                      <h3 className="text-lg font-semibold">
                        1. Acceptable Use & Content Responsibility
                      </h3>
                      <ul className="list-disc pl-6">
                        <li>
                          You must have the legal right to upload the document.
                          Do not upload copyrighted materials without proper
                          authorization.
                        </li>
                        <li>
                          No illegal, offensive, or unethical content is
                          allowed.
                        </li>
                        <li>
                          You are solely responsible for the content you upload
                          and any consequences resulting from its publication.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">
                        2. Privacy & Visibility
                      </h3>
                      <ul className="list-disc pl-6">
                        <li>
                          By default, you can choose privacy settings: Public,
                          Followers Only, Specific Users, or Private.
                        </li>
                        <li>
                          If set to Public, the document will be accessible to
                          all registered users for discussion, peer interaction,
                          and feedback.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">
                        3. Intellectual Property & Copyright
                      </h3>
                      <ul className="list-disc pl-6">
                        <li>
                          NobleBlocks and NerdBunny do not claim ownership of
                          uploaded content.
                        </li>
                        <li>
                          We reserve the right to remove any content flagged for
                          copyright infringement or legal violations.
                        </li>
                        <li>
                          If you believe your work has been uploaded without
                          permission, contact us at info@nobleblocks.com for
                          takedown requests.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">
                        4. AI Analysis & Accuracy
                      </h3>
                      <ul className="list-disc pl-6">
                        <li>
                          Our AI-powered tool provides error detection and
                          quality assessments, but it does not replace human
                          peer review.
                        </li>
                        <li>
                          AI-generated reports should be considered as advisory
                          and not as definitive evaluations of a document's
                          validity.
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">
                        5. Content Removal & Moderation
                      </h3>
                      <ul className="list-disc pl-6">
                        <li>
                          We reserve the right to moderate, flag, or remove
                          content that violates our terms.
                        </li>
                        <li>
                          Users found violating these guidelines may have their
                          accounts restricted or suspended.
                        </li>
                      </ul>
                    </div>

                    <p className="mt-4">
                      By proceeding with your upload, you confirm that you
                      understand and agree to these terms. For any inquiries,
                      contact info@nobleblocks.com.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={handleDeny}
                    className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black"
                  >
                    Deny
                  </button>
                  <button
                    onClick={handleAccept}
                    className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Accept
                  </button>
                </div>
              </Card>
            </div>
          )}

          <div className="w-full px-2 md:px-0 md:w-5/6 h-full md:mt-10">
            <div className="w-full items-start h-full">
              {hasAccepted ? (
                isChecking ? (
                  <Loader />
                ) : (
                  <FileUpload
                    getPdfList={() => {}}
                    onTriggerRef={triggerUploadRef}
                  />
                )
              ) : (
                !showDisclaimer && (
                  <div className="text-center p-4 border rounded">
                    <p>
                      You must accept the terms and conditions to upload files.
                    </p>
                    <button
                      onClick={() => setShowDisclaimer(true)}
                      className="mt-2 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      View Terms & Conditions
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
