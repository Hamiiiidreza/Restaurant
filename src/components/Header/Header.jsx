import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='header relative pt-[120px] px-0 pb-[140px] z-10 overflow-hidden'>
        <img className='absolute max-w-full h-auto bottom-[7.5%] right-0' src="../../Public/Img/header-img-1.webp" alt="headerimg1" />
        <img className='absolute max-w-full h-auto top-[4%] right-0' src="https://rtlme.ir/Etar/assets/img/hero/hero-bg-shape.webp" alt="headershape" />
       <div className='container relative'>
           <img className='absolute max-w-full h-auto top-[-5px] left-[47px]' src="../../Public/Img/header-img-3.webp" alt="headerimg3" />
          <div className='relative'>
              <h1 className='text-white font-bold text-[2.5rem] leading-5'>
                <span className='text-9xl h-[200px]'>لذت زیبایی</span>
                <span className='block h-[182px]'></span>
                <span className='block text-fill-3 text-stroke-3 h-[142px] text-center text-[180px] tracking-[-0.05px] text-orange-250'>شاندیز</span>
                <span className='block text-center text-8xl leading-5'>در آشپزی و نوشیدنی</span>
              </h1>
              <div className='absolute bottom-[75px] right-[50.5%] translate-x-1/2 -z-10 bg-[url(/Img/header-img-4.webp)] bg-no-repeat bg-center-top bg-cover h-[300px] w-[520px]'></div>
          </div>
          <div className='absolute bottom-[-58px] left-10 '>
              <img className='header-img' src="/Img/bookatable-img.webp" alt="headerimganimate" />
              <Link className='absolute top-0 h-full w-full z-10' to="/Plate/Bookatable"></Link>
          </div>
       </div>
    </div>
  )
}
