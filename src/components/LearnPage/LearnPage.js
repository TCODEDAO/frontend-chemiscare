import React, { useEffect, lazy } from 'react'
import './LearnPage.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginRequireLearnPage } from '../../redux/reducers/AlertSlice'
import { Helmet } from 'react-helmet'

//assets
import favicon from '../../assets/images/icons/learnFavicon.ico'
import { checkTokenSuccess, loginSuccess, nextRound } from '../../redux/reducers/AuthSlice'

//AxiosJWT
import { createAxios } from '../../utils/axiosJWT'
//Notify
import { notifyWelcome } from '../Alert/AlertComponents'
import { clearScore, clearTime, completeQuizRoundTrue2, completeQuizRoundTrue3, newResultQuizSuccess2 } from '../../redux/reducers/QuizSlice'
import { getResultQuiz } from '../../api/apiQuestion'

// Component
const HistoryComponentLearnPage = lazy(() =>
    import(
        '../../features/HistoryComponentLearnPage/HistoryComponentLearnPage'
    ),
)
const NavBarLearnPage = lazy(() => import('../NavBar/NavBarLearnPage'))
const HighScoreProvince = lazy(() =>
    import('../../features/HighScoreLeanPage/HighScoreProvince'),
)
const HighScoreCountry = lazy(() =>
    import('../../features/HighScoreLeanPage/HighScoreCountry'),
)

