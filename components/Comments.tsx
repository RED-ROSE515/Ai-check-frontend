import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button, Card, Textarea, Image, CardBody } from "@heroui/react";
import { useAuth } from "@/contexts/AuthContext";
import { formatTimestamp } from "./UserCard";
import { useToast } from "@/hooks/use-toast";
import api from "@/utils/api";
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
  setComments: any;
  postId: number;
  onCommentAdded: () => void;
  showSignInModal: any;
}

export const PostCommentBox = ({
  postId,
  onCommentAdded,
  showSignInModal,
}: any) => {
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showSignInModal("You need to Sign in first to leave a comment.");
      return;
    }
    if (!newComment.trim()) return;

    try {
      await api.post("/post/comment", {
        parent_id: postId,
        parent_is_post: true,
        description: newComment,
      });
      setNewComment("");
      onCommentAdded();
      toast({
        title: "Success",
        description: "Successfully post the new comment.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Uh, oh! Something went wrong!" + { error },
      });
    }
  };

  return (
    <form onSubmit={handleSubmitComment} className="">
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
  );
};

const Comments = ({
  comments,
  setComments,
  postId,
  onCommentAdded,
  showSignInModal,
}: CommentProps) => {
  const { theme } = useTheme();

  const { toast } = useToast();

  const like = async (comment_id: string, liked_me: boolean) => {
    try {
      await api.post(`/post/${liked_me ? "unlike" : "like"}/comment`, {
        comment_id,
      });
      toast({
        title: "Success",
        description: "Successfully like the comment.",
      });
      setComments((comments: any) =>
        comments.map((comment: any) =>
          comment.id === comment_id
            ? {
                ...comment,
                count_like: comment.liked_me
                  ? comment.count_like - 1
                  : comment.count_like + 1,
                liked_me: !comment.liked_me,
              }
            : comment
        )
      );
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Uh, oh! Something went wrong!" + { error },
      });
    }
  };
  return (
    <div className="w-full mt-4 p-4">
      <div className="flex flex-row justify-between mb-4 items-center">
        <h2 className="text-xl font-semibold">Comments</h2>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card
            key={comment.id}
            onPress={() => like(comment.id, comment.liked_me)}
            isPressable
            className={`p-4 rounded-lg w-full  ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <div className="flex items-center justify-start mb-2">
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
              <div className="flex flex-col justify-start items-start">
                <span className="font-semibold">
                  {`${comment.user.first_name} ${comment.user.second_name}`}
                </span>
                <span className="text-xs text-gray-500">
                  @{comment.user.user_name}
                </span>
              </div>
              <span className="ml-auto text-sm text-gray-500">
                {`Posted ` + formatTimestamp(comment.created_at)}
              </span>
            </div>
            <p className="text-sm mt-2 flex flex-1">{comment.description}</p>
            <div className="flex items-center mt-2 text-sm text-gray-500">
              <button
                className={`flex items-center space-x-1 border-2 p-1 rounded-md  ${comment.liked_me ? "bg-[#C8E600]" : ""}`}
              >
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
        {/* Comment Form */}
        <Card isBlurred>
          <CardBody>
            <PostCommentBox
              postId={postId}
              onCommentAdded={onCommentAdded}
              showSignInModal={showSignInModal}
            />
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Comments;
