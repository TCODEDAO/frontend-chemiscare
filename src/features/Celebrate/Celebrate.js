

import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
const NavBarLearnPage = lazy(() => import('../../components/NavBar/NavBarLearnPage'))

export default function Celebrate() {
    const currentUser = useSelector((state) => state.auth.login.currentUser)

    return (
        <>
            <div class="pt-[130px] pb-[90px] bg-[#13161B] relative min-h-[100vh] contentWrapper">
                <NavBarLearnPage currentUser={currentUser}></NavBarLearnPage>

                <div class="max-w-[1092px] w-[100%] mx-auto content">
                    <div class="text-[#fafafa]">
                        <div class="mb-[20px]">
                            <p>Bạn đang dự thi khối {currentUser?.detailUserInfomation?.grade.split(' ')[1]}</p>
                            <p>
                                <span class="font-bold opacity-[0.8]">Lưu ý:</span>
                                Bạn sẽ hoàn thành bài thi thử khi trả lời tất cả các câu hỏi trong đề thi
                            </p>
                        </div>
                        <div class="mb-[20px]">
                            <p class="font-bold opacity-[0.8]">Thể lệ các vòng thi chính thức:</p>
                            <ol class="list-disc">
                                <li>Học sinh bị mất tài khoản thi cấp trước đó có thể tạo tài khoản mới để thi cấp
                                    tiếp theo nhưng phải thông báo với Hội đồng thi của cấp đó và được Hội đồng thi cấp
                                    trước (nếu có) xác nhận</li>
                                <li>Tại các vòng thi chính thức, học sinh chỉ được dùng một tài khoản để đăng
                                    nhập</li>
                                <li>Học sinh không được sử dụng bất kỳ tài liệu tham khảo nào trong các vòng thi
                                    chính thức của cuộc thi.
                                </li>
                                <li>Học sinh có thể ra khỏi phòng thi nhưng vẫn ở trong khu vực tổ chức thi nếu
                                    hoàn thành bài thi sớm hơn thời gian quy định của vòng thi chính thức</li>
                            </ol>
                        </div>
                        <div class="">
                            <p class="font-bold opacity-[0.8]">Các trường hợp phạm luật:</p>
                            <ol class="list-disc">
                                <li>Đăng nhập một tài khoản trên hai máy hoặc hai trình duyệt khác nhau và thi cùng một thời điểm</li>
                                <li>Đang làm bài thi mà tải lại trang đề thi hoặc thoát ra không nộp bài</li>
                                <li>Mở nhiều cửa sổ vào thi một lúc</li>
                                <li>Các trường hợp vi phạm sẽ bị hệ thống tự động thoát ra ngoài và tính một lần trượt vòng thi</li>
                            </ol>
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
        </>

    )
}