export default function LearnPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const score = useSelector(state => state.quiz.score.currentScore)
    const timePlay = useSelector(state => state.quiz.time.counter)
    const currentUser = useSelector((state) => state.auth.login.currentUser)


    let axiosJWT = createAxios(currentUser, dispatch, checkTokenSuccess)
    const isCompleteId = useSelector(state => state.quiz?.completeQuizRound?.result)
    let isComplete

    if (isCompleteId?.isComplete) {
        isComplete = true
    } else {
        isComplete = false
    }

    let isComplete2 = useSelector(state => state.quiz?.completeQuizRound.result2)
    let isComplete3 = useSelector(state => state.quiz?.completeQuizRound.result3)


    useEffect(() => {

        if (!currentUser) {
            navigate('/auth')
            dispatch(loginRequireLearnPage('Bạn cần đăng nhập để vào học!'))
            return
        }
        if (!currentUser.detailUserInfomation) {
            navigate('/auth/detail')
            dispatch(loginRequireLearnPage('Bạn cần thêm thông tin để vào học!'))
            return
        }
        getResultQuiz(currentUser, dispatch, axiosJWT)

        if (currentUser) {
            notifyWelcome(`Chào mừng bạn!`)
            return
        }
        let timeOut = setTimeout(() => {
            dispatch(clearTime())
            dispatch(clearScore())
        }, 3000)



        return () => {
            clearTimeout(timeOut)
        }
    }, [])

    return (
        <>
            <Helmet>
                <link rel="shortcut icon" href={favicon} type="image/x-icon" />
                <title>Học Tập</title>
            </Helmet>
            <div className="py-[60px] bg-[#13161B] mt-[86px] relative min-h-[100vh]">
                <NavBarLearnPage currentUser={currentUser}></NavBarLearnPage>
                <div className="max-w-[1092px] w-[100%] mx-auto">
                    <div className="flex justify-between flex-wrap mb-[100px]">
                        <div className="boardWrapper">
                            <div className="boardMain">
                                <p className="text-white font-bold text-2xl leading-5 mb-[20px]">Đề thi dành cho học sinh lớp {currentUser?.detailUserInfomation?.grade.split(" ")[1]}</p>
                                <div className="flex text-white mb-[4px] board_header">
                                    <div className="w-[140px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem serial">STT</div>
                                    <div className="w-[200px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Bài Thi</div>
                                    <div className="w-[140px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Lần Thi</div>
                                    <div className="w-[140px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Điểm</div>
                                    <div className="w-[180px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Giờ</div>
                                </div>
                                <div>
                                    <div className="flex text-[#111827] boardBody">
                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem serial  ">1</div>
                                        <div className="flex items-center justify-center w-[200px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">
                                            {isComplete ? <button className="bg-[#3f3f46] text-white disabled:opacity-25 rounded-md examButton " disabled>Bạn đã hoàn thành bài 1, vui lòng chờ bài mới.</button> : <button className="bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButton" onClick={() => {
                                                navigate('/learn/start')
                                            }}>Làm bài 1 </button>}
                                            {isComplete ? <button className="bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButtonInMobile hidden fixHidenMoblie" disabled>Bạn đã hoàn thành bài 1, vui lòng chờ bài mới.</button> : <button className="examButtonInMobile hidden bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButton fixHidenMoblie" onClick={() => {
                                                navigate('/learn/start')
                                            }}>Làm </button>}

                                        </div>

                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">{isComplete && 1}</div>
                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">{isComplete && 100}</div>
                                        <div className="flex items-center justify-center w-[180px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">{isComplete && timePlay}</div>
                                    </div>

                                    <div className="flex text-[#111827] boardBody">
                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem serial  ">2</div>
                                        <div className="flex items-center justify-center w-[200px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">
                                            {isComplete2 ? <button className="bg-[#3f3f46] text-white disabled:opacity-25 rounded-md examButton " disabled>Bạn đã hoàn thành bài 2, vui lòng chờ bài mới.</button> : <button className="bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButton" onClick={() => {
                                                navigate('/learn/start')
                                                dispatch(completeQuizRoundTrue2())
                                                isComplete2 = true
                                            }}>Làm bài 2</button>}
                                            {isComplete2 ? <button className="bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButtonInMobile hidden fixHidenMoblie" disabled>Bạn đã hoàn thành bài 2, vui lòng chờ bài mới.</button> : <button className="examButtonInMobile hidden bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButton fixHidenMoblie" onClick={() => {
                                                navigate('/learn/start')
                                                dispatch(completeQuizRoundTrue2())
                                                isComplete2 = true

                                            }}>Làm </button>}

                                        </div>

                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">{isComplete && 1}</div>
                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">{isComplete && 100}</div>
                                        <div className="flex items-center justify-center w-[180px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">{isComplete && timePlay}</div>
                                    </div>

                                    <div className="flex text-[#111827] boardBody">
                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem serial  rounded-bl-[12px]">1</div>
                                        <div className="flex items-center justify-center w-[200px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">
                                            {isComplete3 ? <button className="bg-[#3f3f46] text-white disabled:opacity-25 rounded-md examButton " disabled>Bạn đã hoàn thành bài 3, vui lòng chờ bài mới.</button> : <button className="bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButton" onClick={() => {
                                                navigate('/learn/start')
                                                dispatch(completeQuizRoundTrue3())

                                            }}>Làm bài 3 </button>}
                                            {isComplete3 ? <button className="bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButtonInMobile hidden fixHidenMoblie" disabled>Bạn đã hoàn thành bài 1, vui lòng chờ bài mới.</button> : <button className="examButtonInMobile hidden bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButton fixHidenMoblie" onClick={() => {
                                                navigate('/learn/start')
                                                dispatch(completeQuizRoundTrue3())

                                            }}>Làm </button>}

                                        </div>

                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">{isComplete && 1}</div>
                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">{isComplete && 100}</div>
                                        <div className="flex items-center justify-center w-[180px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem rounded-br-[12px]">{isComplete && timePlay}</div>
                                    </div>
                                    <div className="flex text-[#111827] boardBody">
                                    </div>

                                </div>
                            </div>
                            <div className="mt-[40px] boardMain">
                                <p className="text-white font-bold text-2xl leading-5 mb-[20px]">Lịch sử thi các vòng</p>
                                <div className="flex text-white mb-[4px] board_header">
                                    <div className="w-[140px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem serial">STT</div>
                                    <div className="w-[200px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Vòng</div>
                                    <div className="w-[140px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Lần thi</div>
                                    <div className="w-[140px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">giờ</div>
                                    <div className="w-[180px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">điểm</div>
                                </div>
                                <div>
                                    <div className="flex text-[#111827] boardBody ">
                                        {isComplete && <> <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem serial">1</div>
                                            <div className="flex items-center justify-center w-[200px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">1</div>
                                            <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">1</div>
                                            <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">{timePlay}</div>
                                            <div className="flex items-center justify-center w-[180px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">{score}</div></>}

                                    </div>
                                    <div className="flex text-[#111827] boardBody ">
                                        {isComplete2 && <> <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem serial">1</div>
                                            <div className="flex items-center justify-center w-[200px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">1</div>
                                            <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">1</div>
                                            <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">{timePlay}</div>
                                            <div className="flex items-center justify-center w-[180px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">{score}</div></>}

                                    </div>
                                    <div className="flex text-[#111827] boardBody ">
                                        {isComplete3 && <> <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem serial">1</div>
                                            <div className="flex items-center justify-center w-[200px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">1</div>
                                            <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">1</div>
                                            <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">{timePlay}</div>
                                            <div className="flex items-center justify-center w-[180px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">{score}</div></>}

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="boardWrapper boardWrapperRank">
                            <div className="boardRank">
                                <p className="text-white font-bold text-2xl leading-5 mb-[20px]">Xếp hạng</p>
                                <ul className="">
                                    <li className="w-[260px] rounded-t-[6px]  bg-[#353945] text-center text-white font-bold py-4 mb-[4px]">Xếp hạng cao nhất quốc gia</li>
                                    <li className="w-[260px] bg-[#fafafa] p-2 relative">
                                        <p><span className="font-bold">Học Viên</span>: Trịnh Văn Sơn</p>
                                        <p><span className="font-bold">SBD</span>: 2412315</p>
                                        <p><span className="font-bold">Trường</span>: THCS An Sinh-Đông Triều-Quảng Ninh</p>
                                    </li>
                                    <li className="w-[260px] bg-[#fafafa] p-2 relative rank-item">
                                        <p><span className="font-bold">Học Viên</span>: Vũ Văn Tú</p>
                                        <p><span className="font-bold">SBD</span>: 2432321</p>
                                        <p><span className="font-bold">Trường</span>: THCS Mạo Khê 2-Đông Triều-Quảng Ninh</p>
                                    </li>
                                    <li className="w-[260px] bg-[#fafafa] p-2 relative rank-item">
                                        <p><span className="font-bold">Học Viên</span>:Vũ Thị Nhi</p>
                                        <p><span className="font-bold">SBD</span>: 2434311</p>
                                        <p><span className="font-bold">Trường</span>: THCS Bình Dương-Đông Triều-Quảng Ninh</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="boardRank">
                                <ul className="mt-[40px]">
                                    <li className="w-[260px] rounded-t-[6px]  bg-[#353945] text-center text-white font-bold py-4 mb-[4px]">Xếp hạng cao nhất tỉnh</li>
                                    <li className="w-[260px] bg-[#fafafa] p-2 relative">
                                        <p><span className="font-bold">Học Viên</span>: Trịnh Văn Sơn</p>
                                        <p><span className="font-bold">SBD</span>: 2434351</p>
                                        <p><span className="font-bold">Trường</span>: THCS An Sinh-Đông Triều-Quảng Ninh</p>
                                    </li>
                                    <li className="w-[260px] bg-[#fafafa] p-2 relative rank-item">
                                        <p><span className="font-bold">Học Viên</span>: Nguyễn Phúc Thanh</p>
                                        <p><span className="font-bold">SBD</span>: 2434342</p>
                                        <p><span className="font-bold">Trường</span>: THCS Thủy An-Đông Triều-Quảng Ninh</p>
                                    </li>
                                    <li className="w-[260px] bg-[#fafafa] p-2 relative rank-item">
                                        <p><span className="font-bold">Học Viên</span>: Vũ Văn Tuấn</p>
                                        <p><span className="font-bold">SBD</span>: 2231232</p>
                                        <p><span className="font-bold">Trường</span>: THCS Hoàng Quế-Đông Triều-Quảng Ninh</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-[20px] bg-[#16191f] absolute bottom-0 left-0 right-0 border-[#353945] border-t-[1px] text-[#777e90]">
                    <div className="mx-auto max-w-[1092px] w-[100%] flex justify-between items-center contentFooter">
                        <span className="text-[14px] font-light">Copyright © 2022  - <a href="# " className="underline">SownVipro</a> & <a href="# " className="underline">TCODEDAO</a></span>
                        <span className="textFooterCenter"><span className="font-light">Sản phẩm thuộc</span> NHÓM HỌC SINH LỚP 8A TRƯỜNG THCS AN SINH</span>
                        <span className="flex justify-between socialFooter">
                            <a href="# " className="pr-[8px]"><img className="w-[24px] h-[24px]" src="https://tek4.vn/icons/facebook-footer-icon.svg" alt="" /></a>
                            <a href="# " className="px-[8px]"><img className="w-[24px] h-[24px]" src="https://tek4.vn/icons/twitter-footer-icon.svg" alt="" /></a>
                            <a href="# " className="px-[8px]"><img className="w-[24px] h-[24px]" src="https://tek4.vn/icons/instagram-footer-icon.svg" alt="" /></a>
                            <a href="# " className="px-[8px]"><i className="fa-brands fa-google-plus-g text-[24px]"></i></a>
                            <a href="# " className="pl-[8px]"><i className="fa-brands fa-github text-[24px]"></i></a>
                        </span>
                    </div>
                </div>
            </div>

        </>
    )
}
