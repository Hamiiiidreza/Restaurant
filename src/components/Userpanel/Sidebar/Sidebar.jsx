import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LuLayoutPanelLeft } from "react-icons/lu";
import { IoReorderFour } from "react-icons/io5";
import { MdUpdate } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { FaRegComments } from "react-icons/fa";
import { BsCalendar2DateFill } from "react-icons/bs";
import { RiDiscountPercentLine } from "react-icons/ri";
import { IoSettingsSharp } from "react-icons/io5";
import containerContext from '@/Context/containerContext';


export default function Sidebar() {
    const contextData = useContext(containerContext);
    const location = useLocation();

    // تابع برای بررسی اکتیو بودن منو
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className='sidebar'>
            <ul className="sidebar__list space-y-2 divide-y divide-white divide-opacity-10 mb-10">
                {[
                    { path: '/my-account/', name: 'پنل کاربری', icon: <LuLayoutPanelLeft className='size-5' /> },
                    { path: '/my-account/orders', name: 'سفارشات قبلی', icon: <IoReorderFour className='size-5' /> },
                    { path: '/my-account/new-order', name: 'سفارش جدید', icon: <MdUpdate className='size-5' /> },
                    { path: '/my-account/reviews', name: 'نظرات', icon: <FaRegComments className='size-5' /> },
                    { path: '/my-account/table-Reservation', name: 'رزرو میز', icon: <BsCalendar2DateFill className='size-5' /> },
                    { path: '/my-account/discounts', name: 'تخفیف ها', icon: <RiDiscountPercentLine className='size-5' /> },
                    { path: '/my-account/settings', name: 'تنظیمات حساب', icon: <IoSettingsSharp className='size-5' /> },
                ].map((item, index) => (
                    <li
                        key={index}
                        className={`
              sidebar__item py-6 flex items-center justify-between 
              transition-all ease-in cursor-pointer
              group relative
              ${isActive(item.path) ? 'text-orange-250' : 'hover:text-orange-250'}
            `}
                    >
                        {isActive(item.path) && (
                            <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-orange-250 rounded-l-lg"></div>
                        )}

                        <Link
                            to={item.path}
                            className="sidebar__link flex items-center gap-2"
                             onClick={contextData.startSkeleton}
                        >
                            {item.icon}
                            {item.name}
                        </Link>

                        <MdOutlineKeyboardArrowLeft
                            className={`size-6 ${isActive(item.path) ? 'text-orange-250' : 'group-hover:text-orange-250'}`}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
