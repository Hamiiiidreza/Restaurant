import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Aboutus() {
    const containerRef = useRef(null);
    const aboutRightRef = useRef(null);
    const aboutLeftRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !aboutRightRef.current || !aboutLeftRef.current) return;

        const ctx = gsap.context(() => {
            // انیمیشن برای بخش راست
            gsap.fromTo(aboutRightRef.current, {
                autoAlpha: 0,
                y: 50
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: aboutRightRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            // انیمیشن برای بخش چپ با تأخیر بیشتر
            gsap.fromTo(aboutLeftRef.current, {
                autoAlpha: 0,
                y: 50
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                delay: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: aboutLeftRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className='about relative' ref={containerRef}>
            <img className='absolute top-[10%] left-0 -z-10' src="../../Public/Img/about-img-1.webp" alt="aboutimg1" />
            <div className='about-bg-shape absolute top-0 -z-10 bg-[url(https://rtlme.ir/Etar/assets/img/shape-5.webp)] bg-center bg-repeat-y bg-contain w-full h-full'></div>
            <div className='container'>
                <div className='about-wrap flex items-center justify-between'>
                    <div
                        className='about-right w-[60%] pl-3'
                        ref={aboutRightRef}
                    >
                        <img className='bg-center object-custom-x bg-cover object-cover bg-no-repeat bg-[#ddd] mr-[-40px] w-full h-[830px]' src="../../Public/Img/about-img-2.webp" alt="aboutimg2" />
                    </div>

                    <div
                        className='about-left w-[50%] px-3 ml-[102px]'
                        ref={aboutLeftRef}
                    >
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

