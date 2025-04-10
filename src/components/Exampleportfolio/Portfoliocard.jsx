import React from 'react'
import { FaPlus } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Portfoliocard({imgUrl, title, name}) {
    return (
       {/* <div className='w-[25%] px-3'>
            <div className='portfolio-card mb-[55px] group'>
                <a href={imgUrl} className='relative block rounded-[10px] overflow-hidden after:absolute after:content-[""] after:top-0 after:right-0 after:w-0 after:h-full after:border after:border-solid after:border-white after:border-opacity-15 after:transition-all after:duration-500 after:ease-in-out after:rounded-[10px] after:opacity-0 after:bg-[#151b20d6] after:group-hover:opacity-100 after:group-hover:w-full'>
                    <img className='rounded-[10px]' src={imgUrl} alt="portfolio-img-1" />
                    <span className='absolute flex flex-col justify-center items-center size-14 top-[60%] right-[50%] translate-x-1/2 -translate-y-1/2 bg-orange-250 transition-all duration-300 ease-in delay-200 z-10 rounded-[50%] opacity-0 group-hover:opacity-100 group-hover:top-[50%]'>
                        <FaPlus className='text-lg text-white font-thin' />
                    </span>
                </a>
                <h3 className='text-white text-2xl mt-[23px] mb-[7px] font-bold'>
                    <Link className='taransition-all duration-200 ease-in hover:text-orange-250' to="">{title}</Link>
                </h3>
                <span className='text-orange-250'>{name}</span>
            </div>
        </div>*/}
    )
}
