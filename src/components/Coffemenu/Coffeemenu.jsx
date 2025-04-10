import React from 'react'
import Navbar from '../Navbar/Navbar'
import Topbar from '../Topbar/Topbar'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import Coffeesmenu from '../Coffeesmenu/Coffeesmenu'
import Reservation from '../Reservation/Reservation'
import Footer from '../Footer/Footer'

export default function Coffeemenu() {
    return (
        <div>
            <Navbar />
            <Topbar /> 
            <Breadcrumb title="منو قهوه" name="منو قهوه" />
            <Coffeesmenu />
            <Reservation bgReserv="bg-[url(../Public/Img/bgreservcoffee-img.webp)]" isAriz={false} bgBoxInputs="#0E1317" bgInput="#151B20" align="ml-auto" />
            <Footer bgColor="#151B20" />
        </div>
    )
}
