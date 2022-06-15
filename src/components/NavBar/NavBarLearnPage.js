import React, { memo } from 'react'
import Avatar from '../AvatarComponent/AvatarComponent'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logOutUser } from '../../api/apiAuth'
import { logOutSuccess } from '../../redux/reducers/AuthSlice'
import { createAxios } from '../../utils/axiosJWT'
import { notifyErorr, notifyInfo, notifySuccess } from '../Alert/AlertComponents'

function NavBarLearnPage({ currentUser }) {
    const accessToken = currentUser?.accessToken
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const axiosJWT = createAxios(currentUser, dispatch, logOutSuccess)
    const id = currentUser?._id
    const handleLogOut = async () => {



        try {
            logOutUser(dispatch, navigate, accessToken, axiosJWT, id)
            notifySuccess('Đăng xuất thành công!')
        } catch {
            notifyErorr('Đăng xuất không thành công!')
        }
        return
    }
    const devFeature = () => {
        notifyInfo('Tính năng đang được phát triển!')
    }
    return (
        // <div className="fixed h-[96px] bg-[#1f232b] top-0 left-0 right-0 z-[999]">
        //     <div className="max-w-[1092px] w-[100%] h-full flex items-center justify-around mx-auto">
        //         <Link to="/" className="flex items-center">
        //             <i className="fa-solid fa-atom text-[40px] text-white mr-1"></i>
        //             <span className="font-bold text-[36px] text-white">
        //                 Chemiscare
        //             </span>
        //         </Link>
        //         <ul className="flex justify-center grow">
        //             <li className="">
        //                 <a
        //                     className="p-4 text-[18px] text-[#868991] hover:text-[#d54253]"
        //                     href="# "
        //                 >
        //                     <span className="">Diễn Đàng</span>
        //                 </a>
        //             </li>
        //             <li className="">
        //                 <a
        //                     className="p-4 text-[18px] text-[#868991] hover:text-[#d54253]"
        //                     href="# "
        //                 >
        //                     <span className="">Lịch Thi</span>
        //                 </a>
        //             </li>
        //             <li className="">
        //                 <a
        //                     className="p-4 text-[18px] text-[#868991] hover:text-[#d54253]"
        //                     href="# "
        //                 >
        //                     <span className="">Thể Lệ</span>
        //                 </a>
        //             </li>
        //             <li className="">
        //                 <a
        //                     className="p-4 text-[18px] text-[#868991] hover:text-[#d54253]"
        //                     href="# "
        //                 >
        //                     <span className="">Xếp Hạng</span>
        //                 </a>
        //             </li>
        //             <li className="">
        //                 <a
        //                     className="p-4 text-[18px] text-[#868991] hover:text-[#d54253]"
        //                     href="# "
        //                 >
        //                     <span className="">Hỏi Đáp</span>
        //                 </a>
        //             </li>
        //         </ul>
        //         <div className="flex items-center">
        //             <i className="fa-solid fa-magnifying-glass text-[#868991] px-5 py-5 cursor-pointer hover:text-[#d54253] text-[18px]"></i>
        //             {/* <!-- <span className="cursor-pointer px-5 text-[18px] text-[#868991] hover:text-[#d54253]">Đăng nhập</span> */}
        //             {/* <span className="cursor-pointer px-5 py-[10px] text-[18px] text-[#000] rounded-[9px] bg-white hover:bg-[#fafafa]">Đăng ký</span> --> */}
        //             <div className="text-white relative cursor-pointer w-[40px] h-[40px] ml-5 bg-[#B8BCC6] rounded-[50%] text-[22px] items-center justify-center flex hover:bg-[#D44253]  avt">
        //                 {/* {<Avatar
        //                     size="50px"
        //                     round="50%"
        //                     textSizeRatio={1.75}
        //                     name={currentUser?.username}
        //                 ></Avatar>} */}
        //                 <Avatar
        //                     name={currentUser?.fullName}
        //                     size="50px"
        //                 ></Avatar>

        //                 <span className="hidden">S</span>
        //                 <ul className="absolute top_100-8 min-w-[200px] bg-[#3D4048] right-0 text-[18px] px-8 text-white py-4 font-normal rounded-[9px] hidden z-10">
        //                     <li className="flex py-2 border-b-[1px] border-[#51535a] border-solid items-center">
        //                         <div>
        //                             <span className="cursor-pointer w-[40px] h-[40px] bg-[#D44253] rounded-[50%] text-[22px] items-center justify-center flex font-light mr-1">
        //                                 <span className="hidden">S</span>
        //                                 <Avatar
        //                                     name={currentUser?.fullName}
        //                                     size="40px"
        //                                 ></Avatar>
        //                             </span>
        //                         </div>
        //                         <span className="leading-[20px] text-[16px]">
        //                             <span className="hover:text-[#d54253]">
        //                                 {currentUser?.fullName}
        //                             </span>
        //                             {/* <span className="cursor-text text-[12px] text-[#868991] overflow-hidden block max-w-[200px] min-w-[150px]">@gmail.com</span> */}
        //                         </span>
        //                     </li>

        //                     <li className="py-2 hover:text-[#d54253]">
        //                         Lịch sử
        //                     </li>
        //                     <li className="py-2 hover:text-[#d54253] border-b-[1px] border-[#51535a] border-solid">
        //                         Xếp hạng của tôi
        //                     </li>

        //                     <li
        //                         className="py-2 hover:text-[#d54253]"
        //                         onClick={handleLogOut}
        //                     >
        //                         Đăng xuất
        //                     </li>
        //                 </ul>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="fixed h-[96px] bg-[#1f232b] top-0 left-0 right-0 z-[9]">
            <div className="max-w-[1092px] w-[100%] h-full flex items-center justify-between mx-auto">
                <Link to="/" className="flex items-center">
                    <i className="fa-solid fa-atom text-[40px] text-white mr-1 logoIcon"></i>
                    <span className="font-bold text-[36px] text-white logoName ml-1">
                        Chemiscare
                    </span>
                </Link>
                <ul className="flex justify-center grow nav">
                    <li className="" >
                        <Link
                            className="p-4 text-[18px] text-[#868991] hover:text-[#d54253]"
                            to="/forum"
                        >
                            <i className="fa-solid fa-file-lines"></i>
                            <span className="">Diễn Đàn</span>
                        </Link>
                    </li>
                    <li className="">
                        <Link
                            className="p-4 text-[18px] text-[#868991] hover:text-[#d54253]"
                            to="/celebrate"
                        >
                            <i className="fa-solid fa-calendar"></i>
                            <span className="">Lịch Thi</span>
                        </Link>
                    </li>
                    <li className="" >
                        <Link
                            className="p-4 text-[18px] text-[#868991] hover:text-[#d54253]"
                            to="/rules"
                        >
                            <i className="fa-solid fa-scale-balanced"></i>
                            <span className="">Thể Lệ</span>
                        </Link>
                    </li>
                    <Link to="/learn/rate" className=" hover:text-[#d54253]">
                        <i className="fa-solid fa-ranking-star text-[18px] text-[#868991]"></i>
                        <span className="text-[#868991]   text-[18px]">Xếp Hạng</span>
                    </Link>
                    <li className="" onClick={devFeature}>
                        <a
                            className="p-4 text-[18px] text-[#868991] hover:text-[#d54253]"
                            href="# "
                        >
                            <i className="fa-solid fa-circle-question"></i>
                            <span className="">Hỏi Đáp</span>
                        </a>
                    </li>
                </ul>
                <div className="flex items-center">
                    <i className="fa-solid fa-magnifying-glass text-[#868991] px-5 py-5 cursor-pointer hover:text-[#d54253] text-[18px] searchIcon"></i>
                    <div className="relative navIcon hidden">
                        <i className="fa-solid fa-bars text-[30px]  hover:text-[#d54253] text-[#868991]"></i>
                        <ul className="justify-between grow absolute top-[100%] right-1 flex-col bg-[#3d4048] text-white rounded-[4px] hidden">
                            <li className="w-[200px]" >
                                <Link
                                    className="px-6 block py-4 boder-bot hover:text-[#d54253]"
                                    to="/forum"
                                >
                                    <i className="text-[18px] fa-solid fa-house"></i>
                                    <span className="text-sm text-[16px] pl-1">
                                        Diễn Đàn
                                    </span>
                                </Link>
                            </li>
                            <li className="w-[200px]" >
                                <Link
                                    className="px-6 block py-4 boder-bot hover:text-[#d54253]"
                                    to="/learn/rate"
                                >
                                    <i className="text-[18px] fa-solid fa-ranking-star  "></i>
                                    <span className="text-sm text-[16px] pl-1">
                                        Xếp Hạng
                                    </span>
                                </Link>
                            </li>
                            <li className="w-[200px]">
                                <Link
                                    className="px-6 block py-4 boder-bot hover:text-[#d54253]"
                                    to="/celebrate"
                                >
                                    <span className="text-sm text-[16px]">
                                        <i className="text-[18px] fa-solid fa-calendar  "></i>
                                        <span className='pl-1'>Lịch Thi</span>
                                    </span>
                                </Link>
                            </li>
                            <li className="w-[200px]" >
                                <Link
                                    className="px-6 block py-4 boder-bot hover:text-[#d54253]"
                                    to='/rules'
                                >
                                    <i className="text-[18px] fa-solid fa-scale-balanced"></i>
                                    <span className="text-sm text-[16px] pl-1">
                                        Thể Lệ
                                    </span>
                                </Link>
                            </li>
                            <li className="w-[200px]" onClick={devFeature}>
                                <a
                                    className="px-6 block py-4 hover:text-[#d54253]"
                                    href="# "
                                >
                                    <i className="text-[18px] fa-solid fa-circle-question"></i>
                                    <span className="text-sm text-[16px] pl-1">
                                        Hỏi Đáp
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    {/* <!-- <span className="cursor-pointer px-5 text-[18px] text-[#868991] hover:text-[#d54253]">Đăng nhập</span> */}
                    {/* <span className="cursor-pointer px-5 py-[10px] text-[18px] text-[#000] rounded-[9px] bg-white hover:bg-[#fafafa]">Đăng ký</span> --> */}
                    <div className="text-white relative cursor-pointer w-[40px] h-[40px] ml-5 bg-[#B8BCC6] rounded-[50%] text-[22px] items-center justify-center flex hover:bg-[#D44253]  avt">
                        <Avatar
                            size="50px"
                            round="50%"
                            textSizeRatio={1.75}
                            name={currentUser?.fullName}
                        ></Avatar>
                        <ul className="absolute top_100-8 min-w-[200px] bg-[#3D4048] right-0 text-[18px] px-8 text-white py-4 font-normal rounded-[9px] hidden z-10">
                            <li className="flex py-2 border-b-[1px] border-[#51535a] border-solid items-center">
                                <div>
                                    <span className="cursor-pointer w-[40px] h-[40px] bg-[#D44253] rounded-[50%] text-[22px] items-center justify-center flex font-light mr-1">
                                        <span className="hidden">S</span>
                                        <Avatar
                                            name={currentUser?.fullName}
                                            size="40px"
                                        ></Avatar>
                                    </span>
                                </div>
                                <span className="leading-[20px] text-[16px]">
                                    <span className="hover:text-[#d54253]">
                                        {currentUser?.fullName}
                                    </span>
                                    {/* <span className="cursor-text text-[12px] text-[#868991] overflow-hidden block max-w-[200px] min-w-[150px]">@gmail.com</span> */}
                                </span>
                            </li>

                            <li className="py-2 hover:text-[#d54253]" onClick={devFeature}>
                                Lịch sử
                            </li>
                            <li className="py-2 hover:text-[#d54253] border-b-[1px] border-[#51535a] border-solid">
                                <Link to="/learn/rate">Xếp hạng của tôi</Link>
                            </li>

                            <li
                                className="py-2 hover:text-[#d54253]"
                                onClick={handleLogOut}
                            >
                                Đăng xuất
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(NavBarLearnPage)
