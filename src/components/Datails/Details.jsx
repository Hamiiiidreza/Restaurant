import React from 'react'
import Briefitem from '../Datails/Briefitem'
import Features from '../Features/Features'
import Exampleportfolio from '../Exampleportfolio/Exampleportfolio'

export default function Details() {

    const description = [
        { id: 1, title: 'مشتری', name1: '[rtl@gmail.com]', name2: 'شرکت نظافت' },
        { id: 2, title: 'تیم', name1: 'سعید دهنوی - مدیر', name2: 'جلال تیموری - پیشخدمت' },
        { id: 3, title: 'خدمات', name1: 'سازمان شرکتی' },
        { id: 4, title: 'دسته بندی', name1: 'رستوران دستور آشپزی', name2: 'غذا و نوشیدنی' }
    ]

    return (
        <div className='details pt-[130px] pb-[100px]'>
            <div className='container'>
                <div className='detailsimg-wrap flex flex-wrap'>
                    <div className='w-[41.66%] pl-3'>
                        <img className='rounded-[10px] bg-center bg-cover bg-no-repeat mb-[30px] h-[500px]' src="../public/Img/details-img-1.webp" alt="details1" />
                    </div>
                    <div className='w-[58.33%] px-3'>
                        <img className='rounded-[10px] bg-center bg-cover bg-no-repeat mb-[30px] h-[500px]' src="../public/Img/details-img-2.webp" alt="details2" />
                    </div>
                </div>
                <div className='portfolio-brief flex flex-wrap pt-[62px] pb-[35px] px-[30px] bg-[#151B20] rounded-[10px] mb-[35px]'>
                    <Briefitem {...description[0]} />
                    <Briefitem {...description[1]} />
                    <Briefitem {...description[2]} />
                    <Briefitem {...description[3]} />
                </div>
                <div className='portfolio-desc'>
                    <div className='mb-10'>
                        <p className='text-white font-bold mb-[18px]'>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی
                        </p>
                        <p className='text-white font-bold'>
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی
                        </p>
                    </div>
                </div>
                <div className='rounded-[20px] overflow-hidden mb-[35px]'>
                    <img src="../Public/Img/details-img-3.webp" alt="details3" />
                </div>
                <div>
                    <h2 className='text-white text-[35px] font-bold mb-[25px]'>اطلاعات برخی از خدمات</h2>
                    <p className='font-bold'>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها
                    </p>
                </div>
                <Features />
                <ul className='mt-6'>
                    <li className='relative mb-[10px] pr-[18px] after:absolute after:content-[""] after:top-[13px] after:right-0 after:w-[3px] after:h-[3px] after:rounded-[50%] after:bg-[#736565]'>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                    </li>
                    <li className='relative mb-[10px] pr-[18px] after:absolute after:content-[""] after:top-[13px] after:right-0 after:w-[3px] after:h-[3px] after:rounded-[50%] after:bg-[#736565]'>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                    </li>
                    <li className='relative mb-0 pr-[18px] after:absolute after:content-[""] after:top-[13px] after:right-0 after:w-[3px] after:h-[3px] after:rounded-[50%] after:bg-[#736565]'>
                        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                    </li>
                </ul>
                <h2 className='text-4xl text-white font-bold mb-[30px] mt-12'>پروژه های مرتبط</h2>
                <Exampleportfolio Padding="py-0" displayCount={4} />
            </div>
        </div>
    )
}
