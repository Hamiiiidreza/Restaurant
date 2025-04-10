import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const products = {
    دسر: [
        { name: 'ماکارونی', price: '۴۰۰۰۰ تومان', img: '../Public/Img/recipe-img-3.webp' },
        { name: 'ماهی', price: '۳۴۰۰۰ تومان', img: '../Public/Img/recipe-img-4.webp' },
        { name: 'میگو', price: '۵۰۰۰۰ تومان', img: '../Public/Img/recipe-img-5.webp' },
    ],
    خوراک: [
        { name: 'مرغ سوخاری', price: '۴۰۰۰۰ تومان', img: '../Public/Img/recipe-img-6.webp' },
        { name: 'سالاد سزار', price: '۳۰۰۰۰ تومان', img: '../Public/Img/recipe-img-7.webp' },
        { name: 'جوجه کباب', price: '۴۰۰۰۰ تومان', img: '../Public/Img/recipe-img-8.webp' },
    ],
    چلو: [
        { name: 'ماهی', price: '۳۴۰۰۰ تومان', img: '../Public/Img/recipe-img-4.webp' },
        { name: 'جوجه کباب', price: '۴۰۰۰۰ تومان', img: '../Public/Img/recipe-img-8.webp' },
        { name: 'سالاد سزار', price: '۳۰۰۰۰ تومان', img: '../Public/Img/recipe-img-7.webp' },
    ],
    نوشیدنی: [
        { name: 'میگو', price: '۵۰۰۰۰ تومان', img: '../Public/Img/recipe-img-5.webp' },
        { name: 'ماهی', price: '۳۴۰۰۰ تومان', img: '../Public/Img/recipe-img-4.webp' },
    ]
}

const Recipemenu = () => {
    const [activeMenu, setActiveMenu] = useState('خوراک');

    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };


    return (
        <div className='recipe-menu relative pt-[130px] pb-[100px] z-10 bg-[#12131B] '>
            <img className='absolute -z-10 right-0 bottom-0' src="../../Public/Img/recipe-img-1.webp" alt="recipeimg1" />
            <img className='absolute -z-10 bottom-[57px] left-0' src="https://rtlme.ir/Etar/assets/img/shape-9.webp" alt="recipeshape" />
            <div className='container'>
                <div className='recipe-menu-wrap flex items-start justify-between'>
                    <div className='recipe-menu_right w-[40%] px-3'>
                        <h2 className='text-white text-6xl mb-5 font-bold '>منوی رستوران</h2>
                        <div>
                            <img className='w-[468px] h-[426px] object-custom-x2' src="../../Public/Img/recipe-img-2.webp" alt="recipeimg2" />
                        </div>
                    </div>
                    <div className='recipe-menu_left w-[60%] px-3 grow'>
                        <div className='recipe-menu_wrapper'>
                            <div className='flex items-center justify-between mb-[74px]'>
                                <ul className='flex items-center'>
                                    <li
                                        onClick={() =>
                                            handleMenuClick('دسر')}
                                        className={`ml-[13px] rounded-[50px] ${activeMenu === 'دسر' ? 'bg-orange-250' : ''}`}>
                                        <button className='flex items-center rounded-[50px] text-white border border-[#38393D] hover:bg-orange-250 hover:border-none outline-0 transition-colors duration-[0.5s] py-3 px-5 cursor-pointer'>دسر</button>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleMenuClick('خوراک')}
                                        className={`ml-[13px] rounded-[50px] ${activeMenu === 'خوراک' ? 'bg-orange-250' : ''}`}>
                                        <button className='flex items-center rounded-[50px] text-white border border-[#38393D] hover:bg-orange-250 hover:border-none hover:outline-none transition-colors duration-[0.5s] py-3 px-5 cursor-pointer'>خوراک</button>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleMenuClick('چلو')}
                                        className={`ml-[13px] rounded-[50px] ${activeMenu === 'چلو' ? 'bg-orange-250' : ''}`}>
                                        <button className='flex items-center rounded-[50px] text-white border border-[#38393D] hover:bg-orange-250 hover:border-none hover:outline-none transition-colors duration-[0.5s] py-3 px-5 cursor-pointer'>چلو</button>
                                    </li>
                                    <li
                                        onClick={() =>
                                            handleMenuClick('نوشیدنی')
                                        }
                                        className={`ml-[13px] rounded-[50px] ${activeMenu === 'نوشیدنی' ? 'bg-orange-250' : ''}`}>
                                        <button className='flex items-center rounded-[50px] text-white border border-[#38393D] hover:bg-orange-250 hover:border-none hover:outline-none transition-colors duration-[0.5s] py-3 px-5 cursor-pointer'>نوشیدنی</button>
                                    </li>
                                </ul>
                                <Link to='/Menu/Restaurantmenu' className='recipe-menu_btn z-10 leading-none font-bold overflow-hidden text-orange-250 hover:text-white transition-colors rounded-[50px] border border-[#38393D] py-[15px] px-8 whitespace-nowrap'>مشاهده تمام منو</Link>
                            </div>
                            <div className='products-list'>
                                {products[activeMenu].map((product) =>
                                    <div className='products flex items-center mb-[30px]' key={crypto.randomUUID()}>
                                        <div className='recipe-img w-[165px] h-[165px] rounded-[10px] overflow-hidden'>
                                            <img src={product.img} alt={product.name} />
                                        </div>
                                        <div className='recipe-info grow mr-5'>
                                            <div className='recipe-title flex items-center justify-between mb-[29px] z-10'>
                                                <h3 className='pl-2.5 bg-[#12131B] text-white text-2xl font-bold'>{product.name}</h3>
                                                <h6 className='pr-[22px] bg-[#12131B] text-orange-250 text-2xl font-bold'>{product.price}</h6>
                                            </div>
                                            <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recipemenu
