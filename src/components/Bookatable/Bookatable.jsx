import React from 'react'
import Topbar from '../Topbar/Topbar'
import Navbar from '../Navbar/Navbar'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import Reservation from '../Reservation/Reservation'
import Footer from '../Footer/Footer'

export default function Bookatable() {
  return (
    <div>
        <Navbar />
        <Topbar />
        <Breadcrumb name="میز رزرو کنید" />
        <Reservation isAriz={false} imgUrl="../Img/reservation-img-2.webp" imgUrl2="../Img/reservation-shape-2.webp" bgInput="#151B20" align="mx-auto" />
        <Footer bgColor="#151B20" />
    </div>
  )
}
