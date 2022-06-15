import { createSlice } from "@reduxjs/toolkit";



const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: {
            isSuccess: false,
            isError: false,
            isFetching: false,
            postsData: null
        },
        createPosts: {
            isFetching: false,
            isError: false,
            isSuccess: false
        },
        like: {
            isLike: false,
            isEmotion: false,
            userId: ''
        }
    },
    reducers: {
        getPostsStart: (state) => {
            state.posts.isFetching = true
        },
        getPostsSuccess: (state, action) => {
            state.posts.isFetching = false
            state.posts.postsData = action.payload
            state.posts.isSuccess = true
        },
        getPostsFalied: (state) => {
            state.posts.isFetching = false
            state.posts.isError = true

        },
        createPostsStart: (state) => {
            state.createPosts.isFetching = true
        },
        createPostsSuccess: (state) => {
            state.createPosts.isSuccess = true
            state.createPosts.isFetching = false

        },
        createPostsFalied: (state) => {
            state.createPosts.isError = false
            state.createPosts.isFetching = false

        },
        likeUpSuccess: (state, action) => {

            state.like.isLike = true
            state.like.isEmotion = true
            state.like.userId = action.payload

        },
        likeUpFailed: (state) => {

            state.like.isLike = false
            state.like.isEmotion = false
        }


    }
})

export const {
    getPostsStart,
    getPostsSuccess,
    getPostsFalied,
    createPostsStart,
    createPostsSuccess,
    createPostsFalied,
    likeUpSuccess,
    likeUpFailed
} = postsSlice.actions
export default postsSlice.reducer
