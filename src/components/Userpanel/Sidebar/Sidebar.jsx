import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LuLayoutPanelLeft } from "react-icons/lu";
import { IoReorderFour } from "react-icons/io5";
import { MdUpdate } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";

export default function Sidebar() {


    return (
        <div className='sidebar '>
            <ul className="sidebar__list space-y-2 divide-y divide-white divide-opacity-10 mb-10">
                <li className="sidebar__item py-6 flex items-center justify-between transition-all ease-in hover:text-gray-400 cursor-pointer">
                    <Link to='/my-account/' className='sidebar__link flex items-center gap-2 '>
                        <LuLayoutPanelLeft className='size-5' />
                        پنل کاربری
                    </Link>
                    <MdOutlineKeyboardArrowLeft className='size-6' />
                </li>
                <li className="sidebar__item py-6 flex items-center justify-between transition-all ease-in hover:text-gray-400 cursor-pointer">
                    <Link to='/my-account/orders' className='sidebar__link flex items-center gap-2'>
                        <IoReorderFour className='size-5' />
                        سفارشات قبلی
                    </Link>
                    <MdOutlineKeyboardArrowLeft className='size-6' />
                </li>
                <li className="sidebar__item py-6 flex items-center justify-between transition-all ease-in hover:text-gray-400 cursor-pointer">
                    <Link to='/my-account/new-order' className='sidebar__link flex items-center gap-2'>
                        <MdUpdate className='size-5' />
                        سفارش جدید
                    </Link>
                    <MdOutlineKeyboardArrowLeft className='size-6' />
                </li>
                <li className="sidebar__item py-6 flex items-center justify-between transition-all ease-in hover:text-gray-400 cursor-pointer">
                    <Link to='/my-account/reviews' className='sidebar__link flex items-center gap-2'>
                        <FaRegComments className='size-5' />
                        نظرات
                    </Link>
                    <MdOutlineKeyboardArrowLeft className='size-6' />
                </li>
                <li className="sidebar__item py-6 flex items-center justify-between transition-all ease-in hover:text-gray-400 cursor-pointer">
                    <Link to='/my-account/table-Reservation' className='sidebar__link flex items-center gap-2'>
                        <BsCalendar2DateFill className='size-5' />
                        رزرو میز
                    </Link>
                    <MdOutlineKeyboardArrowLeft className='size-6' />
                </li>
                <li className="sidebar__item py-6 flex items-center justify-between transition-all ease-in hover:text-gray-400 cursor-pointer">
                    <Link to='/my-account/discounts' className='sidebar__link flex items-center gap-2'>
                        <RiDiscountPercentLine className='size-5' />
                        تخفیف ها
                    </Link>
                    <MdOutlineKeyboardArrowLeft className='size-6' />
                </li>
                <li className="sidebar__item pt-6 flex items-center justify-between transition-all ease-in hover:text-gray-400 cursor-pointer">
                    <Link to='/my-account/settings' className='sidebar__link flex items-center gap-2'>
                        <IoSettingsSharp className='size-5' />
                        تنظیمات حساب
                    </Link>
                    <MdOutlineKeyboardArrowLeft className='size-6' />
                </li>
            </ul>
        </div>
    )
}
