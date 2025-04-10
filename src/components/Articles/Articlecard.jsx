import React from 'react'

export default function Articlecard({date, imgUrl, desc}) {
    return (
        <div className='blog-card-wrap w-[33.33%] px-3'>
            <div className='blog-card relative mb-[30px]'>
                <div className='mb-[25px] rounded-[5px] overflow-hidden group'>
                    <img className='transition-all duration-200 ease-linear group-hover:scale-105' src={imgUrl} />
                    <a className='absolute left-[40px] top-0 flex items-center justify-center text-center w-[102px] text-2xl text-orange-250 leading-[30px] py-[11.5px] px-3.5 bg-[#0C0D12] rounded-custom transition-all duration-200 ease-linear group-hover:text-white group-hover:bg-orange-250' href="#">{date}</a>
                </div>
                <ul className='mb-4 '>
                    <li className='inline-block relative pl-[15px] ml-3 text-white font-bold after:absolute after:content-[""] after:top-[55%] after:left-0 after:w-[1px] after:h-3.5 after:-translate-y-1/2 after:bg-[#D2D2D2]'>از
                        <a className='mr-[5px] transition-all duration-300 ease-in-out hover:text-orange-250' href="#">ادمین</a>
                    </li>
                    <li className='inline-block pl-[15px] font-bold ml-0'>بدون نظر</li>
                </ul>
                <h3 className='text-white text-[26px] font-bold leading-tight w-[370px]'>
                    <a className='transition-all duration-300 ease-in-out hover:text-orange-250' href="#">{desc}</a>
                </h3>
            </div>
        </div>
    )
}
