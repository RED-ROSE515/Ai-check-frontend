import api from "./api";

interface UserApiResponse {
  data: any; // TODO: Add proper type definition
}

export const userApis = {
  fetchUserProfile: async (userName: string): Promise<UserApiResponse> => {
    const response = await api.get(`/user/profile?user_id=${userName}`);
    return response;
  },

  followUser: async (userId: string, isFollowing: boolean) => {
    const endpoint = `/user/${isFollowing ? "unfollow" : "follow"}`;
    return await api.post(endpoint, {
      followed_id: userId,
    });
  },

  reportUser: async (userId: string, status: boolean) => {
    // TODO: Implement actual report endpoint
    return await api.post(`/user/report/${userId}`, {
      reported_id: userId,
      status: !status,
    });
  },
};

export const postApis = {
  reportPost: async (postId: string, status: boolean) => {
    // TODO: Implement actual report endpoint
    return await api.post(`/post/report/${postId}`, {
      post_id: postId,
      status: !status,
    });
  },
};
