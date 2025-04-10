import React from 'react'

export default function Coffeeitem({ name, desc, price }) {
    return (
            <div className='coffeeitem mb-[39px]'>
                <div className='coffee-title relative flex items-center justify-between mb-[22px] z-10 after:absolute after:content-[""] after:top-1/2 after:right-0 after:w-full after:h-[1px] after:border after:border-dashed after:border-white after:border-opacity-35 after:-z-10'>
                    <h3 className='text-white text-[32px] font-bold bg-[#000] pl-[22px]'>{name}</h3>
                    <h6 className='text-orange-250 text-[32px] font-bold bg-[#000] pr-[22px]'>{price}</h6>
                </div>
                <span className='text-xl text-white'>{desc}</span>
            </div>
    )
}
