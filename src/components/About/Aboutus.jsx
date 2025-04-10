import React from 'react'

export default function Aboutus() {
  return (
    <div className='about relative'>
       <img className='absolute top-[10%] left-0 -z-10' src="../../Public/Img/about-img-1.webp" alt="aboutimg1" />
       <div className='about-bg-shape absolute top-0 -z-10 bg-[url(https://rtlme.ir/Etar/assets/img/shape-5.webp)] bg-center bg-repeat-y bg-contain w-full h-full'></div>
       <div className='container'>
           <div className='about-wrap flex items-center justify-between'>
               <div className='about-right w-[60%] pl-3'>
                   <img className='bg-center object-custom-x bg-cover object-cover bg-no-repeat bg-[#ddd] mr-[-40px] w-full h-[830px]' src="../../Public/Img/about-img-2.webp" alt="aboutimg2" /> 
               </div>
               <div className='about-left w-[50%] px-3 ml-[102px]'>
                   <div className='about-content text-center pr-[100px]'>
                       <h2 className='mb-4 text-white text-6xl font-bold w-[385px]'> غذای عالی رستوران شاندیز برای شما</h2>
                       <p className='block text-center text-base mb-[15px] w-[385px]'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                       <p className='block text-center text-base mb-[15px] w-[385px]'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است</p>
                       <a className='about-btn inline-flex items-center justify-center mt-[46px] text-white text-center bg-orange-250 py-[15px] px-8 z-10 leading-none font-bold overflow-hidden rounded-[50px]' href="">بیشتر بدانید</a>
                   </div>
               </div>
           </div>
       </div>
    </div>
  )
}
