import React from 'react'
import Navbar from '../Navbar/Navbar'
import Topbar from '../Topbar/Topbar'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import PaymentDetails from '../PaymentDetails/PaymentDetails'
import Footer from '../Footer/Footer'

export default function Checkout() {
  return (
    <div>
      <Navbar />
      <Topbar />
      <Breadcrumb title="پرداخت پول" name="سبد خرید" isAriz="true" url="/Store/Shoppingcart" />
      <PaymentDetails />
      <Footer bgColor="#151B20" />
    </div>
  )
}
