import React from 'react'
import Navbar from '../Navbar/Navbar'
import Topbar from '../Topbar/Topbar'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import Features from '../Features/Features'
import Servicesrendered from '../Sevicesrendered/Servicesrendered'
import Counter from '../Counter/Counter'
import Bestservice from '../Bestservice/Bestservice'
import Videobg from '../Videobg/Videobg'
import Footer from '../Footer/Footer'

export default function Services() {
  return (
    <div>
        <Navbar />
        <Topbar />
        <Breadcrumb title="خدمات" name="خدمات" />
        <Features bgColor="bg-[#0E1317]" />
        <Servicesrendered />
        <Counter />
        <Bestservice />
        <Videobg />
        <Footer bgColor="#151B20" />
    </div>
  )
}
