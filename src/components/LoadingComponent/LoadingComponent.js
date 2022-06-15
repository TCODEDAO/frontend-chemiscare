import React from 'react'
const loadAnimate = require('../../assets/animation/gif/load.gif')
function LoadingComponent() {
    return (
        <div className="w-screen h-screen flex justify-center items-center bg-white">
            <img src={loadAnimate} alt="loading..." />
        </div>
    )
}
export default LoadingComponent
