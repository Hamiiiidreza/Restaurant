import React from 'react'
import Articlecard from './Articlecard'

export default function Articles() {

  const blogs = [
    {id:1, date:'۱۸ فروردین', imgUrl:'../Img/blog-img-1.webp', desc:'بهترین رویدادهای رستوران ما با غذا های عالی'},
    {id:2, date:'۲۰ فروردین', imgUrl:'../Img/blog-img-2.webp', desc:'سس های درجه یک برای آب شدن گوشت در دهان"'},
    {id:3, date:'۲۵ فروردین"', imgUrl:'../Img/blog-img-3.webp', desc:'طراحی داخلی جدید در رستوران شاندیز"'}
  ]

  return (
    <div className='blog relative pt-[130px] pb-[100px] z-10 '>
      <div className='absolute bg-[url(https://rtlme.ir/Etar/assets/img/shape-5.webp)] bg-center bg-repeat-y bg-contain w-full h-full right-1/2 translate-x-1/2 -z-10 top-0'></div>
      <div className='container'>
        <div className='blog-title'>
          <div className='w-[50%] px-3'>
            <h2 className='text-white text-6xl font-bold mb-[30px] w-[566px] leading-tight '>مقالات مفید از وبلاگ ما</h2>
          </div>
        </div>
        <div className='blog-content-wrap flex items-center justify-center'>
            <Articlecard {...blogs[0]} />
            <Articlecard {...blogs[1]} />
            <Articlecard {...blogs[2]} />
        </div>
      </div>
    </div>
  )
}
