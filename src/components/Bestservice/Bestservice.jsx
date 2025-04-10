import React from 'react'
import { Link } from 'react-router-dom'

export default function Bestservice() {
  return (
    <div className='bestservice pt-[130px] pb-[100px]'>
      <div className='container'>
        <h2 className='text-white text-6xl font-bold mb-[36px]'>بهترین خدمات ممکن</h2>
        <div className='pricing-wrap flex'>
          <div className='w-[33.33%] px-3'>
            <div className='pricing-card py-[60px] px-[30px] rounded-[10px] mb-[30px] bg-[#151B20] text-center'>
              <h3 className='text-white text-[32px] font-bold mb-[15px] '>خدمات طلایی</h3>
              <h2 className='relative text-fill-1 text-stroke-1 text-6xl font-bold pb-8 border-b border-solid border-white border-opacity-10
               before:absolute before:content-[""] before:bottom-[-13px] before:right-1/2 before:w-[26px] before:h-[26px] before:border before:border-solid before:border-white before:border-opacity-10 before:rounded before:translate-x-1/2 after:absolute after:content-[""] after:bottom-[-7px] after:right-1/2 after:size-3.5 after:bg-orange-250 after:rounded-[3px] after:translate-x-1/2'>
                ۶۰۰۰۰ تومان
                <span className='inline-block text-fill-2 text-stroke-2 mr-[-10px] text-base text-white'>/به ازای هر نفر</span>
              </h2>
              <ul className='my-8'>
                <li className='mb-2'>رزرو ۲ میز</li>
                <li className='mb-2'>پیشخدمت های چند زبانه</li>
                <li>خدمات پریمیوم</li>
              </ul>
              <Link to='' className='pricing-btn relative text-white font-bold bg-[#ffffff21] py-[15px] px-8 leading-none z-10 overflow-hidden rounded-[50px] transition-all duration-300 ease-in before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[110%] before:-z-10 before:rounded-[5px] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:duration-300 before:ease-in before:hover:bg-orange-250'>رزرو کنید</Link>
            </div>
          </div>
          <div className='w-[33.33%] px-3'>
            <div className='pricing-card py-[60px] px-[30px] rounded-[10px] mb-[30px] bg-[#151B20] text-center'>
              <h3 className='text-white text-[32px] font-bold mb-[15px] '>خدمات الماسی</h3>
              <h2 className='relative text-fill-1 text-stroke-1 text-6xl font-bold pb-8 border-b border-solid border-white border-opacity-10
               before:absolute before:content-[""] before:bottom-[-13px] before:right-1/2 before:w-[26px] before:h-[26px] before:border before:border-solid before:border-white before:border-opacity-10 before:rounded before:translate-x-1/2 after:absolute after:content-[""] after:bottom-[-7px] after:right-1/2 after:size-3.5 after:bg-orange-250 after:rounded-[3px] after:translate-x-1/2'>
                ۱۲۰۰۰ تومان 
                <span className='inline-block text-fill-2 text-stroke-2 mr-[-10px] text-base text-white'>/به ازای هر نفر</span>
              </h2>
              <ul className='my-8'>
                <li className='mb-2'>فقط خدمات پرمیوم</li>
                <li className='mb-2'>اجاره سالن ۲۰ نفره</li>
                <li>پیشخدمت های چند زبانه</li>
                <li>بهترین آشپز شخصی</li>
              </ul>
              <Link to='' className='pricing-btn relative text-white font-bold bg-[#ffffff21] py-[15px] px-8 leading-none z-10 overflow-hidden rounded-[50px] transition-all duration-300 ease-in before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[110%] before:-z-10 before:rounded-[5px] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:duration-300 before:ease-in before:hover:bg-orange-250'>رزرو کنید</Link>
            </div>
          </div>
          <div className='w-[33.33%] px-3'>
            <div className='pricing-card py-[60px] px-[30px] rounded-[10px] mb-[30px] bg-[#151B20] text-center'>
              <h3 className='text-white text-[32px] font-bold mb-[15px] '>خدمات طلایی</h3>
              <h2 className='relative text-fill-1 text-stroke-1 text-6xl font-bold pb-8 border-b border-solid border-white border-opacity-10
               before:absolute before:content-[""] before:bottom-[-13px] before:right-1/2 before:w-[26px] before:h-[26px] before:border before:border-solid before:border-white before:border-opacity-10 before:rounded before:translate-x-1/2 after:absolute after:content-[""] after:bottom-[-7px] after:right-1/2 after:size-3.5 after:bg-orange-250 after:rounded-[3px] after:translate-x-1/2'>
                ۶۰۰۰۰ تومان
                <span className='inline-block text-fill-2 text-stroke-2 mr-[-10px] text-base text-white'>/به ازای هر نفر</span>
              </h2>
              <ul className='my-8'>
                <li className='mb-2'>رزرو میز</li>
                <li className='mb-2'>پیشخدمت شخصی</li>
                <li>خدمات پریمیوم</li>
              </ul>
              <Link to='' className='pricing-btn relative text-white font-bold bg-[#ffffff21] py-[15px] px-8 leading-none z-10 overflow-hidden rounded-[50px] transition-all duration-300 ease-in before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[110%] before:-z-10 before:rounded-[5px] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:duration-300 before:ease-in before:hover:bg-orange-250'>رزرو کنید</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
