import React from 'react'
import Topbar from '../Topbar/Topbar'
import Navbar from '../Navbar/Navbar'
import Breadcrumb from '../Breadcrumb/Breadcrumb'
import Exampleportfolio from '../Exampleportfolio/Exampleportfolio'
import Footer from '../Footer/Footer'

const Portfolio = () => {

  return (
    <div>
        <Navbar />
        <Topbar />
        <Breadcrumb name="نمونه کارها" />
        <Exampleportfolio Padding="py-[130px]" isPaginate={true} displayCount={8} />
        <Footer bgColor="#151B20" />
    </div>
  )
};

export default Portfolio;
