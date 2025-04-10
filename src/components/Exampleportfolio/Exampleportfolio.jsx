import React, { useState } from 'react';
import { Navigation, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';
import Pagination from '../Pagination/Pagination';
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";


const Exampleportfolio = ({ Padding, isPaginate, displayCount }) => {

  const [datas, setDatas] = useState([
    { id: 1, imgUrl: '../../Public/Img/portfolio-img-1.webp', title: 'هقته ماهی', name: 'غذا' },
    { id: 2, imgUrl: '../../Public/Img/portfolio-img-2.webp', title: 'تقویت احساسات', name: 'دستور پخت' },
    { id: 3, imgUrl: '../../Public/Img/portfolio-img-3.webp', title: 'هدایای دریا', name: 'قهوه' },
    { id: 4, imgUrl: '../../Public/Img/portfolio-img-4.webp', title: 'قهوه روز', name: 'رستوران' },
    { id: 5, imgUrl: '../../Public/Img/portfolio-img-5.webp', title: 'رستوران را کشف کنید', name: 'غذا' },
    { id: 6, imgUrl: '../../Public/Img/portfolio-img-6.webp', title: 'هفته ماهی', name: 'قهوه' },
    { id: 7, imgUrl: '../../Public/Img/portfolio-img-7.webp', title: 'هفته ماهی', name: 'دستور آشپزی' },
    { id: 8, imgUrl: '../../Public/Img/portfolio-img-8.webp', title: 'هفته ماهی', name: 'غذا' }
  ]);

  const { id } = useParams();

  let row = displayCount;
  let endIndex = id ? id * row : 1 * row;
  let startIndex = endIndex - row
  const displayedDatas = datas.slice(startIndex, endIndex);

  const [isOepn, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  const openImage = (index) => {
    setCurrentIndex(index),
      setIsOpen(true)
  };

  const closeImage = () => {
    setIsOpen(false)
  };

  return (
    < >
      {
        isPaginate ? (
          <div className={`exampleportfolio ${Padding}`}>
            <div className='container'>
              <div className='exampleportfolio-wrap flex justify-center flex-wrap'>
                {
                  displayedDatas.map((data, index) => (
                    <div className='w-[25%] px-3'>
                      <div className='portfolio-card mb-[55px] group'>
                        <a href='#' onClick={() => openImage(index)} className='relative block rounded-[10px] overflow-hidden after:absolute after:content-[""] after:top-0 after:right-0 after:w-0 after:h-full after:border after:border-solid after:border-white after:border-opacity-15 after:transition-all after:duration-500 after:ease-in-out after:rounded-[10px] after:opacity-0 after:bg-[#151b20d6] after:group-hover:opacity-100 after:group-hover:w-full'>
                          <img className='rounded-[10px]' key={index} src={data.imgUrl} alt={data.title} />
                          <span className='absolute flex flex-col justify-center items-center size-14 top-[60%] right-[50%] translate-x-1/2 -translate-y-1/2 bg-orange-250 transition-all duration-300 ease-in delay-200 z-10 rounded-[50%] opacity-0 group-hover:opacity-100 group-hover:top-[50%]'>
                            <FaPlus className='text-lg text-white font-thin' />
                          </span>
                        </a>
                        <h3 className='text-white text-2xl mt-[23px] mb-[7px] font-bold'>
                          <Link className='taransition-all duration-200 ease-in hover:text-orange-250' to="">{data.title}</Link>
                        </h3>
                        <span className='text-orange-250'>{data.name}</span>
                      </div>
                    </div>
                  ))
                }

                {isOepn && (
                  < >
                    <div className='overlay fixed touch-pinch-zoom cursor-grabbing animate-growImg z-50 top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-80'
                    >
                      <button className='close-button flex items-center justify-center absolute h-[45px] w-[45px] top-[10px] right-[10px] z-30 bg-[#232323a6] text-white cursor-pointer'
                        onClick={closeImage}>
                        <IoMdClose className='size-5 text-white' /></button>
                      {/**/}
                      <Swiper initialSlide={currentIndex}
                        modules={[Navigation]}
                        navigation={{
                          prevEl: '.swiper-button-prev',
                          nextEl: '.swiper-button-next'
                        }}
                        className='mySwiper h-[542px] mt-[50px]'>
                        {
                          displayedDatas.map((data, index) => (
                            <SwiperSlide key={index}>
                              <div className='absolute top-0 left-0 w-full h-full '>
                                <div className='absolute flex items-center justify-center top-0 left-0 w-full h-full duration-300 select-none'>
                                  <div className='animate-growImg'>
                                    <img className='large-img block relative z-20 w-[565px] h-[542px]'
                                      src={data.imgUrl} alt={data.title} />
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))
                        }
                        <div className='swiper-button-prev after:hidden after:!w-0 after:!h-0'>
                          <button className='flex items-center justify-center absolute right-0 top-[50%] -translate-y-1/2 z-30 cursor-pointer p-[10px] text-[20px] text-white bg-[#232323a6]'>
                            <FaArrowLeft className='!size-5' /> </button>
                        </div>
                        <div className='swiper-button-next after:hidden after:!w-0 after:!h-0'>
                          <button className='flex items-center justify-center absolute left-0 top-[50%] -translate-y-1/2 z-30 cursor-pointer p-[10px] text-[20px] text-white bg-[#232323a6]'>
                            <FaArrowRight className='!size-5' /></button>
                        </div>
                      </Swiper>
                    </div>
                  </>
                )}
              </div>
              <Pagination
                items={datas}
                itemsCount={3}
                pathName="/Plate/Portfolio"
                setShownDatas={setDatas}
              />
            </div>
          </div>
        ) : (
          <div className={`exampleportfolio ${Padding}`}>
            <div className='container'>
              <div className='exampleportfolio-wrap flex justify-center flex-wrap'>
                {
                  displayedDatas.map((data, index) => (
                    <div className='w-[25%] px-3'>
                      <div className='portfolio-card mb-[55px] group'>
                        <a href='#' onClick={() => openImage(index)} className='relative block rounded-[10px] overflow-hidden after:absolute after:content-[""] after:top-0 after:right-0 after:w-0 after:h-full after:border after:border-solid after:border-white after:border-opacity-15 after:transition-all after:duration-500 after:ease-in-out after:rounded-[10px] after:opacity-0 after:bg-[#151b20d6] after:group-hover:opacity-100 after:group-hover:w-full'>
                          <img className='rounded-[10px]' key={index} src={data.imgUrl} alt={data.title} />
                          <span className='absolute flex flex-col justify-center items-center size-14 top-[60%] right-[50%] translate-x-1/2 -translate-y-1/2 bg-orange-250 transition-all duration-300 ease-in delay-200 z-10 rounded-[50%] opacity-0 group-hover:opacity-100 group-hover:top-[50%]'>
                            <FaPlus className='text-lg text-white font-thin' />
                          </span>
                        </a>
                        <h3 className='text-white text-2xl mt-[23px] mb-[7px] font-bold'>
                          <Link className='taransition-all duration-200 ease-in hover:text-orange-250' to="">{data.title}</Link>
                        </h3>
                        <span className='text-orange-250'>{data.name}</span>
                      </div>
                    </div>
                  ))
                }
                {isOepn && (
                  < >
                    <div className='overlay fixed touch-pinch-zoom cursor-grabbing animate-growImg z-50 top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-80'
                    >
                      <button className='close-button flex items-center justify-center absolute h-[45px] w-[45px] top-[10px] right-[10px] z-30 bg-[#232323a6] text-white cursor-pointer'
                        onClick={closeImage}>
                        <IoMdClose className='size-5 text-white' /></button>
                      {/**/}
                      <Swiper initialSlide={currentIndex}
                        modules={[Navigation]}
                        navigation={{
                          prevEl: '.swiper-button-prev',
                          nextEl: '.swiper-button-next'
                        }}
                        className='mySwiper h-[542px] mt-[50px]'>
                        {
                          displayedDatas.map((data, index) => (
                            <SwiperSlide key={index}>
                              <div className='absolute top-0 left-0 w-full h-full '>
                                <div className='absolute flex items-center justify-center top-0 left-0 w-full h-full duration-300 select-none'>
                                  <div className='animate-growImg'>
                                    <img className='large-img block relative z-20 w-[565px] h-[542px]'
                                      src={data.imgUrl} alt={data.title} />
                                  </div>
                                </div>
                              </div>
                            </SwiperSlide>
                          ))
                        }
                        <div className='swiper-button-prev after:hidden after:!w-0 after:!h-0'>
                          <button className='flex items-center justify-center absolute right-0 top-[50%] -translate-y-1/2 z-30 cursor-pointer p-[10px] text-[20px] text-white bg-[#232323a6]'>
                            <FaArrowLeft className='!size-5' /> </button>
                        </div>
                        <div className='swiper-button-next after:hidden after:!w-0 after:!h-0'>
                          <button className='flex items-center justify-center absolute left-0 top-[50%] -translate-y-1/2 z-30 cursor-pointer p-[10px] text-[20px] text-white bg-[#232323a6]'>
                            <FaArrowRight className='!size-5' /></button>
                        </div>
                      </Swiper>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )
      }
    </>

  )

};

export default Exampleportfolio;
