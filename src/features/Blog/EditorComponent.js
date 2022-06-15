import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg"
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import { notifyWarn } from '../../components/Alert/AlertComponents'
import FileBase64 from 'react-file-base64'
import './EditorComponent.css'
export default function EditorComponent({ handleHideEditor, body, setBody, attachment, setAttachment, title, setTitle, setPostsDataSend }) {


    const handleSubmitPost = () => {
        if (title == '') {
            notifyWarn('Bạn cần thêm thông tin cho tiêu đề')
            return
        }
        if (convertToRaw(body.getCurrentContent()).blocks.length === 1 && convertToRaw(body.getCurrentContent()).blocks[0].text === '') {
            notifyWarn('Bạn cần thêm thông tin cho bài đăng')
            return
        }

        let contentSubmit = draftToHtml(convertToRaw(body.getCurrentContent()))
        setPostsDataSend({ body: contentSubmit, attachment, title })
        handleHideEditor()
    }
    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 bg-[#00000056] z-10 flex  items-center flex-col' onClick={handleHideEditor}>
            <div className='flex justify-center flex-col items-center ' onClick={(e) => {
                e.stopPropagation()
            }}>
                <div className='text-[34px] text-black font-bold bg-[#ffffff] w-full text-center rounded-[20px] relative mt-[10px] mb-2'>Tạo bài viết</div>
                <input className='w-[100%] mb-2 py-4 px-4 outline-none rounded-[20px]' type="text" placeholder='Tiêu đề của bài viết...' value={title} onChange={e => setTitle(e.target.value)} required />
                <Editor
                    editorState={body}
                    wrapperClassName="wrapperClassName"
                    wrapperStyle={{ overflowY: 'scroll', maxHeight: '300px', minHeight: '286px', maxWidth: '500px', borderRadius: '20px', border: '10px solid #636e72', scrollBehavior: 'smooth', padding: '10px', background: '#FFFFFF', zIndex: 100, boxShadow: 'transparent 0 0 0 3px, rgb(18 18 18 / 10%) 0 6px 20px' }} onEditorStateChange={setBody}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'remove', 'history'],
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                    }}
                />

                <FileBase64 accept="image/*" multiple={false} id="upload-photo" type="file" value={attachment} onDone={({ base64 }) => setAttachment(base64)}></FileBase64>
                <button className='h-[56px] w-full rounded-[80px] bg-[#ff7675]  text-white mt-2 flex justify-center items-center text-[24px] cursor-pointer hover:bg-[#f86767] select-none transition-all duration-500' onClick={handleSubmitPost}>Đăng</button>
            </div>
        </div>
    )
}






