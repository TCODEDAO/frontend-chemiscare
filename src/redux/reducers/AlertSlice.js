import { createSlice } from '@reduxjs/toolkit'

const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        login: {
            isSuccess: false,
            isError: false,
            isWarn: false,
            message: null,
        },
        register: {
            isSuccess: false,
            isError: false,
            isWarn: false,
            message: null,
            messageSuccess: null,
        },
        learnPage: {
            isWarn: false,
            isSuccess: false,
            isError: false,
            isInfo: false,
            message: null,
        },
        load: {
            isLoading: false,
        },
    },
    reducers: {
        loginFailedAlert: (state, payload) => {
            state.login.isSuccess = false
            state.login.isError = true
            state.login.message = payload
            state.register.messageSuccess = null
            state.register.message = null
        },
        loginSuccessAlert: (state, action) => {
            state.login.isSuccess = true
            state.login.isError = false
            state.login.message = action.payload
            state.register.messageSuccess = null
            state.register.message = null
        },
        errorAlert: (state, action) => {
            state.login.isSuccess = false
            state.login.isError = true
            state.login.message = action.payload
        },
        loginRequireLearnPage: (state, action) => {
            state.learnPage.message = action.payload
            state.learnPage.isInfo = true
        },
        registerSuccessAlert: (state) => {
            state.register.isSuccess = true
            state.register.isError = false
            state.register.isWarn = false
            state.register.messageSuccess = 'Đăng ký thành công!'
            state.register.message = null
        },
        registerFailedAlert: (state) => {
            state.register.isSuccess = false
            state.register.isError = true
            state.register.message = 'Đăng ký không thành công!'
            state.register.messageSuccess = null
        },
        setLoading: (state) => {
            state.load.isLoading = true
        },
        setNotLoading: (state) => {
            state.load.isLoading = false
        },
    },
})
export const {
    loginFailedAlert,
    loginSuccessAlert,
    errorAlert,
    loginRequireLearnPage,
    registerSuccessAlert,
    registerFailedAlert,
    fixRegisterAlert,
} = alertSlice.actions
export default alertSlice.reducer
