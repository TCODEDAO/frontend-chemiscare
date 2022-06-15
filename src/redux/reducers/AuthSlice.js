import { createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
        logout: {
            isFetching: false,
            error: false,
        },
        token: {
            isSuccess: false,
            isFetching: false,
        },
        detail: {
            isSuccess: false,
            isError: false,
        },
        round: {
            currentRound: 1,
            maxRound: 3,
            userId: ''
        }
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser = action.payload
            state.login.error = false
        },
        loginFailed: (state) => {
            state.login.error = true
            state.login.isFetching = false
        },
        registerStart: (state) => {
            state.register.isFetching = true
            state.register.success = false
        },
        registerSuccess: (state) => {
            state.register.isFetching = false
            state.register.success = true
            state.register.error = false
        },
        registerFailed: (state) => {
            state.register.error = true
            state.register.success = false
            state.register.isFetching = false
        },

        logOutStart: (state) => {
            state.logout.isFetching = true
            storage.removeItem('persist:root')
        },
        logOutSuccess: (state) => {
            state.logout.isFetching = false
            state.login.currentUser = null
            state.logout.error = false
        },
        logOutFailed: (state) => {
            state.logout.error = true
            state.logout.isFetching = false
        },
        checkTokenSuccess: (state) => {
            state.token.isSuccess = true
        },
        updateDetailInfoSuccess: (state) => {
            state.detail.isSuccess = true
        },
        updateDetailInfoFailed: (state) => {
            state.detail.isError = true
        },
        nextRound: (state, action) => {

            state.round.currentRound = state.round.currentRound + 1
            state.round.userId = action.payload
        }
    },
})

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed,
    checkTokenSuccess,
    updateDetailInfoSuccess,
    updateDetailInfoFailed,
    nextRound
} = authSlice.actions
export default authSlice.reducer
