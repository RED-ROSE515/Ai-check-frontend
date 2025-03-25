import ReactMarkdown from "react-markdown";

const ErrorContent = ({ content }: { content?: string }) => {
  return (
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
      {content}
    </ReactMarkdown>
  );
};

export default ErrorContent;
