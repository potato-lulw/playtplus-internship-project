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
    createdAt: string;
    updatedAt: string;
}

export interface PostData {
    message: string,
    posts: Post[]
}
export interface LikeData {
    message: string,
    post: {likes: string[], dislikes: string[]}
}

const postApiSlice = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllPosts: builder.query<Post[], void>({
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

    }),
});

export const { useGetAllPostsQuery, useGetPostsByUserIdQuery, useLikePostMutation, useDislikePostMutation } = postApiSlice;