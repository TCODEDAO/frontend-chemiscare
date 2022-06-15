import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './RuleComponent.css'
import NavBarLearnPage from '../../components/NavBar/NavBarLearnPage'
export default function RuleComponent() {
    const navigate = useNavigate()
    const currentUser = useSelector((state) => state?.auth?.login?.currentUser)
    useEffect(() => {
        if (!currentUser) {
            navigate('/auth')
        }
    }, [])
    return (

        <div class="pt-[130px] pb-[100px] bg-[#13161B] relative min-h-[100vh]">
            <NavBarLearnPage currentUser={currentUser}></NavBarLearnPage>
            <div class="max-w-[1092px] w-[100%] mx-auto">
                <div class="flex justify-between flex-wrap">
                    <div class="boardWrapper w-[100%] boardTest">
                        <p class="text-white font-bold text-2xl leading-5 mb-[20px]">Lịch thi dành cho học sinh lớp  {currentUser?.detailUserInfomation?.grade.split(' ')[1]}</p>
                        <div class="boardMain w-[100%]">
                            <div class="flex text-white mb-[4px] board_header">
                                <div class="w-[50%] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Vòng thi</div>
                                <div class="w-[50%] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Ngày thi</div>
                            </div>
                            <div>
                                <div class="flex text-[#111827] boardBody">
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 1</div>
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 25/5</div>
                                </div>
                                <div class="flex text-[#111827] boardBody">
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 2</div>
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 30/5</div>
                                </div>
                                <div class="flex text-[#111827] boardBody">
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 3</div>
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 5/6</div>
                                </div>
                                <div class="flex text-[#111827] boardBody">
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 4</div>
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 10/6</div>
                                </div>
                                <div class="flex text-[#111827] boardBody">
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 5</div>
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 15/6</div>
                                </div>
                                <div class="flex text-[#111827] boardBody">
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 6</div>
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 20/6</div>
                                </div>
                                <div class="flex text-[#111827] boardBody">
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 7</div>
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 25/6</div>
                                </div>
                                <div class="flex text-[#111827] boardBody">
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Vòng 8</div>
                                    <div class="flex items-center justify-center w-[50%] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">Ngày 30/6</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-[20px] bg-[#16191f] absolute bottom-0 left-0 right-0 border-[#353945] border-t-[1px] text-[#777e90]">
                <div class="mx-auto max-w-[1092px] w-[100%] flex justify-between items-center contentFooter">
                    <span class="text-[14px] font-light">Copyright © 2022  - <a href="" class="underline">SownVipro</a> & <a href="" class="underline">TCODEDAO</a></span>
                    <span class="textFooterCenter"><span class="font-light">Sản phẩm thuộc</span> NHÓM HỌC SINH LỚP 8A TRƯỜNG THCS AN SINH</span>
                    <span class="flex justify-between socialFooter">
                        <a href="" class="pr-[8px]"><img class="w-[24px] h-[24px]" src="https://tek4.vn/icons/facebook-footer-icon.svg" alt="" /></a>
                        <a href="" class="px-[8px]"><img class="w-[24px] h-[24px]" src="https://tek4.vn/icons/twitter-footer-icon.svg" alt="" /></a>
                        <a href="" class="px-[8px]"><img class="w-[24px] h-[24px]" src="https://tek4.vn/icons/instagram-footer-icon.svg" alt="" /></a>
                        <a href="" class="px-[8px]"><i class="fa-brands fa-google-plus-g text-[24px]"></i></a>
                        <a href="" class="pl-[8px]"><i class="fa-brands fa-github text-[24px]"></i></a>
                    </span>
                </div>
            </div>
        </div>
    )
}
