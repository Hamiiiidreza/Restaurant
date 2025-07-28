import React, { useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import Catcard from './Catcard';
import { useGetData } from '@/hooks/UseGetData';
import { getProducts } from '@/Utils/Fetchs';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Category() {
  const { data: products = [], isLoading } = useGetData(
    ['products'],
    getProducts
  );

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !titleRef.current || !swiperRef.current) return;

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

      // انیمیشن برای محصولات
      if (!isLoading) {
        const productCards = swiperRef.current.querySelectorAll('.swiper-slide');

        gsap.fromTo(productCards, {
          autoAlpha: 0,
          x: 50
        }, {
          autoAlpha: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.2,
          scrollTrigger: {
            trigger: swiperRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  return (
    <div className='category relative pt-[130px] pb-[100px]' ref={containerRef}>
      <div className='category-bg-shape absolute top-0 -z-10 bg-[url(https://rtlme.ir/Etar/assets/img/shape-5.webp)] bg-center bg-repeat-y bg-contain w-full h-full'></div>
      <div className='container'>
        <div className='category-title'>
          <div
            className='category-title-wrap w-[100%] flex items-center justify-center max-w-full'
            ref={titleRef}
          >
            <h2 className='text-white text-6xl font-bold w-[570px] leading-tight mb-10 text-center'>
              غذای مورد علاقه خود را پیدا کنید
            </h2>
          </div>
        </div>

        <div ref={swiperRef}>
          {isLoading ? (
            <div>در حال بارگذاری...</div>
          ) : (
            <Swiper
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={30}

              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 5,
                },
              }}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id}>
                  <Catcard
                    id={product.id}
                    name={product.title}
                    imgUrl={product.imgUrl}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
}
