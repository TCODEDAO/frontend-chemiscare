import axios from 'axios'
import {
    loginFailed,
    loginStart,
    loginSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
    logOutFailed,
    logOutStart,
    logOutSuccess,
    updateDetailInfoSuccess,
    updateDetailInfoFailed,
} from '../redux/reducers/AuthSlice'
import {
    loginSuccessAlert,
    loginFailedAlert,
    registerSuccessAlert,
    registerFailedAlert,
    loginRequireLearnPage,
} from '../redux/reducers/AlertSlice'

const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart())
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/auth/login`,
            user,
        )
        dispatch(loginSuccess(res.data))
        dispatch(loginSuccessAlert('Đăng nhập thành công!'))
        navigate('/learn')
    } catch (err) {
        dispatch(loginFailed())
        dispatch(loginFailedAlert(err))
    }
}
const registerUser = async (user, dispatch) => {
    dispatch(registerStart())
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/auth/register`,
            user,
        )
        dispatch(registerSuccess())
        dispatch(registerSuccessAlert())
    } catch (err) {
        dispatch(registerFailed())
        dispatch(registerFailedAlert('Đăng ký không thành công!'))
    }
}
const logOutUser = async (dispatch, navigate, accessToken, axiosJWT, id) => {
    dispatch(logOutStart())
    try {
        await axiosJWT.post(
            `${process.env.REACT_APP_URL_API_REQUEST}/api/v1/auth/logout`,
            id,
            {
                headers: { token: `Bearer ${accessToken}` },
            },
        )

        await dispatch(logOutSuccess())
        navigate('/')
    } catch (err) {
        dispatch(logOutFailed())
    }
}
const detailUserInfomation = async (
    dispatch,
    navigate,
    accessToken,
    axiosJWT,
    id,
    data,
) => {
    try {
        const res = await axiosJWT.post(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/auth/detailUser`, {
            userId: id,
            ...data
        }, {
            headers: { token: `Bearer ${accessToken}` },

        })

        await axiosJWT.put(`${process.env.REACT_APP_URL_API_REQUEST}/api/v1/auth/userDetailUpdate`, {
            detailId: res.data.detailId,
            userId: id
        }, { headers: { token: `Bearer ${accessToken}` } })
        // dispatch(updateDetailInfoSuccess())
        dispatch(loginRequireLearnPage('Vui lòng đăng nhập lại để hoàn thành cập nhật thông tin!'))
        navigate('/auth')
    } catch (err) {
        dispatch(loginRequireLearnPage('Có lỗi xảy ra, xin hãy thử đăng nhập lại!'))
        navigate('/auth')

        // dispatch(updateDetailInfoFailed())
    }
}
export { registerUser, loginUser, logOutUser, detailUserInfomation }
