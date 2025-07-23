import React from 'react';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Teamcard from './Teamcard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function Team() {
    const team = [
        { id: 1, name: 'مصطفی قاسمی', imgUrl: '../Img/team-1.webp', role: 'دستیار سرآشپز' },
        { id: 2, name: 'لیلا جلالی', imgUrl: '../Img/team-2.webp', role: 'سرآشپز' },
        { id: 3, name: 'شقایق امیری', imgUrl: '../Img/team-3.webp', role: 'مدیر' },
        { id: 4, name: 'حامد کریمی', imgUrl: '../Img/team-4.webp', role: 'دستیار سرآشپز' },
        { id: 5, name: 'کوروش شاهدی', imgUrl: '../Img/team-5.webp', role: 'سرآشپز ارشد' },
        { id: 6, name: 'زیبا سعیدی', imgUrl: '../Img/team-6.webp', role: 'دستیار سرآشپز' },
        { id: 7, name: 'حسین کاظمی', imgUrl: '../Img/team-7.webp', role: 'پیشخدمت بار' },
        { id: 8, name: 'ستاره رحیمی', imgUrl: '../Img/team-8.webp', role: 'پیشخدمت' },
    ];

    return (
        <div className='team-wrapper relative py-[130px] z-10'>
            <img className='absolute bottom-[75px] right-0' src="https://rtlme.ir/Etar/assets/img/shape-11.webp" alt="teamshape1" />
            <img className='absolute bottom-[75px] left-0 -z-10' src="https://rtlme.ir/Etar/assets/img/shape-10.webp" alt="teamshape2" />
            <div className='team_bg-shape absolute right-1/2 top-0 bg-[url(https://rtlme.ir/Etar/assets/img/shape-5.webp)] bg-center bg-repeat-y bg-contain w-full h-full -z-10 translate-x-1/2'></div>
            <div className='container'>
                <div className='team-top flex items-center justify-between mb-[30px]'>
                    <div className='w-[66.66%]'>
                        <h2 className='text-white text-6xl font-bold mb-2 leading-tight'>با حرفه ای های ما آشنا شوید</h2>
                    </div>
                    <div className='w-[33.33%] pl-5'>
                        <div className='slider-btn flex items-center justify-end'>
                            <div className='next-btn flex items-center justify-center relative w-[50px] h-[50px] rounded-[50%] overflow-hidden bg-[#24252A] z-10 ml-[7px] transition-all duration-200 ease-linear cursor-pointer after:absolute after:content-[""] after:top-0 after:right-0 after:w-0 after:h-full after:-z-10 after:transition-all after:duration-300 after:ease-in hover:after:bg-orange-250 hover:after:w-full'>
                                <IoIosArrowForward className='text-white text-2xl font-bold' />
                            </div>
                            <div className='prev-btn flex items-center justify-center relative w-[50px] h-[50px] rounded-[50%] overflow-hidden bg-[#24252A] z-10 ml-[7px] transition-all duration-200 ease-linear cursor-pointer after:absolute after:content-[""] after:top-0 after:right-0 after:w-0 after:h-full after:-z-10 after:transition-all after:duration-300 after:ease-in hover:after:bg-orange-250 hover:after:w-full'>
                                <IoIosArrowBack className='text-white text-2xl font-bold' />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Swiper Container */}
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.next-btn',
                        prevEl: '.prev-btn',
                    }}

                    slidesPerView={4}
                    speed={800} // تنظیم سرعت پیمایش
                    loop={true}
                    dir="rtl" // برای راست به چپ بودن
                    className="team-slider-wrap"
                >
                    {team.map((member) => (
                        <SwiperSlide key={member.id}>
                            <Teamcard {...member} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
