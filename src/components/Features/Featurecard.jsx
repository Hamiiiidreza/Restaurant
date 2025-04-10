import React from 'react'

export default function Featurecard({imgUrl, title}) {

    return (
        <div className='feature-card relative w-[25%] mb-[30px] pr-5 first:pr-0 after:absolute after:content-[""] after:top-1/2 after:left-0 after:w-[1px] after:h-[300px] after:bg-[#fff8f11a] after:-translate-y-1/2 last:after:hidden'>
            <div className='feature-icon mb-8'>
                <img src={imgUrl} alt="featureimg1" />
            </div>
            <h3 className='font-semibold text-[28px] text-white mb-[15px]'>{title}</h3>
            <p className='pl-[15px] mb-[18px] font-bold w-[269px]'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
            <p className='pl-[15px] mb-[18px] font-bold'>
                <a className='relative text-base text-zinc-600 font-bold transition-all duration-300 ease-in hover:text-orange-250 after:absolute after:content-[""] after:bg-zinc-600 after:w-full after:bottom-[-3px] after:right-0 after:h-[1px] after:transition-all after:duration-300 after:ease-in after:hover:bg-orange-250' href="#">بیشتر</a>
            </p>
        </div>
    )
}
