import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Coffeeitem from './Coffeeitem';

gsap.registerPlugin(ScrollTrigger);

export default function Coffeesmenu() {

    const allCoffees = [
        { id: 1, name: 'اسپرسو', desc: '۱ شات', price: '۱۰۰۰ تومان' },
        { id: 2, name: 'لته کلاسیک', desc: 'اسپرسو ۱/۳  شیر ۲/۳', price: '۶۰۰۰ تومان' },
        { id: 3, name: 'آمریکانو', desc: 'اسپرسو ۱/۳  آب ۲/۳"', price: '۵۰۰۰ تومان' },
        { id: 4, name: 'فلت وایت', desc: 'شیر ۲/۳  اسپرسو ۱/۳', price: '۸۰۰۰ تومان' },
        { id: 5, name: 'کاپوچینو', desc: 'اسپرسو ۱/۳  شیر ۲/۳', price: '۵۰۰۰ تومان' }
    ]

    const containerRef = useRef(null);
    const coffeesBtnRef = useRef(null);
    const coffeesItemRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current || !coffeesBtnRef.current || !coffeesItemRef.current) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(coffeesBtnRef.current, {
                autoAlpha: 0,
                y: 50
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.8,
                delay: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: coffeesBtnRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            const coffeeItems = coffeesItemRef.current.querySelectorAll('.coffeeitem');
            coffeeItems.forEach((item, index) => {
                gsap.fromTo(item, {
                    autoAlpha: 0,
                    y: 50
                }, {
                    autoAlpha: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        end: "top 60%",
                        toggleActions: "play none none none",
                        // تاخیر برای آیتم‌های بعدی
                        delay: index * 0.5
                    }
                });
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className='coffeesmenu relative overflow-hidden py-[130px] bg-[#000] z-10' ref={containerRef}>
            <img className='absolute left-0' src="../Public/Img/coffeemenu-img-1.webp" alt="coffeemenu1" />
            <div className='container'>
                <div className='row flex justify-between mb-[100px]'>
                    <div className='col-xl-7 col-lg-7 col-md-8 px-3'>
                        <h2 className='text-white text-6xl font-bold w-[665px] leading-tight'>منوی قهوه خود را انتخاب کنید</h2>
                    </div>
                    <div className='col-xl-5 col-lg-5 col-md-4 px-3'>
                        <a
                            className='relative flex items-center justify-center text-white bg-orange-250 font-bold py-[15px] px-8 z-10 leading-none overflow-hidden rounded-[50px] transition-all duration-300 ease-in before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[0%] before:-z-10 before:rounded-[5px] before:overflow-hidden before:transition-all before:duration-500 before:ease-in before:hover:bg-[#732701] before:hover:w-[110%] before:hover:h-[110%] before:hover:skew-x-[-15deg]' href="#"
                            ref={coffeesBtnRef}
                        >
                            مشاهده کامل منو
                        </a>
                    </div>
                </div>
            </div>
            <div className='container-fluid px-3'>
                <div className='row flex justify-between'>
                    <div className='col-lg-6 grow'>
                        <div className='coffeemenu-wrap flex'>
                            <div className='coffeemenu-bg relative z-10 w-[200px] h-[502px] top-[17px] bg-[url(../Public/Img/coffeemenu-img-2.webp)] bg-cover bg-no-repeat before:absolute before:content-[""] before:top-[-17px] before:left-[-17px] before:w-[calc(100%_+_17px)] before:h-[calc(100%_+_34px)] before:border-[17px] before:border-solid before:border-[#5A6F6F] before:border-r-0 before:z-10'>
                            </div>
                            <div className='coffeeitem-wrap w-[calc(100%_-_260px)] mr-[60px]' ref={coffeesItemRef}>
                                <Coffeeitem {...allCoffees[0]} />
                                <Coffeeitem {...allCoffees[1]} />
                                <Coffeeitem {...allCoffees[2]} />
                                <Coffeeitem {...allCoffees[3]} />
                                <Coffeeitem {...allCoffees[4]} />
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 pr-3'>
                        <div className='coffeemenu-img relative pl-[70px] z-10'>
                            <img className='block mr-[87px]' src="../Public/Img/coffeemenu-img-3.webp" alt="coffeemenuimg3" />
                            <img className='absolute top-[-37%] right-[-13%] -z-10' src="https://rtlme.ir/Etar/assets/img/recipes/shape-1.webp" alt="caffeemenushape" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
