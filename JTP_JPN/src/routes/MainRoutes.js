import Navbar from "../layouts/Navbar"
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import ListOfRoutes from "../global/listOfRoutes"
import DefaultLoader from "../components/loaders/DefaultLoader"
import _ from "lodash"

const MainLayout = () => {
    return (
        <React.Fragment>
            <div className="flex-col w-screen min-h-screen">
                <Navbar />
                {
                    <main
                        className={`flex-1`}>
                        <Suspense fallback={<DefaultLoader />}>
                            {localStorage.getItem("token") &&
                                <Routes>
                                    {ListOfRoutes.map((route, index) => {
                                        return (
                                            <Route
                                                key={index}
                                                path={route.path}
                                                element={<route.element />}
                                            />
                                        )
                                    })}
                                </Routes>
                            }
                        </Suspense>
                    </main>
                }
            </div>
        </React.Fragment >
    )
}

export default MainLayout