import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial({ bgColor }) {

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
            className={`testimonial relative py-[130px] bg-[${bgColor}] overflow-hidden`}
            ref={containerRef}
        >
            <img className='absolute bottom-[65px] opacity-10 right-0' src="https://rtlme.ir/Etar/assets/img/shape-12.webp" alt="testimonialshape1" />
            <img className='absolute top-[45px] right-[52%] translate-x-1/2 opacity-10' src="https://rtlme.ir/Etar/assets/img/shape-13.webp" alt="testimonialshape2" />
            <div className='container relative'>
                <div className='testimonial-slider h-auto'>
                    <div className='swiper-wrapper flex flex-col items-center relative h-[328px] cursor-grab w-full z-10 '>
                        <div className='swiper-slide relative'>
                            <div className='testimonial-card text-center'>
                                <ul className='mb-[5px]'>
                                    <li className='inline-block ml-1'>
                                        <img className='' src="https://rtlme.ir/Etar/assets/img/icons/star.svg" alt="testimonialsvg" />
                                    </li>
                                    <li className='inline-block ml-1'>
                                        <img className='' src="https://rtlme.ir/Etar/assets/img/icons/star.svg" alt="testimonialsvg" />
                                    </li>
                                    <li className='inline-block ml-1'>
                                        <img className='' src="https://rtlme.ir/Etar/assets/img/icons/star.svg" alt="testimonialsvg" />
                                    </li>
                                    <li className='inline-block ml-1'>
                                        <img className='' src="https://rtlme.ir/Etar/assets/img/icons/star.svg" alt="testimonialsvg" />
                                    </li>
                                    <li className='inline-block ml-1'>
                                        <img className='' src="https://rtlme.ir/Etar/assets/img/icons/star.svg" alt="testimonialsvg" />
                                    </li>
                                </ul>
                                <span className='font-bold'>۴.۸/۵.۰</span>
                                <h2 className='my-5 font-semibold text-white text-[40px]'>آنچه مهمانان ما می گویند</h2>
                                <p className='text-xl text-white leading-[30px] mt-[30px] mx-auto mb-[45px] py-0 px-[30px] max-w-[90%]'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد</p>
                                <h5 className='mb-[5px] text-white text-2xl font-normal'>ستاره رحیمی</h5>
                                <span className='block'>خبرنگار</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='slider-btn absolute flex items-center justify-between top-[53%] w-full'>
                    <div className='next-btn relative flex items-center justify-center z-10 -translate-y-1/2 w-[50px] h-[50px] rounded-[50%] overflow-hidden cursor-pointer bg-[#24252A] transition-all duration-200 ease-linear after:absolute after:content-[""] after:top-0 after:right-0 after:w-0 after:h-full after:-z-10 after:transition-all after:duration-300 after:ease-in after:hover:bg-orange-250 after:hover:h-full after:hover:w-full'>
                        <IoIosArrowForward className='text-white text-xl font-bold' />
                    </div>
                    <div className='prev-btn relative flex items-center justify-center z-10 -translate-y-1/2 w-[50px] h-[50px] rounded-[50%] overflow-hidden cursor-pointer bg-[#24252A] transition-all duration-200 ease-linear after:absolute after:content-[""] after:top-0 after:right-0 after:w-0 after:h-full after:-z-10 after:transition-all after:duration-300 after:ease-in after:hover:bg-orange-250 after:hover:h-full after:hover:w-full'>
                        <IoIosArrowBack className='text-white text-xl font-bold' />
                    </div>
                </div>
            </div>
        </div>
    )
}
