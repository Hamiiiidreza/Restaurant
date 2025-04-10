import React from 'react'

export default function Recipecard({imgUrl,name,price}) {
    return (
        <div className='products flex items-center mb-[30px]'>
            <div className='recipe-img w-[165px] h-[165px] rounded-[10px] overflow-hidden'>
                <img src={imgUrl} alt="recipeimg3" />
            </div>
            <div className='recipe-info grow mr-5'>
                <div className='recipe-title flex items-center justify-between mb-[29px] z-10'>
                    <h3 className='pl-2.5 bg-[#12131B] text-white text-2xl font-bold'>{name}</h3>
                    <h6 className='pr-[22px] bg-[#12131B] text-orange-250 text-2xl font-bold'>{price}</h6>
                </div>
                <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
            </div>
        </div>
    )
}
