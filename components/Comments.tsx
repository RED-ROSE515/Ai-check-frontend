import React, { useState } from "react";
import axios from "axios";
import { useTheme } from "next-themes";
import { Button, Card, Textarea, Image, Tooltip, Slider } from "@heroui/react";
import { useAuth } from "@/contexts/AuthContext";
import { TbReload } from "react-icons/tb";
interface User {
  id: string;
  noble_id: string;
  first_name: string;
  second_name: string;
  user_name: string;
  avatar: string;
}

interface Comment {
  id: string;
  user: User;
  description: string;
  count_like: number;
  count_comment: number;
  liked_me: boolean;
  created_at: string;
  updated_at: string;
}

interface CommentProps {
  comments: Comment[];
  postId: number;
  onCommentAdded: () => void;
}

const Comments = ({ comments, postId, onCommentAdded }: CommentProps) => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [newComment, setNewComment] = useState("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await axios.post(API_BASE_URL + "/post/comments", {
        parent_id: postId,
        parent_is_post: true,
        description: newComment,
        attached_links: [],
      });
      setNewComment("");
      onCommentAdded();
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  return (
    <div className="w-full mt-4 p-4">
      <div className="flex flex-row justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold">Comments</h2>
        <Button isIconOnly onPress={onCommentAdded}>
          <TbReload size={24} />
        </Button>
      </div>

      {/* Comment Form */}
      {isAuthenticated && (
        <form onSubmit={handleSubmitComment} className="mb-6">
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className={`w-full rounded-md border`}
            placeholder="Write a comment..."
            rows={3}
          />
          <Button type="submit" variant="ghost" className="mt-2 px-4 py-2 ">
            Post Comment
          </Button>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card
            key={comment.id}
            className={`p-4 rounded-lg ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <div className="flex items-center mb-2">
              {comment.user.avatar && (
                <div className="relative rounded-full overflow-hidden mr-3">
                  {/* <Image
                    src={comment.user.avatar}
                    alt={comment.user.user_name}
                    fill
                    className="object-cover"
                  /> */}
                  <Image
                    isBlurred
                    isZoomed
                    alt={comment.user.user_name}
                    className="object-cover"
                    width={40}
                    shadow="lg"
                    style={{ height: "40px", width: "40px" }}
                    src={comment.user.avatar}
                  />
                </div>
              )}
              <div className="flex flex-col">
                <span className="font-semibold">
                  {`${comment.user.first_name} ${comment.user.second_name}`}
                </span>
                <span className="text-xs text-gray-500">
                  @{comment.user.user_name}
                </span>
              </div>
              <span className="ml-auto text-sm text-gray-500">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm mt-2">{comment.description}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <button className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4"
                  fill={comment.liked_me ? "currentColor" : "none"}
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>{comment.count_like}</span>
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Comments;
