import React, { memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    notifyErorr,
    notifySuccess,
} from '../../components/Alert/AlertComponents'

function AlertAuthStatus({ loginSuccess }) {
    const errLogin = useSelector(
        (state) => state.alert?.login?.message?.err?.payload.data,
    )
    const errSignUp = useSelector((state) => state?.alert?.register?.message)
    const SignUpSuccess = useSelector(
        (state) => state?.alert?.register?.messageSuccess,
    )

    if (errSignUp) {
        notifyErorr('Đăng ký không thành công!')
    }
    if (SignUpSuccess) {
        notifySuccess('Đăng ký thành công!')
    }

    if (
        loginSuccess &&
        loginSuccess.isSuccess !== false &&
        !errLogin &&
        !errSignUp
    ) {
        notifySuccess(loginSuccess?.message)
    }
    if (errLogin) {
        notifySuccess(errLogin)
    }

    return <></>
}

export default memo(AlertAuthStatus)
