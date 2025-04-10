import React from 'react'
import Topbar from '../Topbar/Topbar'
import Navbar from '../Navbar/Navbar'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import Details from '../Datails/Details'
import Footer from '../Footer/Footer'

export default function Portfoliodetails() {
  return (
    <div>
        <Navbar />
        <Topbar />
        <Breadcrumb title="جزئیات نمونه کارها" isAriz="true" name="نمونه کارها" url="/Plate/Portfolio" />
        <Details />
        <Footer bgColor='#151B20' />
    </div>
  )
}
