import React from 'react'

export default function Bgmildcard({ imgUrl, name }) {
    return (
        <div className='feature-card relative flex items-center justify-between w-1/4 pb-[30px] group'>
            <div className='feature-icon relative flex items-center bg-[#0E1317] w-[85px] h-[85px] top-[-4px] p-5 rounded-[50%] transition-all duration-300 ease-in group-hover:bg-[#732701]'>
                <img src={imgUrl} />
            </div>
            <div className='feature-info w-custom mr-[15px]'>
                <h3 className='text-white text-[23px] font-bold mb-[10px] '>{name}</h3>
                <p className='pl-[10px]'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
            </div>
        </div>
    )
}
