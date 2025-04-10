import React from 'react'
import Catcard from './Catcard'

export default function Category() {

const customFoods = [
  {id:1, name:'سالاد سزار', imgUrl:'../Img/cat-img-1.webp'},
  {id:2, name:'سالاد فصل', imgUrl:'../Img/cat-img-2.webp'},
  {id:3, name:'استیک', imgUrl:'../Img/cat-img-3.webp'},
  {id:4, name:'برگر ایتالیایی', imgUrl:'../Img/cat-img-4.webp'},
  {id:5, name:'مرغ سوخاری', imgUrl:'../Img/cat-img-5.webp'}
]

  return (
    <div className='category relative pt-[130px] pb-[100px]'>
       <div className='category-bg-shape absolute top-0 -z-10 bg-[url(https://rtlme.ir/Etar/assets/img/shape-5.webp)] bg-center bg-repeat-y bg-contain w-full h-full'></div>
       <div className='container'>
           <div className='category-title'>
               <div className='category-title-wrap w-[100%] flex items-center justify-center max-w-full'>
                   <h2 className='text-white text-6xl font-bold w-[570px] leading-tight mb-10 text-center'>غذای مورد علاقه خود را پیدا کنید</h2>
               </div>
           </div>
           <div className='category-card-wrapp flex'>
              <Catcard {...customFoods[0]} />
              <Catcard {...customFoods[1]} />
              <Catcard {...customFoods[2]} />
              <Catcard {...customFoods[3]} />
              <Catcard {...customFoods[4]} />
           </div>
       </div>
    </div>
  )
}
