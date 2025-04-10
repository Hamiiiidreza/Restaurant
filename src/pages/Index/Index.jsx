import React from 'react';
import Topbar from '../../components/Topbar/Topbar';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Features from '../../components/Features/Features';
import Recipemenu from '../../components/Recipemenu/Recipemenu';
import Aboutus from '../../components/About/Aboutus';
import Category from '../../components/Category/Category';
import Videobg from '../../components/Videobg/Videobg';
import Testimonial from '../../components/Testimonial/Testimonial';
import Team from '../../components/Team/Team';
import Reservation from '../../components/Reservation/Reservation';
import Articles from '../../components/Articles/Articles';

export default function Index() {
  return (
    <div>
      <Topbar />
      <Header />
      <Features bgColor="bg-[#12131B]" />
      <Aboutus />
      <Recipemenu />
      <Category />
      <Videobg />
      <Testimonial bgColor="#12131B" />
      <Team />
      <Reservation bgReserv="#12131B" isAriz={true} />
      <Articles />
      <Footer bgColor="#12131B" />
    </div>
  );
}
