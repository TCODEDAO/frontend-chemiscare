
import { notifyErorr, notifySuccess } from "../components/Alert/AlertComponents"
import { createPostsFalied, createPostsStart, createPostsSuccess, getPostsFalied, getPostsStart, getPostsSuccess, likeUpFailed, likeUpSuccess } from "../redux/reducers/PostsSlice"

const getAllPosts = async (dispatch, currentUser, axiosJWT) => {
    dispatch(getPostsStart())

    try {
        const res = await axiosJWT.get(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/posts`, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })
        dispatch(getPostsSuccess(res.data))
    } catch (err) {
        dispatch(getPostsFalied())
        notifyErorr('Lấy các bài viết không thành công, vui lòng tải lại trang!')
    }
}

const createPosts = async (dispatch, currentUser, axiosJWT, data) => {
    dispatch(createPostsStart())
    try {
        await axiosJWT.post(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/posts`, {
            authorId: currentUser._id,
            ...data
        }, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })
        dispatch(createPostsSuccess())
        notifySuccess('Thêm bài đăng thành công!')
    } catch (err) {
        dispatch(createPostsFalied())
        notifyErorr('Thêm bài đăng không thành công!')
    }

}
const upLikePosts = async (dispatch, currentUser, axiosJWT, currentPost) => {

    try {
        await axiosJWT.put(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/posts/${currentUser._id}`, {
            postId: currentPost._id,
            likes: currentPost.likes + 1
        }, {
            headers: { token: `Bearer ${currentUser?.accessToken}` },
        })

        dispatch(likeUpSuccess(currentUser._id))

    } catch (err) {
        dispatch(likeUpFailed())
    }
}
export { getAllPosts, createPosts, upLikePosts }