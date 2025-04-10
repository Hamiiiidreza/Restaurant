import containerContext from '@/Context/containerContext.js';
import React, { useContext, useState } from 'react'
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useToast } from '@/hooks/use-toast';
import { deleteProductFromCart } from '@/Utils/Fetchs';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { FiShoppingCart } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";

export default function Shoppingtable() {

  const [removingProductId, setRemovingProductId] = useState({});
  const [couponCode, setCouponCode] = useState('');

  const contextData = useContext(containerContext)

  const { toast } = useToast();
  const showToast = () => {
    toast({
      description: "محصول مورد نظر شما با موفقیت از سبد خرید حذف شد.",
    });
  };

  const handleRemoveProduct = async (productId) => {
    setRemovingProductId(prev => ({ ...prev, [productId]: true }));

    try {
      // UI حذف فوری از
      contextData.removeProduct(productId);
      // اضافه کردن تاخیر مصنوعی 2 ثانیه ای برای نمایش لودینگ
      await new Promise(resolve => setTimeout(resolve, 2000));
      await deleteProductFromCart(contextData.userInfos.id, productId);
      showToast();
    } catch (error) {
      swal({
        title: 'خطا!',
        text: 'مشکل در حذف محصول',
        icon: 'error',
        button: 'باشه'
      });
    } finally {
      setRemovingProductId(prev => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  const totalPrice = () => {
    return contextData.cartTotal - (contextData.cartTotal * (contextData.discount / 100));
  };

  return (
    <div className='shoppingcart py-[130px] '>
      <div className='container px-10'>
        {
          contextData.userCart?.length === 0 ? (
            <div>
              <div className='flex flex-col items-center gap-5 w-1/2 py-5 bg-[#151B20] my-0 mx-auto rounded-[5px]'>
                <div className='relative right-[13px]'>
                  <FiShoppingCart className='size-48 text-[150px]' />
                  <FaTimes className='absolute top-[55px] right-[42px] size-16 text-[50px]' />
                </div>
                <h2 className='text-3xl tracking-tighter'>سبد خرید شما خالی است!</h2>
                <h4 className='text-xl text-gray-500'>زمان اون رسیده که خریدتون رو شروع کنید</h4>
                <Link to="/Store/Shopgrid" className='relative mt-20 z-10 leading-none font-bold overflow-hidden text-orange-250 rounded-[50px] py-[15px] px-8 border border-[#38393D] whitespace-nowrap transition-colors hover:text-white before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-0 before:h-[110%] before:-z-10 before:rounded-[5px] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:duration-200 before:ease-linear before:hover:bg-orange-250 before:hover:w-[110%]'>
                  بازگشت به فروشگاه
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className='cart-table mb-[65px] whitespace-nowrap'>
                <table className="w-full">
                  <thead className='w-full'>
                    <tr className='w-full'>
                      <th className='text-white text-xl text-right py-[14px] px-5 border-none bg-[#151B20] font-extrabold w-[167px]'>محصول</th>
                      <th className='text-white text-xl text-right py-[14px] px-5 border-none bg-[#151B20] font-extrabold w-[221px]'>نام</th>
                      <th className='text-white text-xl text-right py-[14px] px-5 border-none bg-[#151B20] font-extrabold w-[235px]'> قیمت</th>
                      <th className='text-white text-xl text-right py-[14px] px-5 border-none bg-[#151B20] font-extrabold w-[196px]'>تعداد</th>
                      <th className='text-white text-xl text-right py-[14px] px-5 border-none bg-[#151B20] font-extrabold w-[235px]'>جمع</th>
                      <th className='text-white text-xl text-right py-[14px] px-5 border-none bg-[#151B20] font-extrabold w-[104px]'></th>
                    </tr>
                  </thead >
                  <tbody className='w-full'>
                    {
                      Array.isArray(contextData.userCart) && [...contextData.userCart].reverse().map((product) => {
                        console.log(product);
                        return (
                          <tr className='w-full text-right pr-0 py-[18px] pl-5 border-b border-white border-opacity-10' key={product.id}>
                            <td className='text-right pr-0 py-[18px] px-5'>
                              <div className='rounded-[5px] overflow-hidden text-right h-[74px]'>
                                <img className='w-[77px] h-[74px] rounded-[5px] overflow-hidden' src={product.imgUrl} alt='' />
                              </div>
                            </td>
                            <td className='text-right py-[18px] px-5'>
                              <a className='text-lg text-white font-bold' href="#">{product.title}</a>
                            </td>
                            <td className='text-right text-lg text-white font-bold py-[18px] px-5'>{formatPrice(product.price)} تومان</td>
                            <td className='text-right py-[18px] px-5'>
                              <div className='counter relative bg-[#151B20] w-[74px] h-[29px]'>
                                <button onClick={() => contextData.updateCount(product.id, 'decrement')}
                                  className='absolute right-[5px] top-0 z-10 w-[25px] h-[29px] bg-transparent text-sm border-none p-0'
                                >
                                  <FaMinus />
                                </button>
                                <input className='pr-8 border-none h-[29px] text-sm pt-3 text-[#D2D2D2] bg-transparent py-3 px-[15px w-full] outline-none'
                                  type="text"
                                  value={product.count || 1}
                                  size="25"
                                  readOnly
                                />
                                <button onClick={() => contextData.updateCount(product.id, 'increment')}
                                  className='absolute left-[5px] top-0 z-10 w-[25px] h-[29px] bg-transparent text-sm border-none p-0'>
                                  <FaPlus />
                                </button>
                              </div>
                            </td>
                            <td className='text-right text-lg text-white font-bold py-[18px] px-5'>{formatPrice(product.price * product.count)} تومان</td>
                            <td>
                              <button onClick={() => handleRemoveProduct(product.id)}
                                disabled={removingProductId[product.id]}
                              >
                                {removingProductId[product.id] ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <FaRegTrashAlt className='text-[#732701]' />
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table >
              </div >
              <div className='flex justify-between mb-[50px]'>
                <div className='w-[41.66%] mb-[25px] pl-3'>
                  <div className='coupon-code relative'>
                    <input
                      type="text"
                      placeholder='کد تخفیف'
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className='w-full h-[60px] bg-[#151B20] py-[10px] pr-5 pl-[50px] border-none outline-none rounded-[5px] text-white text-base'
                    />
                    <button
                      onClick={() => contextData.applyCoupon(couponCode)}
                      className='absolute text-white font-bold z-10 overflow-hidden bg-orange-250 top-[5px] left-[5px] h-[calc(100%_-_10px)] py-[5px] px-[18px] rounded-[5px] transition-all ease-in duration-100 before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[110%] before:-z-10 before:rounded-[5px] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:ease-in before:duration-300 before:hover:bg-[#732701] before:hover:w-[110%]'
                    >
                      اعمال کوپن
                    </button>
                  </div>
                </div>
                <div className='w-[58.33%] flex items-center justify-end pr-3'>
                  <Link to='/Store/Shopgrid' className='relative text-white font-bold bg-[#F33C3C] rounded-[5px] py-[15px] px-8 z-10 leading-none overflow-hidden transition-all ease-in duration-300 before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[110%] before:-z-10 before:rounded-[5px] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:ease-in before:duration-300 before:hover:w-[110%] before:hover:bg-[#732701]'>
                    به روز رسانی سبد خرید
                  </Link>
                </div>
              </div>
              <div>
                <div className='w-[50%] mr-[25%] px-3'>
                  <div className="cart-total px-[41px] pt-10 pb-[45px] bg-[#151B20] rounded-[5px]">
                    <h3 className='text-lg text-white font-bold mb-[18px]'>مجموع سبد خرید</h3>
                    <div className='mb-[10px]'>
                      <div className='flex flex-wrap justify-between items-center px-5 py-[15px] border-b border-white border-opacity-10'>
                        <p className='text-white leading-none'>جمع فرعی</p>
                        <span className='text-white leading-none'>0 تومان</span>
                      </div>
                      <div className='flex flex-wrap justify-between items-center px-5 py-[15px] border-b border-white border-opacity-10'>
                        <p className='text-white leading-none'>حمل دریایی</p>
                        <span className='text-white leading-none'>0 تومان</span>
                      </div>
                      <div className='flex flex-wrap justify-between items-center px-5 py-[15px] border-b border-white border-opacity-10'>
                        <p className='text-white leading-none'>تخفیف</p>
                        <span className='text-white leading-none'>
                          {formatPrice((totalPrice() * contextData.discount) / (100 - contextData.discount))} تومان ({contextData.discount}%)
                        </span>
                      </div>
                      <div className='flex flex-wrap justify-between items-center px-5 py-[15px]'>
                        <p className='text-white leading-none font-bold'>جمع کل</p>
                        <span className='text-white leading-none font-bold'>
                          {formatPrice(totalPrice())} تومان
                        </span>
                      </div>
                    </div>
                    <Link to="/Store/Checkout" className='relative inline-flex mt-[30px] text-white font-bold bg-orange-250 py-[15px] px-8 z-10 leading-none overflow-hidden rounded-[5px] transition-all ease-in duration-300 before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[110%] before:-z-10 before:rounded-[5%] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:ease-in before:duration-300 before:hover:bg-[#732701] before:hover:w-[110%]'>به پرداخت ادامه دهید</Link>
                  </div>
                </div>
              </div>
            </>
          )
        }
      </div >
    </div >
  )
}
