import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Topbar from '../../components/Topbar/Topbar';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import Aboutus from '../../components/About/Aboutus';
import Bgmild from '../../components/Bgmild/Bgmild';
import Team from '../../components/Team/Team';
import Testimonial from '../../components/Testimonial/Testimonial';
import Reservation from '../../components/Reservation/Reservation';
import Footer from '../../components/Footer/Footer'

export default function About() {
  return (
    <div>
        <Navbar />
        <Topbar /> 
        <Breadcrumb title="درباره ما" name="درباره ما"/>
        <Aboutus />
        <Bgmild />
        <Team />
        <Testimonial bgColor="#151B20" />
        <Reservation isAriz={true} bgReserv="#12131B" />
        <Footer bgColor="#151B20" />
    </div>
  )
}
