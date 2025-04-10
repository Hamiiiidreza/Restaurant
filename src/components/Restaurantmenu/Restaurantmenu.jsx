import React from 'react'
import Navbar from '../Navbar/Navbar'
import Topbar from '../Topbar/Topbar'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import Recipemenu from '../Recipemenu/Recipemenu'
import Dailymenuoffers from '../Dailymenuoffers/Dailymenuoffers'
import Reservation from '../Reservation/Reservation'
import Footer from '../Footer/Footer'

export default function Restaurantmenu() {
    return (
        <div>
            <Navbar />
            <Topbar />
            <Breadcrumb title="منو رستوران" name="منو رستوران" />
            <Recipemenu />
            <Reservation bgReserv="bg-[url(../Public/Img/bgreservrestaurant-img.webp)]" isAriz={false} imgUrl="../Img/reservation-img.webp" bgInput="#0E1317" align="mx-auto" />
            <Dailymenuoffers />
            <Footer bgColor="#151B20" />
        </div>
    )
}
