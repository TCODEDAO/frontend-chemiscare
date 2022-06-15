import { createSlice } from '@reduxjs/toolkit'
const quizSlice = createSlice({
    name: 'quiz',
    initialState: {
        answer: {
            isCorrect: null,
        },
        score: {
            currentScore: 0,
        },
        question: {
            questionList: [],
            isSuccess: false,
            isError: false,
        },
        time: {
            counter: 0,
        },
        round: {
            roundCount: 1,
        },
        newResultQuiz: {
            isSuccess: false,
            isError: false,
            isFetching: false,
        },
        completeQuizRound: {
            result: null,
            result2: null,
            result3: null,
        },

    },
    reducers: {
        answerCorrect: (state) => {
            state.answer.isCorrect = true
        },
        scoreUp: (state) => {
            state.score.currentScore = state.score.currentScore + 10
        },

        getQuestionSuccess: (state, action) => {
            state.question.questionList = action.payload
            state.question.isSuccess = true
        },
        getQuestionFailed: (state) => {
            state.question.isError = true
        },
        upCounter: (state) => {
            state.time.counter = state.time.counter + 1
        },
        clearScore: (state) => {
            state.score.currentScore = 0
        },
        clearTime: (state) => {
            state.time.counter = 0
        },
        roundUp: (state) => {
            state.round.roundCount = state.round.roundCount + 1
        },
        newResultQuizStart: (state) => {
            state.newResultQuiz.isFetching = true
        },
        newResultQuizSuccess: (state) => {
            state.newResultQuiz.isSuccess = true
            state.newResultQuiz.isFetching = true
        },
        newResultQuizFailed: (state) => {
            state.newResultQuiz.isError = true
            state.newResultQuiz.isFetching = true
        },
        completeQuizRoundTrue: (state, action) => {
            state.completeQuizRound.result = action.payload
        },
        newResultQuizStart2: (state) => {
            state.completeQuizRound.isFetching = true
        },
        newResultQuizSuccess2: (state) => {
            state.completeQuizRound.isSuccess = true
            state.completeQuizRound.isFetching = true
        },
        newResultQuizFailed2: (state) => {
            state.completeQuizRound.isError = true
            state.completeQuizRound.isFetching = true
        },
        completeQuizRoundTrue2: (state, action) => {
            state.completeQuizRound.result2 = true
        },
        newResultQuizStart3: (state) => {
            state.newResultQuiz.isFetching = true
        },
        newResultQuizSuccess3: (state) => {
            state.newResultQuiz.isSuccess = true
            state.newResultQuiz.isFetching = true
        },
        newResultQuizFailed3: (state) => {
            state.newResultQuiz.isError = true
            state.newResultQuiz.isFetching = true
        },
        completeQuizRoundTrue3: (state, action) => {
            state.completeQuizRound.result3 = true
        },
    },
})
export const {
    clearScore,
    clearTime,
    answerCorrect,
    scoreUp,
    getQuestionSuccess,
    getQuestionFailed,
    upCounter,
    newResultQuizStart,
    newResultQuizFailed,
    newResultQuizSuccess,
    completeQuizRoundTrue,
    newResultQuizStart2,
    newResultQuizFailed2,
    newResultQuizSuccess2,
    completeQuizRoundTrue2,
    newResultQuizStart3,
    newResultQuizFailed3,
    newResultQuizSuccess3,
    completeQuizRoundTrue3,
} = quizSlice.actions
export default quizSlice.reducer
