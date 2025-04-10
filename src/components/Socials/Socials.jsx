import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export default function Socials() {
    return (
            <ul className='inline-flex items-center justify-end gap-1 ml-5'>
                <li className='inline-block'>
                    <a href="#" className='footer-bottom_link-icon text-orange-250 hover:text-white transition-colors flex items-center justify-center bg-[#1A1B20] w-[34px] h-[34px] z-10 rounded-[50%] overflow-hidden'>
                        <FaFacebookF className='text-[17px]' />
                    </a>
                </li>
                <li className='inline-block'>
                    <a href="#" className='footer-bottom_link-icon text-orange-250 hover:text-white transition-colors flex items-center justify-center bg-[#1A1B20] w-[34px] h-[34px] z-10 rounded-[50%] overflow-hidden'>
                        <FaXTwitter className='text-[17px]' />
                    </a>
                </li>
                <li className='inline-block'>
                    <a href="#" className='footer-bottom_link-icon text-orange-250 hover:text-white transition-colors flex items-center justify-center bg-[#1A1B20] w-[34px] h-[34px] z-10 rounded-[50%] overflow-hidden'>
                        <FaLinkedinIn className='text-[17px]' />
                    </a>
                </li>
                <li className='inline-block'>
                    <a href="#" className='footer-bottom_link-icon text-orange-250 hover:text-white transition-colors flex items-center justify-center bg-[#1A1B20] w-[34px] h-[34px] z-10 rounded-[50%] overflow-hidden'>
                        <FaInstagram className='text-[17px]' />
                    </a>
                </li>
                <li className='inline-block'>
                    <a href="#" className='footer-bottom_link-icon text-orange-250 hover:text-white transition-colors flex items-center justify-center bg-[#1A1B20] w-[34px] h-[34px] z-10 rounded-[50%] overflow-hidden'>
                        <FaWhatsapp className='text-[17px]' />
                    </a>
                </li>
            </ul>
    )
}
