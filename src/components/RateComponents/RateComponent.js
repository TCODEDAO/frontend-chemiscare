import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './RateComponent.css'
import { Link } from 'react-router-dom'
import { getResultQuiz } from '../../api/apiQuestion'
import { checkTokenSuccess } from '../../redux/reducers/AuthSlice'
import { createAxios } from '../../utils/axiosJWT'
import NavBarLearnPage from '../NavBar/NavBarLearnPage'

export default function RateComponent() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector((state) => state.auth?.login?.currentUser)
    const isCompleteId = useSelector(state => state.quiz?.completeQuizRound?.result)
    let isComplete
    let axiosJWT = createAxios(currentUser, dispatch, checkTokenSuccess)

    if (isCompleteId?.isComplete) {
        isComplete = true
    } else {
        isComplete = false
    }
    useEffect(() => {
        if (!currentUser) {
            navigate('/auth')
        }
        getResultQuiz(currentUser, dispatch, axiosJWT)

    }, [])
    return (
        <div className="pt-[140px] pb-[100px] bg-[#13161B] relative min-h-[100vh]">
            <NavBarLearnPage currentUser={currentUser}></NavBarLearnPage>
            <div className="max-w-[1092px] w-[100%] mx-auto flex contentWrapper">
                <div className="text-[#fff] bg-[#353945] px-[28px] py-[18px] rounded-[8px] option">
                    <div className="flex flex-col items-center">
                        <p className="font-bold text-[28px]">{currentUser?.fullName}</p>

                    </div>
                    <div className="pt-[18px]">
                        <span className="text-[18px] cursor-pointer">
                            <i className="pr-[10px] fa-solid fa-file-invoice"></i>
                            Tài khoản
                        </span>
                        <ul>
                            <li className="py-[10px] px-[20px] text-[15px] hover:text-[#d54253] cursor-pointer">
                                <i className="text-[14px] pr-[10px] fa-solid fa-chevron-right"></i>
                                Bảng xếp hạng tuần</li>
                            <li className="py-[10px] px-[20px] text-[15px] hover:text-[#d54253] cursor-pointer">
                                <i className="text-[14px] pr-[10px] fa-solid fa-chevron-right"></i>
                                Thông tin giáo dục</li>
                            <li className="py-[10px] px-[20px] text-[15px] hover:text-[#d54253] cursor-pointer">
                                <i className="text-[14px] pr-[10px] fa-solid fa-chevron-right"></i>
                                Bảo mật</li>
                        </ul>
                    </div>
                    <div className="pt-[18px]">
                        <span className="text-[18px] cursor-pointer">
                            <i className="pr-[10px] fa-solid fa-user"></i>
                            Học sinh
                        </span>
                        <ul>
                            <li className="py-[10px] px-[20px] text-[15px] hover:text-[#d54253] cursor-pointer">
                                <i className="text-[14px] pr-[10px] fa-solid fa-chevron-right"></i>
                                Tự luyện</li>
                            <li className="py-[10px] px-[20px] text-[15px] hover:text-[#d54253] cursor-pointer">
                                <i className="text-[14px] pr-[10px] fa-solid fa-chevron-right"></i>
                                Thi thử</li>
                            <li className="py-[10px] px-[20px] text-[15px] hover:text-[#d54253] cursor-pointer">
                                <i className="text-[14px] pr-[10px] fa-solid fa-chevron-right"></i>
                                Vòng đấu</li>
                        </ul>
                    </div>
                </div>
                <div className="grow ml-[18px] rank">
                    <div>
                        <p className="text-[#fafafa] text-[22px] font-bold">Xếp hạng qua các vòng thi của bạn:</p>
                        <div className="bg-white w-full px-[28px] py-[18px] rounded-[8px] mb-[18px]">
                            <p className="font-bold text-[24px] mb-[10px]">{currentUser?.fullName}</p>
                            <div>
                                <p className="py-[5px] flex justify-between">
                                    <span className="opacity-[0.6]">
                                        {currentUser?.detailUserInfomation?.location?.school}
                                    </span>
                                    <span className="font-semibold">Hạng: {Math.floor(Math.random() * 10)}/15</span>
                                </p>
                                <p className="py-[5px] flex justify-between">
                                    <span className="opacity-[0.6]">
                                        Thị xã Đông Triều
                                    </span>
                                    <span className="font-semibold">Hạng: {Math.floor(Math.random() * 20)}/29</span>
                                </p>
                                <p className="py-[5px] flex justify-between">
                                    <span className="opacity-[0.6]">
                                        Tỉnh Quảng Ninh
                                    </span>
                                    <span className="font-semibold">Hạng: {Math.floor(Math.random() * 80)}/81</span>
                                </p>
                                <p className="py-[5px] flex justify-between">
                                    <span className="opacity-[0.6]">
                                        Quốc gia
                                    </span>
                                    <span className="font-semibold">Hạng: {Math.floor(Math.random() * 100)}/306</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="text-[#fafafa] text-[22px] font-bold">Điểm qua các vòng thi của bạn:</p>
                        <div className="bg-white w-full px-[28px] py-[18px] rounded-[8px]">
                            <p className="font-bold text-[24px] mb-[10px]">{currentUser?.fullName}</p>
                            <div>
                                <p className="py-[5px] flex justify-between">
                                    <span className="opacity-[0.6]">
                                        Trường THCS An Sinh
                                    </span>
                                    <span className="font-semibold">Điểm:{Math.floor(Math.random() * 90)}/100</span>
                                </p>
                                <p className="py-[5px] flex justify-between">
                                    <span className="opacity-[0.6]">
                                        Thị xã Đông Triều
                                    </span>
                                    <span className="font-semibold">Điểm: {Math.floor(Math.random() * 900)}/1000</span>
                                </p>
                                <p className="py-[5px] flex justify-between">
                                    <span className="opacity-[0.6]">
                                        Tỉnh Quảng Ninh
                                    </span>
                                    <span className="font-semibold">Điểm: {Math.floor(Math.random() * 90)}/100</span>
                                </p>
                                <p className="py-[5px] flex justify-between">
                                    <span className="opacity-[0.6]">
                                        Quốc gia
                                    </span>
                                    <span className="font-semibold">Điểm: {Math.floor(Math.random() * 90)}/100</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="py-[20px] bg-[#16191f] absolute bottom-0 left-0 right-0 border-[#353945] border-t-[1px] text-[#777e90]">
                <div className="mx-auto max-w-[1092px] w-[100%] flex justify-between items-center contentFooter">
                    <span className="text-[14px] font-light">Copyright © 2022  - <a href="" className="underline">SownVipro</a> & <a href="" className="underline">TCODEDAO</a></span>
                    <span className="textFooterCenter"><span className="font-light">Sản phẩm thuộc</span> NHÓM HỌC SINH LỚP 8A TRƯỜNG THCS AN SINH</span>
                    <span className="flex justify-between socialFooter">
                        <a href="" className="pr-[8px]"><img className="w-[24px] h-[24px]" src="https://tek4.vn/icons/facebook-footer-icon.svg" alt="" /></a>
                        <a href="" className="px-[8px]"><img className="w-[24px] h-[24px]" src="https://tek4.vn/icons/twitter-footer-icon.svg" alt="" /></a>
                        <a href="" className="px-[8px]"><img className="w-[24px] h-[24px]" src="https://tek4.vn/icons/instagram-footer-icon.svg" alt="" /></a>
                        <a href="" className="px-[8px]"><i className="fa-brands fa-google-plus-g text-[24px]"></i></a>
                        <a href="" className="pl-[8px]"><i className="fa-brands fa-github text-[24px]"></i></a>
                    </span>
                </div>
            </div>
        </div>
    )
}
