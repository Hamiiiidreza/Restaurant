import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import containerContext from '@/Context/containerContext';
import { FaRegTrashAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Cartpanel = ({ isOpen, onClose }) => {

    const [removingProductId, setRemovingProductId] = useState({});

    const contextData = useContext(containerContext);

    const { toast } = useToast();
    const showToast = () => {
        toast({
            description: "محصول مورد نظر شما با موفقیت از سبد خرید حذف شد.",
        });
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price);
    };

    const totalPrice = contextData.userCart?.reduce((total, product) =>
        total + (product.price * (product.count || 1)), 0) || 0;

    const handleRemove = async (productId) => {
        setRemovingProductId(prev => ({ ...prev, [productId]: true }));

        try {
            await contextData.removeProduct(productId);
            showToast();
        } catch (error) {
            console.error('Error removing product:', error);
        } finally {
            setRemovingProductId(prev => {
                const newState = { ...prev };
                delete newState[productId];
                return newState;
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className='absolute animate-slideIn pt-4 left-0 top-full z-10 transition-all duration-300 origin-top'
            onClick={(e) => e.stopPropagation()}
        >
            <div className='w-[362px] dark:bg-[#242a38] bg-white rounded-lg overflow-hidden'>
                <div className='flex items-center justify-between px-5 py-4 dark:bg-sky-500/10 bg-sky-50 text-sky-500 mb-5 transition-colors duration-300'>
                    <span className='font-bold'>سبد خرید من</span>
                    <span className='font-bold text-slate-500'>{contextData.cartItems} محصول</span>
                </div>
                <div className='cart-body px-5 space-y-4 max-h-[228px] overflow-y-auto scrollbar-minimal'>
                    {
                        contextData.userCart?.length === 0 ? (
                            <div className="flex flex-col items-center py-4 dark:text-gray-400 text-slate-500">
                                <FiShoppingCart className='text-4xl mb-2' />
                                <p className="text-base">سبد خرید شما خالی است</p>
                                <Link to="/Store/Shopgrid"
                                    className='relative mt-10 z-10 leading-none font-bold overflow-hidden text-orange-250 rounded-[50px] py-[15px] px-8 border border-[#38393D] whitespace-nowrap transition-colors hover:text-white before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-0 before:h-[110%] before:-z-10 before:rounded-[5px] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:duration-200 before:ease-linear before:hover:bg-orange-250 before:hover:w-[110%]'
                                    onClick={onClose}
                                >
                                    بازگشت به فروشگاه
                                </Link>
                            </div>
                        ) : (
                            Array.isArray(contextData.userCart) && [...contextData.userCart].reverse().map((product) => (
                                <div key={product.id} className="cart-item relative flex items-center gap-x-5">
                                    <Link to={`/Store/Shopdetails/${product.id}`}
                                        className='w-[107px] h-[60px] shrink-0 rounded-lg'
                                    >
                                        <img src={product.imgUrl}
                                            alt={product.title}
                                            className='h-full w-full rounded-lg object-cover'
                                        />
                                    </Link>
                                    <div className='flex flex-col justify-between'>
                                        <Link to={`/Store/Shopdetails/${product.id}`}
                                            className='text-base dark:text-white text-gray-900 line-clamp-2 hover:text-orange-250 transition-colors'
                                        >
                                            {product.title}
                                        </Link>
                                        <div className='flex items-center justify-between gap-2'>
                                            <div className='flex items-center gap-x-1'>
                                                <span className='text-base dark:text-gray-400 text-slate-500'>
                                                    تعداد: {product.count || 1}
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-x-1 dark:text-white text-gray-900'>
                                                <span className='text-base'>
                                                    {formatPrice(product.price * (product.count || 1))}
                                                </span>
                                                <span className="text-base">تومان</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(product.id)}
                                        disabled={removingProductId[product.id]}
                                        className='absolute left-0 text-gray-400'
                                    >
                                        {removingProductId[product.id] ? (
                                            <Loader2 className='h-4 w-4 animate-spin' />
                                        ) : (
                                            <FaRegTrashAlt className='hover:text-[#732701] transition-colors' />
                                        )}
                                    </button>
                                </div>
                            )
                            ))}
                </div>
                {
                    contextData.userCart?.length > 0 && (
                        <div className='mt-5 px-5 pb-5'>
                            <div className='flex items-center justify-between border-t dark:border-white/10 border-neutral-200 pt-4 mb-5'>
                                <span className='dark:text-white text-gray-900'>مبلغ قابل پرداخت:</span>
                                <div className='flex items-center gap-x-1 dark:text-white text-gray-900'>
                                    <span className='text-lg font-semibold'>
                                        {formatPrice(totalPrice)}
                                    </span>
                                    <span className='text-base'>تومان</span>
                                </div>
                            </div>
                            <Link to='/Store/Shoppingcart'
                                className='inline-flex items-center justify-center w-full h-[52px] rounded-lg bg-orange-250 text-white transition-all duration-200 linear hover:bg-[#722700]'
                                onClick={onClose}
                            >
                                مشاهده سبد خرید
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Cartpanel;
