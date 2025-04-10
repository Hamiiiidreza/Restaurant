import React from 'react'
import Accordion from '../Accordion/Accordion'
import { Link } from 'react-router-dom'

export default function Servicecategories() {
  return (
    <div className='servicecategories py-[130px]'>
        <div className='container'>
            <div className='servicecategories-wrap flex'>
                <div className='servicecategories-right w-[66.66%] pl-3'>
                    <div className='service-desc'>
                        <div className='mb-10'>
                           <img src="../Public/Img/servicecategories-img-1.webp" className='rounded-[10px]' alt="servicecategories-img-1" />
                        </div>
                        <div className='mb-10'>
                            <h1 className='text-white text-[40px] font-bold mb-[8px] leading-tight'>خدمات پذیرایی برای شرکت در رویداد های شگفت انگیز</h1>
                            <p className='font-bold mb-[18px] '>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز</p>
                            <p className='font-bold my-0 w-[763px]'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده.</p>
                        </div>
                        <div>
                            <h2 className='text-white text-[34px] font-bold leading-tight'>همیشه از محصولات با کیفیت برای ظروف خود استفاده کنید</h2>
                            <p className='font-bold mb-[18px]'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.</p>
                            <Accordion id={'value-1'} title="آیا انعام در قیمت گنجانده شده است؟" text="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز."/>
                            <Accordion id={'value-2'} title="از کجا می توانم منو پیدا کنم؟" text="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز." />
                            <Accordion id={'value-3'} title="محصولات را از کجا تهیه می کنید؟" text="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز." />
                        </div>
                    </div>
                </div>
                <div className='servicecategories-left w-[33.33%] pr-3'>
                    <div className='sidebar'>
                        <div className='sidebar-widget bg-[#151B20] py-[30px] px-[35px] mb-[30px] rounded-[10px]'>
                            <h3 className='inline-block relative text-white text-2xl font-bold mb-[30px] after:absolute after:content-[""] after:right-0 after:bottom-0 after:w-full after:h-[1.5px] after:bg-white'>دسته بندی خدمات</h3>
                            <ul>
                                <li className='relative mb-5'>
                                    <Link className='relative pr-[15px] font-bold text-[#D2D2D2] transition-all duration-200 ease-in hover:text-orange-250 hover:pr-5 before:absolute before:content-[""] before:top-[10px] before:right-0 before:w-[3px] before:h-[3px] before:rounded-[50%] before:bg-[#D2D2D2] before:hover:bg-orange-250 before:transition-all before:duration-200 before:ease-in' to="/Plate/Services">غذا و نوشیدنی ها(5)</Link>
                                </li>
                                <li className='relative mb-5'>
                                    <Link className='relative pr-[15px] font-bold text-[#D2D2D2] transition-all duration-200 ease-in hover:text-orange-250 hover:pr-5 before:absolute before:content-[""] before:top-[10px] before:right-0 before:w-[3px] before:h-[3px] before:rounded-[50%] before:bg-[#D2D2D2] before:hover:bg-orange-250 before:transition-all before:duration-200 before:ease-in' to="/Plate/Services">اخبار و نکات(8)</Link>
                                </li>
                                <li className='relative mb-5'>
                                    <Link className='relative pr-[15px] font-bold text-[#D2D2D2] transition-all duration-200 ease-in hover:text-orange-250 hover:pr-5 before:absolute before:content-[""] before:top-[10px] before:right-0 before:w-[3px] before:h-[3px] before:rounded-[50%] before:bg-[#D2D2D2] before:hover:bg-orange-250 before:transition-all before:duration-200 before:ease-in' to="/Plate/Services">دستور پخت(5)</Link>
                                </li>
                                <li className='relative'>
                                    <Link className='relative pr-[15px] font-bold text-[#D2D2D2] transition-all duration-200 ease-in hover:text-orange-250 hover:pr-5 before:absolute before:content-[""] before:top-[10px] before:right-0 before:w-[3px] before:h-[3px] before:rounded-[50%] before:bg-[#D2D2D2] before:hover:bg-orange-250 before:transition-all before:duration-200 before:ease-in' to="/Plate/Services">رستوران ها(5)</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='sidebar-widget relative mb-0 py-[30px] pb-0 px-[25px] bg-[#151B20] z-10 rounded-[10px] after:absolute after:content-[""] after:top-[17px] after:right-[17px] after:border after:border-solid after:border-orange-250 after:rounded-[10px] after:w-[calc(100%_-_34px)] after:h-[calc(100%_-_34px)] after:-z-10'>
                            <div className='catering-widget text-center'>
                                <h2 className='text-5xl text-orange-250 font-bold my-3 leading-none'>۱۵% تخفیف</h2>
                                <h4 className='text-2xl text-white font-bold mb-[10px]'>به سفارش اول</h4>
                                <h5 className='text-2xl text-white font-bold mb-[35px]'>یک کوپن برای هر مشتری محدود کنید.</h5>
                                <img src="../Public/Img/servicecategories-img-2.webp" alt="servicecategories-img-2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
