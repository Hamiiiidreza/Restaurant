import React from 'react'
import { Link } from 'react-router-dom'

export default function Breadcrumb({ title, name, isAriz, url }) {
  return (
    <>
      {
        isAriz ? (
          <div className='breadcrumb relative p-[110px] bg-[#151B20]'>
            <img className='absolute right-[35px] top-[25%] opacity-10 animate-float' src="https://rtlme.ir/Etar/assets/img/breadcrumb/br-shape-1.webp" alt="shape1" />
            <img className='absolute left-[31%] bottom-[15%] opacity-10 animate-moveHorizontal' src="https://rtlme.ir/Etar/assets/img/breadcrumb/br-shape-2.webp" alt="shape2" />
            <img className='absolute left-0 top-0 w-[300px] h-full' src="https://rtlme.ir/Etar/assets/img/breadcrumb/br-shape-3.webp" alt="shape3" />
            <div className='container text-center'>
              <h2 className='text-white text-[40px] font-bold mb-[15px]'>{title}</h2>
              <ul>
                <li className='inline-block relative ml-2 pl-[19px] after:absolute after:content-["|"] after:top-[1px] after:left-0 after:rotate-[13deg]'>
                  <Link className='text-orange-250 transition-all duration-300 ease-in-out hover:text-white' to="/">صفحه اصلی</Link>
                </li>
                <li className='inline-block relative ml-2 pl-[19px] after:absolute after:content-["|"] after:top-[1px] after:left-0 after:rotate-[13deg]'>
                  <Link className='text-orange-250 transition-all duration-300 ease-in-out hover:text-white' to={`${url}`}>{name}</Link>
                </li>
                <li className='inline-block text-white'>{title}</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className='breadcrumb relative p-[110px] bg-[#151B20]'>
            <img className='absolute right-[35px] top-[25%] opacity-10 animate-float' src="https://rtlme.ir/Etar/assets/img/breadcrumb/br-shape-1.webp" alt="shape1" />
            <img className='absolute left-[31%] bottom-[15%] opacity-10 animate-moveHorizontal' src="https://rtlme.ir/Etar/assets/img/breadcrumb/br-shape-2.webp" alt="shape2" />
            <img className='absolute left-0 top-0 w-[300px] h-full' src="https://rtlme.ir/Etar/assets/img/breadcrumb/br-shape-3.webp" alt="shape3" />
            <div className='container text-center'>
              <h2 className='text-white text-[40px] font-bold mb-[15px]'>{name}</h2>
              <ul>
                <li className='inline-block relative ml-2 pl-[19px] after:absolute after:content-["|"] after:top-[1px] after:left-0 after:rotate-[13deg]'>
                  <Link className='text-orange-250 transition-all duration-300 ease-in-out hover:text-white' to="/">صفحه اصلی</Link>
                </li>
                <li className='inline-block text-white'>{name}</li>
              </ul>
            </div>
          </div>
        )
      }
    </>
  )
}
