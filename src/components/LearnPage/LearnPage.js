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
            dispatch(loginRequireLearnPage('B???n c???n ????ng nh???p ????? v??o h???c!'))
            return
        }
        if (!currentUser.detailUserInfomation) {
            navigate('/auth/detail')
            dispatch(loginRequireLearnPage('B???n c???n th??m th??ng tin ????? v??o h???c!'))
            return
        }
        getResultQuiz(currentUser, dispatch, axiosJWT)

        if (currentUser) {
            notifyWelcome(`Ch??o m???ng b???n!`)
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
                <title>H???c T???p</title>
            </Helmet>
            <div className="py-[60px] bg-[#13161B] mt-[86px] relative min-h-[100vh]">
                <NavBarLearnPage currentUser={currentUser}></NavBarLearnPage>
                <div className="max-w-[1092px] w-[100%] mx-auto">
                    <div className="flex justify-between flex-wrap mb-[100px]">
                        <div className="boardWrapper">
                            <div className="boardMain">
                                <p className="text-white font-bold text-2xl leading-5 mb-[20px]">????? thi d??nh cho h???c sinh l???p {currentUser?.detailUserInfomation?.grade.split(" ")[1]}</p>
                                <div className="flex text-white mb-[4px] board_header">
                                    <div className="w-[140px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem serial">STT</div>
                                    <div className="w-[200px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">B??i Thi</div>
                                    <div className="w-[140px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">L???n Thi</div>
                                    <div className="w-[140px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">??i???m</div>
                                    <div className="w-[180px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">Gi???</div>
                                </div>
                                <div>
                                    <div className="flex text-[#111827] boardBody">
                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem serial  ">1</div>
                                        <div className="flex items-center justify-center w-[200px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">
                                            {isComplete ? <button className="bg-[#3f3f46] text-white disabled:opacity-25 rounded-md examButton " disabled>B???n ???? ho??n th??nh b??i 1, vui l??ng ch??? b??i m???i.</button> : <button className="bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButton" onClick={() => {
                                                navigate('/learn/start')
                                            }}>L??m b??i 1 </button>}
                                            {isComplete ? <button className="bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButtonInMobile hidden fixHidenMoblie" disabled>B???n ???? ho??n th??nh b??i 1, vui l??ng ch??? b??i m???i.</button> : <button className="examButtonInMobile hidden bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButton fixHidenMoblie" onClick={() => {
                                                navigate('/learn/start')
                                            }}>L??m </button>}

                                        </div>

                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">{isComplete && 1}</div>
                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">{isComplete && 100}</div>
                                        <div className="flex items-center justify-center w-[180px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">{isComplete && timePlay}</div>
                                    </div>

                                    <div className="flex text-[#111827] boardBody">
                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem serial  ">2</div>
                                        <div className="flex items-center justify-center w-[200px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">
                                            {isComplete2 ? <button className="bg-[#3f3f46] text-white disabled:opacity-25 rounded-md examButton " disabled>B???n ???? ho??n th??nh b??i 2, vui l??ng ch??? b??i m???i.</button> : <button className="bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButton" onClick={() => {
                                                navigate('/learn/start')
                                                dispatch(completeQuizRoundTrue2())
                                                isComplete2 = true
                                            }}>L??m b??i 2</button>}
                                            {isComplete2 ? <button className="bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButtonInMobile hidden fixHidenMoblie" disabled>B???n ???? ho??n th??nh b??i 2, vui l??ng ch??? b??i m???i.</button> : <button className="examButtonInMobile hidden bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButton fixHidenMoblie" onClick={() => {
                                                navigate('/learn/start')
                                                dispatch(completeQuizRoundTrue2())
                                                isComplete2 = true

                                            }}>L??m </button>}

                                        </div>

                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">{isComplete && 1}</div>
                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">{isComplete && 100}</div>
                                        <div className="flex items-center justify-center w-[180px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem ">{isComplete && timePlay}</div>
                                    </div>

                                    <div className="flex text-[#111827] boardBody">
                                        <div className="flex items-center justify-center w-[140px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem serial  rounded-bl-[12px]">1</div>
                                        <div className="flex items-center justify-center w-[200px] px-5 py-2 bg-[#fafafa] border-[1px] border-[#111827] boardBodyItem">
                                            {isComplete3 ? <button className="bg-[#3f3f46] text-white disabled:opacity-25 rounded-md examButton " disabled>B???n ???? ho??n th??nh b??i 3, vui l??ng ch??? b??i m???i.</button> : <button className="bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButton" onClick={() => {
                                                navigate('/learn/start')
                                                dispatch(completeQuizRoundTrue3())

                                            }}>L??m b??i 3 </button>}
                                            {isComplete3 ? <button className="bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButtonInMobile hidden fixHidenMoblie" disabled>B???n ???? ho??n th??nh b??i 1, vui l??ng ch??? b??i m???i.</button> : <button className="examButtonInMobile hidden bg-[#3f3f46] text-white px-3 py-2 rounded-md hover:bg-[#4e4e57] examButton fixHidenMoblie" onClick={() => {
                                                navigate('/learn/start')
                                                dispatch(completeQuizRoundTrue3())

                                            }}>L??m </button>}

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
                                <p className="text-white font-bold text-2xl leading-5 mb-[20px]">L???ch s??? thi c??c v??ng</p>
                                <div className="flex text-white mb-[4px] board_header">
                                    <div className="w-[140px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem serial">STT</div>
                                    <div className="w-[200px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">V??ng</div>
                                    <div className="w-[140px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">L???n thi</div>
                                    <div className="w-[140px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">gi???</div>
                                    <div className="w-[180px] py-4 bg-[#353945] border-r-[1px] uppercase border-[#111827] text-center font-bold boardHeaderItem">??i???m</div>
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
                                <p className="text-white font-bold text-2xl leading-5 mb-[20px]">X???p h???ng</p>
                                <ul className="">
                                    <li className="w-[260px] rounded-t-[6px]  bg-[#353945] text-center text-white font-bold py-4 mb-[4px]">X???p h???ng cao nh???t qu???c gia</li>
                                    <li className="w-[260px] bg-[#fafafa] p-2 relative">
                                        <p><span className="font-bold">H???c Vi??n</span>: Tr???nh V??n S??n</p>
                                        <p><span className="font-bold">SBD</span>: 2412315</p>
                                        <p><span className="font-bold">Tr?????ng</span>: THCS An Sinh-????ng Tri???u-Qu???ng Ninh</p>
                                    </li>
                                    <li className="w-[260px] bg-[#fafafa] p-2 relative rank-item">
                                        <p><span className="font-bold">H???c Vi??n</span>: V?? V??n T??</p>
                                        <p><span className="font-bold">SBD</span>: 2432321</p>
                                        <p><span className="font-bold">Tr?????ng</span>: THCS M???o Kh?? 2-????ng Tri???u-Qu???ng Ninh</p>
                                    </li>
                                    <li className="w-[260px] bg-[#fafafa] p-2 relative rank-item">
                                        <p><span className="font-bold">H???c Vi??n</span>:V?? Th??? Nhi</p>
                                        <p><span className="font-bold">SBD</span>: 2434311</p>
                                        <p><span className="font-bold">Tr?????ng</span>: THCS B??nh D????ng-????ng Tri???u-Qu???ng Ninh</p>
                                    </li>
                                </ul>
                            </div>
                            <div className="boardRank">
                                <ul className="mt-[40px]">
                                    <li className="w-[260px] rounded-t-[6px]  bg-[#353945] text-center text-white font-bold py-4 mb-[4px]">X???p h???ng cao nh???t t???nh</li>
                                    <li className="w-[260px] bg-[#fafafa] p-2 relative">
                                        <p><span className="font-bold">H???c Vi??n</span>: Tr???nh V??n S??n</p>
                                        <p><span className="font-bold">SBD</span>: 2434351</p>
                                        <p><span className="font-bold">Tr?????ng</span>: THCS An Sinh-????ng Tri???u-Qu???ng Ninh</p>
                                    </li>
                                    <li className="w-[260px] bg-[#fafafa] p-2 relative rank-item">
                                        <p><span className="font-bold">H???c Vi??n</span>: Nguy???n Ph??c Thanh</p>
                                        <p><span className="font-bold">SBD</span>: 2434342</p>
                                        <p><span className="font-bold">Tr?????ng</span>: THCS Th???y An-????ng Tri???u-Qu???ng Ninh</p>
                                    </li>
                                    <li className="w-[260px] bg-[#fafafa] p-2 relative rank-item">
                                        <p><span className="font-bold">H???c Vi??n</span>: V?? V??n Tu???n</p>
                                        <p><span className="font-bold">SBD</span>: 2231232</p>
                                        <p><span className="font-bold">Tr?????ng</span>: THCS Ho??ng Qu???-????ng Tri???u-Qu???ng Ninh</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-[20px] bg-[#16191f] absolute bottom-0 left-0 right-0 border-[#353945] border-t-[1px] text-[#777e90]">
                    <div className="mx-auto max-w-[1092px] w-[100%] flex justify-between items-center contentFooter">
                        <span className="text-[14px] font-light">Copyright ?? 2022  - <a href="# " className="underline">SownVipro</a> & <a href="# " className="underline">TCODEDAO</a></span>
                        <span className="textFooterCenter"><span className="font-light">S???n ph???m thu???c</span> NH??M H???C SINH L???P 8A TR?????NG THCS AN SINH</span>
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
