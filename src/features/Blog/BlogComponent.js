import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import NavBarLearnPage from '../../components/NavBar/NavBarLearnPage'
import EditorComponent from './EditorComponent'
import { EditorState } from 'draft-js'
import Avatar from '../../components/AvatarComponent/AvatarComponent'
// css
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './BlogComponent.css'
import { createPosts, getAllPosts, upLikePosts } from '../../api/apiPosts'
import { createAxios } from '../../utils/axiosJWT'
import { checkTokenSuccess } from '../../redux/reducers/AuthSlice'
import { likeUpSuccess } from '../../redux/reducers/PostsSlice'
import { notifyInfo } from '../../components/Alert/AlertComponents'

const parse = require('html-react-parser')
export default function BlogComponent() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state?.auth?.login?.currentUser)
    let axiosJWT = createAxios(currentUser, dispatch, checkTokenSuccess)

    useEffect(() => {
        if (!currentUser) {
            navigate('/auth')
        }
    }, [])

    //Show Editor
    const [isEditorShow, setIsEditorShow] = useState(false)
    const handleShowEditor = (e) => {
        e.currentTarget.blur()
        setIsEditorShow(true)
    }
    const handleHideEditor = useCallback(() => {
        setIsEditorShow(false)

    }, [])

    const [attachment, setAttachment] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState(EditorState.createEmpty())
    const [postsDataSend, setPostsDataSend] = useState(null)
    let isEmitionedRedux = useSelector(state => state?.posts.like)
    let isEmitioned = false
    if (isEmitionedRedux?.userId == currentUser?._id && isEmitionedRedux?.isEmotion) {
        isEmitioned = true
    } else {
        isEmitioned = false

    }
    useEffect(() => {
        if (postsDataSend) {
            createPosts(dispatch, currentUser, axiosJWT, postsDataSend)
            getAllPosts(dispatch, currentUser, axiosJWT)
            notifyInfo('Quá trình đăng bài sẽ mất thời gian khoảng 30s vì dịch vụ host đang sử dụng là miễn phí, nếu không thấy bài đăng xuất hiện hãy tải lại trang!f')
            setAttachment('')
            setTitle('')
            setBody(EditorState.createEmpty())
            setPostsDataSend(null)
        }
    }, [postsDataSend])
    const postsList = useSelector(state => state?.posts?.posts?.postsData?.data)
    useEffect(() => {
        getAllPosts(dispatch, currentUser, axiosJWT)

    }, [postsList])


    return (
        <div className="pt-[20px] pb-[80px] bg-[#13161B] mt-[96px] relative min-h-[100vh]">
            <NavBarLearnPage currentUser={currentUser}></NavBarLearnPage>
            {isEditorShow &&

                <EditorComponent setPostsDataSend={setPostsDataSend} handleHideEditor={handleHideEditor} body={body} setBody={setBody} title={title} setTitle={setTitle} attachment={attachment} setAttachment={setAttachment}></EditorComponent>

            }
            <div className="max-w-[1092px] w-[100%] mx-auto flex flex-col items-center bodyWrapper">
                <div className="bg-[#353945] w-[50%] px-[10px] py-[10px] rounded-[8px] postWriterWrapper">
                    <div className="postWriter flex-wrap">
                        <div className="flex items-center">
                            <div className="w-[40px] h-[40px] cursor-pointer">
                                <Avatar
                                    size="44px"
                                    round="50%"
                                    textSizeRatio={1.75}
                                    name={currentUser?.fullName}
                                ></Avatar>
                            </div>
                            <div className="grow ml-[8px] h-[40px] postInputWrapper">
                                <input onFocus={e => handleShowEditor(e)} type="text" placeholder={`${currentUser?.fullName?.split(' ')[currentUser?.fullName?.split(' ').length - 1]}, bạn đang nghĩ gì thế..?`} className="w-full px-[10px] h-full rounded-[30px] text-[16px] cursor-pointer bg-[#fafafa] outline-none text-[#333] postInput" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-evenly text-[#B0B3B8]">
                        <span className="hover:text-[#fafafa] cursor-pointer flex items-center postWriterAdd  " onClick={handleShowEditor} >
                            <i className="mr-[4px] text-[16px] fa-solid fa-images"></i>
                            <p>Ảnh/Video</p>
                        </span>

                        <span className="hover:text-[#fafafa] cursor-pointer flex items-center postWriterAdd " onClick={handleShowEditor} >
                            <i className="mr-[4px] text-[16px] fa-solid fa-face-smile-beam"></i>
                            <p>Cảm xúc</p>
                        </span>
                    </div>
                </div>
                <div className="w-[50%] postListWrapper">
                    {postsList?.map(post => {
                        return (
                            <div className="w-full bg-[#353945] my-[10px] rounded-[8px] px-[10px] py-[10px]" key={post?._id}>

                                <div className="flex items-center mb-[8px]">
                                    <div className="w-[40px] h-[40px] cursor-pointer">
                                        <Avatar
                                            size="44px"
                                            round="50%"
                                            textSizeRatio={1.75}
                                            name={post?.authorId?.fullName}
                                        ></Avatar>
                                    </div>
                                    <span className="text-white flex flex-col ml-[4px]">
                                        <span>{post?.authorId?.fullName}</span>
                                        <span className="font-light text-[#B0B3B8] text-[12px]"><i className="fa-solid fa-clock mr-[2px]"></i>1 phút trước</span>
                                    </span>
                                </div>
                                <div>
                                    <div className="mb-[8px] postContentWrapper">
                                        <div className="">
                                            <p className="text-white text-[14px] postContent mb-[8px]"><span className='uppercase'>{post?.title}</span>
                                                {parse(post?.body)}
                                            </p>

                                        </div>
                                        <div className="mb-[8px] w-[100%] overflow-hidden rounded-[8px]">
                                            <img src={post?.attachment} alt="" className='rounded-[8px] object-cover w-full' />
                                        </div>
                                        <div className="flex justify-between text-[#B0B3B8] text-[14px] cursor-default">
                                            <span>  <i className=" mr-[4px] fa-solid fa-thumbs-up"></i>{post?.likes}</span>
                                            <div>
                                                <span className="mr-[8px]"><i className=" mr-[4px] fa-solid fa-comment"></i>{post?.comment?.length}</span>
                                                {/* <span><i className=" mr-[4px] fa-solid fa-share"></i>4</span> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="postReactWrapper">
                                        <div className="text-[#B0B3B8] text-[18px] flex justify-around">
                                            <button data-likes={false}
                                                onClick={() => { notifyInfo('Tính năng chưa phát triển') }}
                                                className={`cursor-pointer hover:text-[#fafafa] disabled:hover:text-[#2078f4] `} ><i onClick={e => e.stopPropagation()} className=" mr-[4px] fa-solid fa-thumbs-up"></i>Thích</button>
                                            <span className="cursor-pointer hover:text-[#fafafa]" onClick={() => { notifyInfo('Tính năng đang phát triển') }}><i className=" mr-[4px] fa-solid fa-comment" ></i>Bình luận</span>
                                            {/* <span className="cursor-pointer hover:text-[#fafafa]"><i className=" mr-[4px] fa-solid fa-share"></i>Chia sẻ</span> */}
                                        </div>
                                    </div>
                                    <div class="flex items-center mb-[10px]">
                                        <div class="w-[30px] h-[30px] cursor-pointer">
                                            <Avatar
                                                size="34px"
                                                round="50%"
                                                textSizeRatio={1.5}
                                                name={post?.authorId?.fullName}
                                            ></Avatar>
                                        </div>
                                        <div class="grow ml-[8px] h-[30px]">
                                            <input type="text" placeholder="Bình luận công khai..." class="w-full px-[10px] h-full rounded-[30px] text-[14px] bg-[#fafafa] outline-none text-[#333] postInput cursor-pointer" onMouseDown={(e) => {
                                                e.preventDefault()
                                                notifyInfo('Tính năng đang phát triển')
                                                return false;
                                            }}></input>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

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

