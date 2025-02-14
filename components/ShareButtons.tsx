import React, { useState } from "react";
import _ from "lodash";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Snippet,
  useDisclosure,
} from "@heroui/react";
import dynamic from "next/dynamic";

const TbCloudShare = dynamic(
  () => import("react-icons/tb").then((mod) => mod.TbCloudShare),
  { ssr: false }
);
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <Button
        isIconOnly
        className="capitalize"
        variant="ghost"
        onPress={onOpen}
      >
        <TbCloudShare size={24} />
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose} radius="lg">
        <ModalContent>
          <ModalHeader>Share</ModalHeader>
          <ModalBody>
            <div className="flex space-x-4 mt-4 mb-2 items-center justify-center">
              <FacebookShareButton url={url} title={title}>
                <button
                  aria-label="Facebook"
                  className="bg-blue-600 p-3 rounded-lg"
                >
                  <FaFacebook />
                </button>
              </FacebookShareButton>
              <TwitterShareButton url={url} title={title}>
                <button
                  aria-label="Twitter"
                  className="bg-blue-400 p-3 rounded-lg"
                >
                  <FaTwitter />
                </button>
              </TwitterShareButton>
              <LinkedinShareButton url={url} title={title} summary={summary}>
                <button
                  aria-label="LinkedIn"
                  className="bg-blue-700 p-3 rounded-lg"
                >
                  <FaLinkedin />
                </button>
              </LinkedinShareButton>
              <TelegramShareButton url={url} title={title}>
                <button
                  aria-label="Telegram"
                  className="bg-blue-500  p-3 rounded-lg"
                >
                  <FaTelegram />
                </button>
              </TelegramShareButton>
              <WhatsappShareButton url={url} title={title}>
                <button
                  aria-label="WhatsApp"
                  className="bg-green-500 p-3 rounded-lg"
                >
                  <FaWhatsapp />
                </button>
              </WhatsappShareButton>
            </div>
            <span className="w-full">Or share with link</span>
            <Snippet variant="shadow" hideSymbol>
              {_.truncate(url, {
                length: 45,
                omission: "...",
              })}
            </Snippet>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ShareButtons;
