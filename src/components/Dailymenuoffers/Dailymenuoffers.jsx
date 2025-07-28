import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Menucard from './Menucard';

gsap.registerPlugin(ScrollTrigger);

export default function Dailymenuoffers() {

  const customFishes = [
     {id:1,name:'گوش ماهی خام', imgUrl:'../Public/Img/dailymenu-img-1.webp', price:'۴۰۰۰۰ تومان'},
     {id:2,name:'ماهی دریایی', imgUrl:'../Public/Img/dailymenu-img-2.webp', price:'۴۰۰۰۰ تومان'},
     {id:3,name:'اختاپوس نرم و رازیانه', imgUrl:'../Public/Img/dailymenu-img-3.webp', price:'۵۰۰۰۰ تومان'},
     {id:4,name:'کنگر نازک برش خورده', imgUrl:'../Public/Img/dailymenu-img-4.webp', price:'۵۰۰۰۰ تومان'}
  ]

  const menuCardRef = useRef(null);

  useEffect(() => {
      if (!menuCardRef.current) return;
  
      const ctx = gsap.context(() => {
        gsap.fromTo(menuCardRef.current, {
          autoAlpha: 0,
          y: 50
        }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: menuCardRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        });
      }, menuCardRef);
  
      return () => ctx.revert();
    }, []);

  return (
    <div className='dailymenuoffers relative py-[130px] z-10 bg-[#0E1317]'>
        <img className='absolute top-0 left-0 h-full' src="https://rtlme.ir/Etar/assets/img/recipes/recipe-section-shape.webp" alt="dailyimg" />
        <div className='container'>
            <div className='row flex items-center'>
                <div className='col-xl-6 col-lg-7 px-3'>
                    <h2 className='text-white text-6xl font-bold mb-10 w-[566px] leading-tight'>منوی پیشنهادات روزانه ما را امتحان کنید</h2>
                    <div className='mb-10' ref={menuCardRef}>
                        <Menucard {...customFishes[0]} />
                        <Menucard {...customFishes[1]} />
                        <Menucard {...customFishes[2]} />
                        <Menucard {...customFishes[3]} />
                    </div>
                </div>
                <div className='col-xl-6 col-lg-5 px-3'>
                    <div className='dailymenu-img-wrap'>
                        <img src="../Public/Img/dailymenu-img-5.webp" alt="dailymenuimg5" />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
