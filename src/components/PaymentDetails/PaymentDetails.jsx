import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { createOrder } from '@/Utils/Fetchs';
import containerContext from '@/Context/containerContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const PaymentDetails = () => {

    const contextData = useContext(containerContext);
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { toast } = useToast();
    const showToast = () => {
        toast({
            description: "سبد خرید شما خالی است",
        });
    };

    const navigate = useNavigate();

    const handleCheckboxChange = (e) => {
        setCheckboxChecked(e.target.checked);
    };

    const handleRadioChange = (value) => {
        setSelectedPayment(value);
    };

    const handleCheckout = async () => {
        try {
            if (!contextData.userCart?.length) {
                showToast();
                return;
            }

            setIsLoading(true);

            const newOrder = {
                userId: contextData.userInfos.id,
                total: totalPrice() + shippingCost,
                products: contextData.userCart,
                date: new Date().toISOString(),
                status: "در انتظار پرداخت"
            };

            await new Promise(resolve => setTimeout(resolve, 2000));

            const createdOrder = await createOrder(newOrder);

            // پاک کردن سبد خرید پس از ثبت سفارش
            if (createdOrder.id) {
                contextData.setUserCart([]);
                contextData.setDiscount(0);
                toast({
                    description: "پرداخت شما با موفقیت انجام شد",
                });
                navigate('/my-account/orders');
            }
        } catch (error) {
            console.error('خطا در ثبت سفارش:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price);
    };

    const totalPrice = () => {
        return contextData.cartTotal - (contextData.cartTotal * (contextData.discount / 100));
    };

    const shippingCost = 5000;

    return (
        <div className='paymentdetails py-[130px]'>
            <div className="container">
                <div className="payment-wrap">
                    <div className='flex gap-1 pt-[18px] px-[25px] pb-[15px] mb-[50px] bg-[#151B20] rounded-[5px]'>
                        <span className='text-lg text-orange-250 font-bold'>قبلا حساب باز نکردی?</span>
                        <Link to="/Store/Myaccount" className='relative text-white font-semibold after:absolute after:content-[""] after:bottom-0 after:right-0 after:w-0 after:h-[1px] after:transition-all after:ease-in after:duration-300 after:hover:bg-white after:hover:w-full'>اینجا کلیک کن تا وارد بشی</Link>
                    </div>
                    <form action="#" className='mb-[50px]'>
                        <h3 className='text-[26px] text-white font-bold mb-[25px]'>جزئیات صورتحساب</h3>
                        <div className='inputs-wrap flex items-center flex-wrap'>
                            <div className='w-[25%] pl-3'>
                                <div className='form-group flex flex-col mb-[25px]'>
                                    <label htmlFor="" className='text-white font-bold mb-[10px]'>نام</label>
                                    <input type="text" className='text-white text-base py-[13px] pr-5 pl-[15px] rounded-[3px] bg-[#151B20] outline-none w-full h-[49px]' />
                                </div>
                            </div>
                            <div className='w-[25%] px-3'>
                                <div className='form-group flex flex-col mb-[25px]'>
                                    <label htmlFor="" className='text-white font-bold mb-[10px]'>نام خانوادگی</label>
                                    <input type="text" className='text-white text-base py-[13px] pr-5 pl-[15px] rounded-[3px] bg-[#151B20] outline-none w-full h-[49px]' />
                                </div>
                            </div>
                            <div className='w-[50%] pr-3'>
                                <div className='form-group flex flex-col mb-[25px]'>
                                    <label htmlFor="" className='text-white font-bold mb-[10px]'>کشور</label>
                                    <select name="" id="" className='py-2.5 pr-5 pl-[15px] rounded-[3px] outline-none cursor-pointer appearance-none bg-[#151B20] bg-[url(../Public/Img/down-arrow-white.webp)] bg-custom-arrow bg-custom-p2 bg-no-repeat'>
                                        <option value="1">ایران</option>
                                        <option value="2">چین</option>
                                        <option value="3">روسیه</option>
                                    </select>
                                </div>
                            </div>
                            <div className='w-[50%] pl-3'>
                                <div className="form-group flex flex-col mb-[25px]">
                                    <label htmlFor="" className='text-white font-bold mb-[10px]'>نام شرکت</label>
                                    <input type="text" className='text-white text-base py-[13px] pr-5 pl-[15px] rounded-[3px] bg-[#151B20] outline-none w-full h-[49px]' />
                                </div>
                            </div>
                            <div className='w-[50%] pr-3'>
                                <div className="form-group flex flex-col mb-[25px]">
                                    <label htmlFor="" className='text-white font-bold mb-[10px]'>آدرس</label>
                                    <input type="text" className='text-white text-base py-[13px] pr-5 pl-[15px] rounded-[3px] bg-[#151B20] outline-none w-full h-[49px]' />
                                </div>
                            </div>
                            <div className='w-[50%] pl-3'>
                                <div className='form-group flex flex-col mb-[25px]'>
                                    <label htmlFor="" className='text-white font-bold mb-[10px]'>شهر</label>
                                    <select name="" id="" className='py-2.5 pr-5 pl-[15px] rounded-[3px] outline-none cursor-pointer appearance-none bg-[#151B20] bg-[url(../Public/Img/down-arrow-white.webp)] bg-custom-arrow bg-custom-p2 bg-no-repeat'>
                                        <option value="1">تهران</option>
                                        <option value="2">اصفهان</option>
                                        <option value="3">شیراز</option>
                                    </select>
                                </div>
                            </div>
                            <div className='w-[50%] pr-3'>
                                <div className="form-group flex flex-col mb-[25px]">
                                    <label htmlFor="" className='text-white font-bold mb-[10px]'>کد پستی</label>
                                    <input type="text" className='text-white text-base py-[13px] pr-5 pl-[15px] rounded-[3px] bg-[#151B20] outline-none w-full h-[49px]' />
                                </div>
                            </div>
                            <div className='w-[25%] pl-3 mt-8'>
                                <div className='form-group flex flex-col mb-[25px]'>
                                    <label htmlFor="" className='text-white font-bold mb-[10px]'>ایمیل</label>
                                    <input type="text" className='text-white text-base py-[13px] pr-5 pl-[15px] rounded-[3px] bg-[#151B20] outline-none w-full h-[49px]' />
                                </div>
                            </div>
                            <div className='w-[25%] px-3 mt-8'>
                                <div className='form-group flex flex-col mb-[25px]'>
                                    <label htmlFor="" className='text-white font-bold mb-[10px]'>تلفن همراه</label>
                                    <input type="text" className='text-white text-base py-[13px] pr-5 pl-[15px] rounded-[3px] bg-[#151B20] outline-none w-full h-[49px]' />
                                </div>
                            </div>
                            <div className='w-[50%] pr-3'>
                                <div className="form-group flex flex-col mb-[25px]">
                                    <label htmlFor="" className='text-white font-bold mb-[10px]'>توضیحات بیشتر</label>
                                    <textarea name="msg" cols='30' rows='10' placeholder='توضیحات بیشتر' className='text-white text-base h-[83px] resize-none py-[13px] pr-5 pl-[15px] rounded-[3px] bg-[#151B20] outline-none w-full'></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className='payment-bottom_wrap w-full flex items-center flex-wrap'>
                        <div className='w-full'>
                            <h3 className='text-white text-[28px] font-bold mb-5'>محصولات شما</h3>
                        </div>
                        <div className='w-[50%] pl-3'>
                            <div className="checkout-details mb-[25px] rounded-[10px] border border-solid border-white border-opacity-15">
                                <div className="bill-wrap">
                                    <table className='w-full'>
                                        <thead className='w-full'>
                                            <tr className='relative flex items-center w-full mb-[10px] border-b border-solid border-white border-opacity-15 after:absolute after:content-[""] after:top-0 after:right-[50%] after:w-[1px] after:h-full after:bg-white after:bg-opacity-15'>
                                                <th className='text-lg text-white text-right w-[50%] py-[15px] px-[30px]'>نام محصول</th>
                                                <th className='text-lg text-white text-center w-[50%] py-[15px] px-[30px]'>جمع</th>
                                            </tr>
                                        </thead>
                                        <tbody className='w-full'>
                                            {contextData.userCart?.map((product) => (
                                                <tr
                                                    key={product.id}
                                                    className='relative w-full flex items-center after:absolute after:content-[""] after:top-0 after:right-[50%] after:w-[1px] after:h-full after:bg-white after:bg-opacity-15'
                                                >
                                                    <td className='text-right text-white w-[50%] py-[7px] px-[30px]'>
                                                        {product.title}
                                                    </td>
                                                    <td className='text-center text-white w-[50%] py-[7px] px-[30px]'>
                                                        {formatPrice(product.price * product.count)} تومان
                                                    </td>
                                                </tr>
                                            ))}


                                            <tr className='relative w-full flex items-center after:absolute after:content-[""] after:top-0 after:right-[50%] after:w-[1px] after:h-full after:bg-white after:bg-opacity-15'>
                                                <td className='text-right text-white w-[50%] py-[7px] px-[30px]'>جمع سبد خرید</td>
                                                <td className='text-center text-white w-[50%] py-[7px] px-[30px]'>
                                                    {formatPrice(contextData.cartTotal)} تومان
                                                </td>
                                            </tr>


                                            <tr className='relative w-full flex items-center after:absolute after:content-[""] after:top-0 after:right-[50%] after:w-[1px] after:h-full after:bg-white after:bg-opacity-15'>
                                                <td className='text-right text-white w-[50%] py-[7px] px-[30px]'>حمل دریایی</td>
                                                <td className='text-center text-white w-[50%] py-[7px] px-[30px]'>
                                                    {formatPrice(shippingCost)} تومان
                                                </td>
                                            </tr>


                                            <tr className='relative w-full flex items-center after:absolute after:content-[""] after:top-0 after:right-[50%] after:w-[1px] after:h-full after:bg-white after:bg-opacity-15'>
                                                <td className='text-right text-white w-[50%] py-[7px] px-[30px]'>تخفیف</td>
                                                <td className='text-center text-white w-[50%] py-[7px] px-[30px]'>
                                                    {formatPrice(contextData.cartTotal * (contextData.discount / 100))} تومان ({contextData.discount}%)
                                                </td>
                                            </tr>


                                            <tr className='relative w-full flex items-center pb-[15px] after:absolute after:content-[""] after:top-0 after:right-[50%] after:w-[1px] after:h-full after:bg-white after:bg-opacity-15'>
                                                <td className='text-right text-white w-[50%] py-[7px] px-[30px]'>مقدار کل</td>
                                                <td className='text-center text-white w-[50%] py-[7px] px-[30px]'>
                                                    {formatPrice(totalPrice() + shippingCost)} تومان
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='w-[50%] pr-3'>
                            <div className="checkout-details-two px-[50px] pt-[30px] pb-[35px] rounded-[10px] bg-[#151B20]">
                                <div className="bill-wrap">
                                    <div className="select-payment-method">
                                        <div className="checkbox mb-[18px]">
                                            <input
                                                type="radio"
                                                className='hidden'
                                                name='payment'
                                                id='banktransfer'
                                                onChange={() => handleRadioChange('انتقال مستقیم بانکی')}
                                                checked={selectedPayment === 'انتقال مستقیم بانکی'}
                                            />
                                            <label htmlFor='banktransfer' className={`relative text-lg text-white font-bold cursor-pointer pr-[33px] before:absolute before:content-[""] before:appearence-none before:bg-transparent before:rounded-[1px] before:border before:border-solid before:border-[#D9D8D8] before:size-5 before:cursor-pointer before:ml-[5px] before:right-0 before:top-[2px] after:absolute after:content-[""] after:top-[7px] after:right-[5px] after:size-2.5 after:rounded-[2px] after:border-none ${selectedPayment === 'انتقال مستقیم بانکی' ? 'after:bg-orange-250' : 'after:bg-transparent'}`}>
                                                انتقال مستقیم بانکی
                                            </label>
                                            <p className='pt-3'>
                                                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
                                            </p>
                                        </div>
                                        <div className="checkbox mb-[18px]">
                                            <input
                                                type="radio"
                                                className='hidden'
                                                name='payment'
                                                id='paypal'
                                                onChange={() => handleRadioChange('پی پال')}
                                                checked={selectedPayment === 'پی پال'}
                                            />
                                            <label htmlFor='paypal' className={`relative text-lg text-white font-bold cursor-pointer pr-[33px] before:absolute before:content-[""] before:appearence-none before:bg-transparent before:rounded-[1px] before:border before:border-solid before:border-[#D9D8D8] before:size-5 before:cursor-pointer before:ml-[5px] before:right-0 before:top-[2px] after:absolute after:content-[""] after:top-[7px] after:right-[5px] after:size-2.5 after:rounded-[2px] after:border-none ${selectedPayment === 'پی پال' ? 'after:bg-orange-250' : 'after:bg-transparent'}`}>
                                                پی پال
                                            </label>
                                        </div>
                                        <div className="checkbox mb-[18px]">
                                            <input
                                                type="radio"
                                                className='hidden'
                                                name='payment'
                                                id='cash'
                                                onChange={() => handleRadioChange('پرداخت نقدی هنگام تحویل')}
                                                checked={selectedPayment === 'انتقال مستقیم بانکی'}
                                            />
                                            <label htmlFor='cash' className={`relative text-lg text-white font-bold cursor-pointer pr-[33px] before:absolute before:content-[""] before:appearence-none before:bg-transparent before:rounded-[1px] before:border before:border-solid before:border-[#D9D8D8] before:size-5 before:cursor-pointer before:ml-[5px] before:right-0 before:top-[2px] after:absolute after:content-[""] after:top-[7px] after:right-[5px] after:size-2.5 after:rounded-[2px] after:border-none ${selectedPayment === 'پرداخت نقدی هنگام تحویل' ? 'after:bg-orange-250' : 'after:bg-transparent'}`}>
                                                پرداخت نقدی هنگام تحویل
                                            </label>
                                        </div>
                                    </div>
                                    <div className="checkbox mb-[25px]">
                                        <input
                                            type="checkbox"
                                            id="agreement"
                                            className='hidden'
                                            onChange={handleCheckboxChange}
                                        />
                                        <label htmlFor="agreement" className={`relative text-lg text-white font-bold cursor-pointer pr-[33px] before:absolute before:content-[""] before:appearence-none before:bg-transparent before:rounded-[1px] before:border before:border-solid before:border-[#D9D8D8] before:size-5 before:cursor-pointer before:ml-[5px] before:right-0 before:top-[2px] after:absolute after:content-[""] after:top-[7px] after:right-[5px] after:size-2.5 after:rounded-[2px] after:border-none ${checkboxChecked ? 'after:bg-orange-250' : 'after:bg-transparent'}`}>
                                            من خوانده ام و قبول دارم
                                            <a href="#" className='relative mr-[6px] text-orange-250 font-semibold transition-all duration-500 ease-in after:absolute after:content-[""] after:bottom-[-3px] after:right-0 after:w-0 after:h-[1px] after:transition-all after:duration-300 after:ease-in after:hover:bg-orange-250 after:hover:w-full'>
                                                شرایط و ضوابط را
                                            </a>
                                        </label>
                                    </div>
                                    <div className="checkout-footer">
                                        <button
                                            type='button'
                                            className={`btn relative text-white font-bold ${checkboxChecked
                                                ? 'bg-orange-250 before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[110%] before:-z-10 before:rounded-[5px] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:duration-300 before:ease-in before:hover:bg-[#732701] before:hover:w-[110%]'
                                                : 'bg-gray-400 cursor-not-allowed'}
                                                 py-[15px] px-[32px] z-10 leading-none overflow-hidden rounded-[50px] transition-all ease-in`}
                                            disabled={!checkboxChecked || isLoading}
                                            onClick={handleCheckout}
                                        >
                                            {isLoading ? (
                                                <span className='flex items-center gap-2'>
                                                    <Loader2 className='animate-spin h-5 w-5' />
                                                    در حال ثبت...
                                                </span>
                                            ) : (
                                                'تایید'
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PaymentDetails;
