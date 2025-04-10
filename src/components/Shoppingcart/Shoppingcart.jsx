import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Topbar from '../../components/Topbar/Topbar'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import Shoppingtable from '../Shoppingtable/Shoppingtable'
import Footer from '../Footer/Footer'

export default function Shoppingcart() {
  return (
    <div>
        <Navbar />
        <Topbar />
        <Breadcrumb title="سبد خرید" name="سبد خرید" />
        <Shoppingtable />
        <Footer bgColor="#151B20" />
    </div>
  )
}
