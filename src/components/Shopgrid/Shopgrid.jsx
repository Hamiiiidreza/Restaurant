import React from 'react'
import Navbar from '../Navbar/Navbar'
import Topbar from '../Topbar/Topbar'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import Products from '../Products/Products'
import Footer from '../Footer/Footer'

export default function Shopgrid() {
  return (
    <div>
        <Navbar />
        <Topbar />
        <Breadcrumb name="فروشگاه" />
        <Products displayCount={8} />
        <Footer bgColor="#151B20" />
    </div>
  )
}
