import React from 'react';
import { Link } from 'react-router-dom';

export default function Catcard({ id, imgUrl, name }) {
    return (
        <div className='cat-card relative flex flex-col items-center justify-center mb-[30px] group w-full'>
            {/* تغییرات در استایل‌ها برای سازگاری با Swiper */}
            <div className='cat-img flex items-center justify-center flex-col relative w-[220px] h-[220px] rounded-[50%] mx-auto transition-all duration-200 ease-linear group-hover:top-[-5px]'>
                <img
                    className='w-[170px] h-[170px] rounded-[50%] object-cover'
                    src={imgUrl}
                    alt={name}
                />
            </div>
            <h3 className='mt-[30px] text-white text-2xl font-bold transition-all duration-200 ease-linear group-hover:text-orange-250 text-center'>
                {name}
            </h3>
            <Link className='absolute inset-0' to={`/Store/Shopdetails/${id}`}></Link>
        </div>
    );
}
