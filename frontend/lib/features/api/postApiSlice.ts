import { api } from "./apiSlice";

const postsUrl = '/posts'

export interface Author {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
}

export interface Post {
    _id: string;
    text: string;
    image?: string;
    author: Author;
    likes: Author[];
    dislikes: Author[];
    comments: Comment[];
    createdAt: string;
    updatedAt: string;
}

export interface PostData {
    message: string,
    posts: Post[]
}
export interface LikeData {
    message: string,
    post: { likes: string[], dislikes: string[] }
}

export interface Comment {
    _id: string,
    text: string,
    author: Author,
    name: string,
    createdAt: string,
    updatedAt: string,
    postId: Post
}



const postApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosts: builder.query<{ message: string; posts: Post[] }, void>({
            query: () => ({
                url: `${postsUrl}/all`,
                method: 'GET',
                credentials: 'include',
            }),
        }),
        getPostsByUserId: builder.query<PostData, { id: string }>({
            query: ({ id }) => ({
                url: `${postsUrl}/${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),
        likePost: builder.mutation<LikeData, { postId: string; userId: string }>({
            query: ({ postId, userId }) => ({
                url: `${postsUrl}/like/${postId}`,
                method: "PUT",
                body: { likerId: userId },
                credentials: "include",
            }),
        }),
        dislikePost: builder.mutation<LikeData, { postId: string; userId: string }>({
            query: ({ postId, userId }) => ({
                url: `${postsUrl}/dislike/${postId}`,
                method: "PUT",
                body: { likerId: userId },
                credentials: "include",
            }),
        }),
        reportPost: builder.mutation({
            query: ({ id, reason }) => ({
                url: `/posts/${id}/report`,
                method: "POST",
                body: { reason },
                credentials: "include",
            }),
        }),
        createComment: builder.mutation<{message: string, comment: Comment}, { postId: string; text: string; parentId?: string }>({
            query: ({ postId, text, parentId }) => ({
                url: `/posts/${postId}/comments`,
                method: "POST",
                body: { text, parentId },
                credentials: "include",
            }),

        }),

    }),
    // overrideExisting: true, // Explicitly allow overriding
});

export const { useGetAllPostsQuery, useGetPostsByUserIdQuery, useLikePostMutation, useDislikePostMutation, useReportPostMutation, useCreateCommentMutation } = postApiSlice;