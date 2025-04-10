import React from 'react'
import Navbar from '../Navbar/Navbar'
import Topbar from '../Topbar/Topbar'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import Storesample from '../Storesample/Storesample'

export default function Shopdetails() {
  return (
    <div>
        <Navbar />
        <Topbar />
        <Breadcrumb title="جزئیات فروشگاه" isAriz="true" name="فروشگاه" url="/Store/Shopgrid" />
        <Storesample />
    </div>
  )
}
