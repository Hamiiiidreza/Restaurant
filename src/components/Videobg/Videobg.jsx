import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaPlay } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function Videobg() {

  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, {
        autoAlpha: 0,
        y: 50
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      className='relative bg-[url(../Img/video-bg.webp)] z-10 h-[600px] bg-center bg-cover bg-no-repeat after:absolute after:content-[""] after:top-0 after:right-0 after:w-full after:h-full after:bg-[#12131b73] after:-z-10'
      ref={containerRef}
    >
      <div className='absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 z-10 text-center group'>
        <span className='flex flex-col items-center justify-center w-[110px] h-[110px] rounded-[50%] border border-white mr-auto ml-auto group-hover:bg-orange-250 hover:border-none transition-all duration-200 ease-linear before:absolute before:content-[""] before:delay-100 before:top-[34.5%] before:right-[49.5%] before:w-[110px] before:h-[110px] before:translate-x-1/2 before:-translate-y-1/2 before:origin-center before:rounded-[50%] before:shadow-custom before:animate-custom'>
          <FaPlay className='text-2xl' />
        </span>
        <span className='block text-4xl font-extrabold mt-[22px] transition-all duration-200 ease-linear group-hover:text-orange-250'>پخش ویدیو</span>
        <a className='absolute h-full w-full right-0 top-0' href=""></a>
      </div>
    </div>
  )
}
