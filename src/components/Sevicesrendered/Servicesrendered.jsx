import React from 'react'
import { Link } from 'react-router-dom'

export default function Servicesrendered() {
  return (
    <div className='servicesrendered py-[130px] bg-[#151B20]'>
        <div className='container'>
            <div className='servicesrendered-wrap flex'>
                <div className='service-right w-[50%] pl-3'>
                    <img className='w-full h-full rounded-[50px] overflow-hidden bg-center bg-cover bg-no-repeat' src="../Public/Img/servicesrendered-img-1.webp" alt="services1" />
                </div>
                <div className='service-left w-[50%] px-3'>
                    <div className='servicesrendered-content-wrap'>
                        <div className='servicesrendered-content relative z-10 pr-[50px] pb-10 mr-[-88px] mb-[25px]  before:absolute before:content-[""] before:top-0 before:right-0 before:w-1/2 before:h-full before:-z-10 before:rounded-t-[33px] before:rounded-r-[33px] before:rounded-b-[33px] before:rounded-l-none before:bg-[#151B20]'>
                            <h2 className='text-white text-6xl font-bold leading-tight mb-4'>غذاهای دریایی با طعم های برتر از زیر دریا</h2>
                            <p className='mb-4'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است </p>
                            <p className='mb-4'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است</p>
                            <Link to='/About' className='service-btn relative inline-flex items-center justify-center mt-5 text-white text-center bg-orange-250 py-[15px] px-8 z-10 leading-none font-bold overflow-hidden rounded-[50px] before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[0%] before:-z-10 before:rounded-[5px] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:duration-300 before:ease-in before:hover:bg-[#732701] before:hover:w-[110%] before:hover:h-[110%]'>بیشتر بدانید</Link>
                        </div>
                        <div className='servicesrendered-img'>
                            <img src="../Public/Img/servicesrendered-img-2.webp" alt="services2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
