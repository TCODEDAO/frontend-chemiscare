import { Route, Routes } from 'react-router-dom'
import React, { Suspense, useState, useEffect } from 'react'
import './App.css'
import LoadingComponent from './components/LoadingComponent/LoadingComponent'
import FullPageLoader from './components/LoadingComponent/FullPageLoader'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from 'react-redux'

import { publicRoutes, privateRoutes } from './routes/index'
import NotFound from './components/NotFoundComponent/NotFound'

function App() {
    //isFetching
    const isFetchingLogin = useSelector((state) => state.auth.login.isFetching)
    const isFetchingRegister = useSelector(
        (state) => state.auth.register.isFetching,
    )
    const isFetchingLogout = useSelector(
        (state) => state.auth.logout.isFetching,
    )

    const [showLoader, setShowLoader] = useState(false)
    useEffect(async () => {
        let timeOut
        if (isFetchingLogin || isFetchingRegister || isFetchingLogout) {
            setShowLoader(true)
            timeOut = setTimeout(() => {
                setShowLoader(false)
            }, 1500)
        }

        return () => {
            clearTimeout(timeOut)
        }
    }, [isFetchingLogin, isFetchingRegister, isFetchingLogout])

    return (
        <Suspense fallback={<LoadingComponent />}>
            <Routes>
                {publicRoutes.map((route) => {
                    const Page = route.component

                    return (
                        <Route
                            path={route.path}
                            element={<Page />}
                            key={route.id}
                            index={route.index}
                        />
                    )
                })}
                {privateRoutes.map((route) => {
                    const Page = route.component

                    return (
                        <Route
                            path={route.path}
                            element={<Page />}
                            key={route.id}
                            index={route.index}
                        />
                    )
                })}
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <FullPageLoader showLoader={showLoader}></FullPageLoader>
        </Suspense>
    )
}

export default App
