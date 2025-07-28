import React from 'react'
import Navbar from '../Navbar/Navbar'
import Topbar from '../Topbar/Topbar'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import Storesample from '../Storesample/Storesample'
import Footer from '../Footer/Footer'

export default function Shopdetails() {
  return (
    <div>
      <Navbar />
      <Topbar />
      <Breadcrumb title="جزئیات فروشگاه" isAriz="true" name="فروشگاه" url="/Store/Shopgrid" />
      <Storesample />
      <Footer bgColor="#151B20" />
    </div>
  )
}
