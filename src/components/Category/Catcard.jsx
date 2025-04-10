import React from 'react'

export default function Catcard({imgUrl,name}) {
    return (
        <div className='cat-card relative flex flex-col items-center justify-center w-[20%] mb-[30px] group'>
            <div className='cat-img flex items-center justify-center flex-col relative w-[220px] h-[220px] rounded-[50%] mr-auto ml-auto transition-all duration-200 ease-linear group-hover:top-[-5px]'>
                <img className='w-[170px] h-[170px] rounded-[50%] mr-auto ml-auto' src={imgUrl} />
            </div>
            <h3 className='mt-[30px] text-white text-2xl font-bold transition-all duration-200 ease-linear group-hover:text-orange-250'>{name}</h3>
            <a className='absolute h-full w-full top-0 right-0' href=""></a>
        </div>
    )
}
