import React from "react"

const Dashboard = React.lazy(() => import("../pages/Dashboard"))


export const routesList = {
    dashboard: '/'
}

const MainRouteList = [
    { path: routesList.dashboard, exact: true, element: Dashboard },
]

export default MainRouteList