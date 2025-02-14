import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX CSS for styling math equations

interface OpenAIResponsePreviewProps {
  response: string; // The API response as a string
}

const OpenAIResponsePreview: React.FC<OpenAIResponsePreviewProps> = ({
  response,
}) => {
  // Pre-process the response to properly format LaTeX equations
  const processedResponse = response.replace(
    /\((.*?)\)/g,
    (match, equation) => `$${equation}$`
  );

  return (
    // <div className="text-xl">
    //   <ReactMarkdown
    //     children={processedResponse}
    //     remarkPlugins={[remarkGfm, remarkMath]}
    //     rehypePlugins={[
    //       [rehypeKatex, { strict: false, output: "html", throwOnError: false }],
    //     ]}
    //     components={{
    //       // Customize rendering of specific elements if needed
    //       h1: ({ node, ...props }) => (
    //         <h1 style={{ color: "#333" }} {...props} />
    //       ),
    //       h2: ({ node, ...props }) => (
    //         <h2 style={{ color: "#555" }} {...props} />
    //       ),
    //       p: ({ node, ...props }) => (
    //         <p style={{ lineHeight: "1.6" }} {...props} />
    //       ),
    //     }}
    //   />
    // </div>
    <ReactMarkdown
      children={response}
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
    />
  );
};

export default OpenAIResponsePreview;
