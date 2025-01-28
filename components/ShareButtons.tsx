import React from "react";

import dynamic from "next/dynamic";

const FaFacebook = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaFacebook),
  { ssr: false }
);
const FaTwitter = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaTwitter),
  { ssr: false }
);
const FaLinkedin = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaLinkedin),
  { ssr: false }
);
const FaTelegram = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaTelegram),
  { ssr: false }
);
const FaWhatsapp = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaWhatsapp),
  { ssr: false }
);
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
const ShareButtons = ({ url, title, summary }: any) => {
  return (
    <div className="flex space-x-4 mt-4 mb-2">
      <FacebookShareButton url={url} title={title}>
        <button className="bg-blue-600 hidden sm:flex text-white p-0 sm:px-4 sm:py-2 rounded  items-center  sm:text-md sm:font-bold">
          <FaFacebook className="sm:mr-1" /> Share on Facebook
        </button>
        <button
          aria-label="Facebook"
          className="bg-blue-600 sm:hidden p-3 rounded-lg"
        >
          <FaFacebook />
        </button>
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <button className="bg-blue-400 text-white sm:px-4 sm:py-2 rounded hidden sm:flex items-center  sm:text-md sm:font-bold">
          <FaTwitter className="sm:mr-1" /> Share on Twitter
        </button>
        <button
          aria-label="Twitter"
          className="bg-blue-400 sm:hidden p-3 rounded-lg"
        >
          <FaTwitter />
        </button>
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title} summary={summary}>
        <button className="bg-blue-700 text-white sm:px-4 sm:py-2 rounded hidden sm:flex items-center  sm:text-md sm:font-bold">
          <FaLinkedin className="sm:mr-1" /> Share on LinkedIn
        </button>
        <button
          aria-label="LinkedIn"
          className="bg-blue-700 sm:hidden p-3 rounded-lg"
        >
          <FaLinkedin />
        </button>
      </LinkedinShareButton>
      <TelegramShareButton url={url} title={title}>
        <button className="bg-blue-500 text-white sm:px-4 sm:py-2 rounded hidden sm:flex items-center  sm:text-md sm:font-bold">
          <FaTelegram className="sm:mr-1" /> Share on Telegram
        </button>
        <button
          aria-label="Telegram"
          className="bg-blue-500 sm:hidden  p-3 rounded-lg"
        >
          <FaTelegram />
        </button>
      </TelegramShareButton>
      <WhatsappShareButton url={url} title={title}>
        <button className="bg-green-500 text-white sm:px-4 sm:py-2 rounded hidden sm:flex items-center sm:text-md sm:font-bold">
          <FaWhatsapp className="sm:mr-1" /> Share on WhatsApp
        </button>
        <button
          aria-label="WhatsApp"
          className="bg-green-500 sm:hidden p-3 rounded-lg"
        >
          <FaWhatsapp />
        </button>
      </WhatsappShareButton>
    </div>
  );
};

export default ShareButtons;
