import React from 'react'

export default function Briefitem({title, name1, name2}) {
    return (
        <div className='portfolio-brief_item relative w-[25%] pr-10 pl-5 mb-[25px] after:absolute after:content-[""] after:top-[50%] after:left-0 after:w-[22px] after:h-[127px] after:-translate-y-1/2 after:bg-[url(https://rtlme.ir/Etar/assets/img/shape-16.webp)] after:bg-no-repeat after:bg-center after:bg-custom last:after:hidden'>
            <h4 className='relative text-white text-xl font-bold mb-[10px] before:absolute before:content-[""] before:top-[9px] before:right-[-22px] before:size-3.5 before:rounded-[50%] before:border before:border-solid before:border-orange-250 after:absolute after:content-[""] after:size-1.5 after:top-[13px] after:right-[-18px] after:rounded-[50%] after:bg-orange-250'>{title}</h4>
            <a className='block text-white' href="">{name1}</a>
            <span className='block text-white'>{name2}</span>
        </div>
    )
}
