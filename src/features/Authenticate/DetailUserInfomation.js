import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { detailUserInfomation } from '../../api/apiAuth'
import { checkTokenSuccess } from '../../redux/reducers/AuthSlice'
import { createAxios } from '../../utils/axiosJWT'

export default function DetailUserInfomation() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [grade, setGrade] = useState('grade 8')
    const [school, setSchool] = useState('Trường THCS An Sinh')
    const [classSchool, setClassSchool] = useState('')
    const currentUser = useSelector((state) => state?.auth?.login?.currentUser)
    useEffect(() => {
        if (!currentUser) {
            navigate('/auth')
        }
        console.clear()
    }, [])
    const infoUser = {
        location: {
            school: school,
        },
        grade: grade,
        class: classSchool,
    }
    const axiosJWT = createAxios(currentUser, dispatch, checkTokenSuccess)
    const handleUpdateInfo = () => {
        detailUserInfomation(
            dispatch,
            navigate,
            currentUser?.accessToken,
            axiosJWT,
            currentUser?._id,
            infoUser,
        )
    }
    return (
        <div className='h-screen w-screen bg-[url("https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")] flex justify-center items-center'>
            <div className="h-[428px] w-[552px] bg-[#ff7675] rounded-[20px] p-[14px]">
                <a href="# " className="flex items-center">
                    <div className="p-4">
                        <i className="fa-solid fa-atom text-2xl text-white"></i>
                        <span className="font-bold text-xl  pl-1 text-white">
                            Chemiscare
                        </span>
                    </div>
                </a>
                <div className="flex justify-around flex-col items-center ">
                    <select
                        name="school"
                        id=""
                        className="min-w-full min-h-[50px] rounded-[20px] outline-none  mb-4 px-4"
                        required
                        defaultValue="Trường THCS An Sinh"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                    >
                        <option value="Trường THCS Hoàng Quế">
                            Trường THCS Hoàng Quế
                        </option>
                        <option value="Trường THCS Mạo khê 2">
                            Trường THCS Mạo khê 2
                        </option>
                        <option value="Trường THCS Thủy An">
                            Trường THCS Thủy An
                        </option>
                        <option value="Trường THCS Trần Hưng Đạo">
                            Trường THCS Trần Hưng Đạo
                        </option>
                        <option value="Trường THCS Nguyễn Huệ">
                            Trường THCS Nguyễn Huệ
                        </option>
                        <option value="Trường THCS Yên Thọ">
                            Trường THCS Yên Thọ
                        </option>
                        <option value="Trường THCS Nguyễn Đức Cảnh">
                            Trường THCS Nguyễn Đức Cảnh
                        </option>
                        <option value="Trường THCS Mạo Khê 1">
                            Trường THCS Mạo Khê 1
                        </option>
                        <option value="Trường THCS Bình Khê">
                            Trường THCS Bình Khê
                        </option>
                        <option value="Trường THCS Tràng An">
                            Trường THCS Tràng An
                        </option>
                        <option value="Trường THCS Lê Hồng Phong">
                            Trường THCS Lê Hồng Phong
                        </option>
                        <option value="Trường THCS Đức Chính">
                            Trường THCS Đức Chính
                        </option>
                        <option value="Trường THCS Kim Sơn">
                            Trường THCS Kim Sơn
                        </option>
                        <option value="Trường THCS Xuân Sơn">
                            Trường THCS Xuân Sơn
                        </option>
                        <option value="Trường THCS Thị Trấn Đông Triều">
                            Trường THCS Thị Trấn Đông Triều
                        </option>
                        <option value="Trường THCS Nguyễn Du">
                            Trường THCS Nguyễn Du
                        </option>
                        <option value="Trường THCS An Sinh">
                            Trường THCS An Sinh
                        </option>
                    </select>
                    <select
                        name="grade"
                        id=""
                        className="min-w-full min-h-[50px] rounded-[20px] outline-none  mb-4 px-4"
                        required
                        defaultValue="grade 8"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    >
                        <option value="grade 8" className="rounded-md">
                            Khối 8
                        </option>
                        <option value="grade 9" className="rounded-md">
                            Khối 9
                        </option>
                    </select>
                    <input
                        type="text"
                        className="w-full min-h-[52px] outline-none rounded-[20px] px-4"
                        required
                        placeholder="Nhập tên lớp..."
                        value={classSchool}
                        onChange={(e) => setClassSchool(e.target.value)}
                    />
                    <div
                        className="min-h-[200px] min-h-[74px] bg-[#ff3f34] text-[#d2dae2] hover:opacity-70 flex justify-center items-center p-4 rounded-[80px] select-none cursor-pointer font-semibold mt-[40px]"
                        onClick={handleUpdateInfo}
                    >
                        Cập nhật thông tin
                    </div>
                </div>
            </div>
        </div>
    )
}
