import React from 'react'
import Navbar from '../Navbar/Navbar'
import Topbar from '../Topbar/Topbar'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import Servicecategories from '../Servicecategories/Servicecategories'
import Footer from '../Footer/Footer'

export default function Servicedetails() {
  return (
    <div>
        <Navbar />
        <Topbar />
        <Breadcrumb title="جزئیات خدمات" isAriz="true" name="خدمات" url="/Plate/Services" />
        <Servicecategories />
        <Footer bgColor="#151B20" />
    </div>
  )
}
