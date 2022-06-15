import React, { memo } from 'react'

function HighScoreProvince() {
    return (
        <>
            <div>
                <ul className="mt-[40px]">
                    <li className="w-[260px] rounded-t-[6px]  bg-[#353945] text-center text-white font-bold py-4 mb-[4px]">
                        Xếp hạng cao nhất tỉnh
                    </li>
                    <li className="w-[260px] bg-[#fafafa] p-2 relative">
                        <p>
                            <span className="font-bold">Học Viên</span>: Trịnh
                            Văn Sơn
                        </p>
                        <p>
                            <span className="font-bold">SBD</span>: 2412315
                        </p>
                        <p>
                            <span className="font-bold">Trường</span>: THCS An
                            Sinh-Đông Triều-Quảng Ninh
                        </p>
                    </li>
                    <li className="w-[260px] bg-[#fafafa] p-2 relative rank-item">
                        <p>
                            <span className="font-bold">Học Viên</span>: Trịnh
                            Văn Sơn
                        </p>
                        <p>
                            <span className="font-bold">SBD</span>: 2412315
                        </p>
                        <p>
                            <span className="font-bold">Trường</span>: THCS An
                            Sinh-Đông Triều-Quảng Ninh
                        </p>
                    </li>
                    <li className="w-[260px] bg-[#fafafa] p-2 relative rank-item">
                        <p>
                            <span className="font-bold">Học Viên</span>: Trịnh
                            Văn Sơn
                        </p>
                        <p>
                            <span className="font-bold">SBD</span>: 2412315
                        </p>
                        <p>
                            <span className="font-bold">Trường</span>: THCS An
                            Sinh-Đông Triều-Quảng Ninh
                        </p>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default memo(HighScoreProvince)
