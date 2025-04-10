import React from 'react'

export default function Menucard({ imgUrl, name, price }) {
    return (
        <div className='menu-card flex items-center mb-[39px] '>
            <div className='menu-img w-[136px] rounded-[10px] overflow-hidden'>
                <img src={imgUrl} />
            </div>
            <div className='menu-info relative top-[3px] w-[calc(100%-160px)] mr-6 '>
                <div className='relative flex items-center justify-between mb-4 z-10 after:absolute after:content-[""] after:top-1/2 after:right-0 after:w-full after:h-[1px] after:border after:border-dashed after:border-white after:-z-10'>
                    <h3 className='text-white text-2xl bg-[#151B20] pl-[18px]'>{name}</h3>
                    <h6 className='text-orange-250 text-2xl bg-[#151B20] pr-[22px]'>{price}</h6>
                </div>
                <a className='block text-white transition-all duration-300 ease-in hover:text-orange-250' href="#">لورم ایپسوم متن ساختگی با</a>
                <a className='block text-white transition-all duration-300 ease-in hover:text-orange-250' href="#">لورم ایپسوم</a>
            </div>
        </div>
    )
}
