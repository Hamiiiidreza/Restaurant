import Index from "./pages/Index/Index"
import About from "./pages/About/About"
import Menu from "./pages/Menu/Menu"
import Plate from "./pages/Plate/Plate"
import Portfolio from "./components/Portfolio/Portfolio"
import Store from "./pages/Store/Store"
import Shopgrid from "./components/Shopgrid/Shopgrid"
import Shopdetails from "./components/shopdetails/Shopdetails"


import Userpanel from "./pages/Userpanel/Index"
import Dashboard from "./pages/Userpanel/Index/Dashboard"
import Orders from "./pages/Userpanel/Orders/Orders"
import Neworder from "./pages/Userpanel/Neworder/Neworder"
import Discounts from "./pages/Userpanel/Discounts/Discounts"
import Reviews from "./pages/Userpanel/Reviews/Reviews"
import Settings from "./pages/Userpanel/Settings/Settings"
import Reservation from "./pages/Userpanel/Reservation/Reservation"
import ReservationCart from "./components/ReservationCart/Reservationcart"
import ReservationCheckout from "./components/ReservationCheckout/ReservationCheckout"

const routes = [
    { path: '/', element: <Index /> },
    { path: '/About', element: <About /> },
    { path: '/Menu/:type', element: <Menu /> },
    { path: '/Plate/:type', element: <Plate /> },
    { path: '/Plate/portfolio/:id', element: <Portfolio /> },
    { path: '/Store/:type', element: <Store /> },
    { path: '/Store/Shopgrid/:id', element: <Shopgrid /> },
    { path: '/Store/Shopdetails/:productId', element: <Shopdetails /> },
    {
        path: '/my-account/*',
        element: <Userpanel />,
        children: [
            { path: "", element: <Dashboard /> },
            { path: "orders", element: <Orders /> },
            { path: "new-order", element: <Neworder /> },
            { path: "discounts", element: <Discounts /> },
            { path: "settings", element: <Settings /> },
            { path: "reviews", element: <Reviews /> },
            { path: "table-Reservation", element: <Reservation /> },
            { path: "ReservationCart", element: <ReservationCart /> },
            { path: "ReservationCheckout", element: <ReservationCheckout /> },
        ]

    },
]

export default routes;