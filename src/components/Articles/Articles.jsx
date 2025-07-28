import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Articlecard from './Articlecard'

gsap.registerPlugin(ScrollTrigger);

export default function Articles() {

  const blogs = [
    {id:1, date:'۱۸ فروردین', imgUrl:'../Img/blog-img-1.webp', desc:'بهترین رویدادهای رستوران ما با غذا های عالی'},
    {id:2, date:'۲۰ فروردین', imgUrl:'../Img/blog-img-2.webp', desc:'سس های درجه یک برای آب شدن گوشت در دهان"'},
    {id:3, date:'۲۵ فروردین"', imgUrl:'../Img/blog-img-3.webp', desc:'طراحی داخلی جدید در رستوران شاندیز"'}
  ]

   const containerRef = useRef(null);
    const titleRef = useRef(null);
    const articleRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !titleRef.current || !articleRef.current) return;
    
        const ctx = gsap.context(() => {
          // انیمیشن برای عنوان
          gsap.fromTo(titleRef.current, {
            autoAlpha: 0,
            y: 50
          }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          });
    
          // انیمیشن برای مقاله ها
          const blogCards = articleRef.current.querySelectorAll('.blog-card');
            gsap.fromTo(blogCards, {
              autoAlpha: 0,
              x: 50
            }, {
              autoAlpha: 1,
              x: 0,
              duration: 0.6,
              stagger: {
                each: 0.2, // تنظیم دقیق‌تر stagger
                from: "start" // جهت انیمیشن
            },
              scrollTrigger: {
                trigger: articleRef.current,
                start: "top 80%",
                toggleActions: "play none none none"
              }
            });
          
        }, containerRef);
    
        return () => ctx.revert();
      }, []);

  return (
    <div className='blog relative pt-[130px] pb-[100px] z-10' ref={containerRef}>
      <div className='absolute bg-[url(https://rtlme.ir/Etar/assets/img/shape-5.webp)] bg-center bg-repeat-y bg-contain w-full h-full right-1/2 translate-x-1/2 -z-10 top-0'></div>
      <div className='container'>
        <div className='blog-title' ref={titleRef}>
          <div className='w-[50%] px-3'>
            <h2 className='text-white text-6xl font-bold mb-[30px] w-[566px] leading-tight '>مقالات مفید از وبلاگ ما</h2>
          </div>
        </div>
        <div className='blog-content-wrap flex items-center justify-center' ref={articleRef}>
            <Articlecard {...blogs[0]} />
            <Articlecard {...blogs[1]} />
            <Articlecard {...blogs[2]} />
        </div>
      </div>
    </div>
  )
}
