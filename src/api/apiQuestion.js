import {
    clearScore,
    clearTime,
    completeQuizRoundTrue,
    getQuestionFailed,
    getQuestionSuccess,
    newResultQuizFailed,
    newResultQuizStart,
    newResultQuizSuccess,
} from '../redux/reducers/QuizSlice'

const getQuestionAndAnswers = async (currentUser, dispatch, axiosJWT) => {
    try {
        const res = await axiosJWT.get(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/questions/${currentUser?.detailUserInfomation?.grade}`,
            {
                headers: { token: `Bearer ${currentUser?.accessToken}` },
            },
        )
        dispatch(getQuestionSuccess(res.data))
    } catch (err) {
        dispatch(getQuestionFailed())
    }
}

const getResultQuiz = async (currentUser, dispatch, axiosJWT) => {
    try {
        const res = await axiosJWT.post(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/users/resultById/${currentUser._id}`,
            currentUser._id,
            {
                headers: { token: `Bearer ${currentUser?.accessToken}` },
            },
        )

        dispatch(completeQuizRoundTrue(res.data))
    } catch (err) {}
}
const createNewResultQuiz = async (currentUser, dispatch, axiosJWT, data) => {
    dispatch(newResultQuizStart())
    try {
        axiosJWT.post(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/users/result`,
            {
                userId: currentUser._id,
                isComplete: true,
                ...data,
            },
            {
                headers: { token: `Bearer ${currentUser?.accessToken}` },
            },
        )
        dispatch(newResultQuizSuccess())
        dispatch(completeQuizRoundTrue(currentUser?._id))
    } catch (err) {
        dispatch(newResultQuizFailed())
    }
}

export { getQuestionAndAnswers, createNewResultQuiz, getResultQuiz }
