import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export default function Navbar() {
  return (
    <div className='navbar text-white text-base z-10 w-full right-0 top-0 py-[11.5px] bg-[#151B20] border-0'>
        <div className='container'>
            <div className='navbar_wrap flex items-center justify-between'>
                <div className='navbar-right pl-3'>
                    <p className='font-bold'>به رستوران Etar خوش آمدید. ما همه روزه در ساعت 9:00 صبح باز و در 12:00 شب بسته می شویم.</p>
                </div>
                <div className='navbar-left px-3'>
                    <ul className='flex justify-center'>
                       <li className='inline-block relative pl-[15px] ml-[9px] after:absolute after:content-[""] after:top-1/2 after:left-[3px] after:w-[1px] after:h-[18px] after:bg-white after:bg-opacity-30 after:-translate-y-1/2'>
                          <a className='hover:text-orange-250' href="#">
                            <FaFacebookF className='text-[17px]' />
                          </a>
                       </li>
                       <li className='inline-block relative pl-[15px] ml-[9px] after:absolute after:content-[""] after:top-1/2 after:left-[3px] after:w-[1px] after:h-[18px] after:bg-white after:bg-opacity-30 after:-translate-y-1/2'>
                          <a className='hover:text-orange-250' href="#">
                            <FaXTwitter className='text-[17px]' />
                          </a>
                       </li>
                       <li className='inline-block relative pl-[15px] ml-[9px] after:absolute after:content-[""] after:top-1/2 after:left-[3px] after:w-[1px] after:h-[18px] after:bg-white after:bg-opacity-30 after:-translate-y-1/2'>
                          <a className='hover:text-orange-250' href="#">
                            <FaLinkedinIn className='text-[17px]' />
                          </a>
                       </li>
                       <li className='inline-block relative'>
                          <a className='hover:text-orange-250' href="#">
                            <FaWhatsapp className='text-[17px]' />
                          </a>
                       </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}
