import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import AddToCartButton from './AddToCartButton';
import containerContext from '@/Context/containerContext.js';
import ReactStars  from 'react-rating-stars-component';
import { useGetData } from '@/hooks/UseGetData';
import { getReviews } from '@/Utils/Fetchs';
import { IoMdStar, IoMdStarHalf , IoMdStarOutline  } from "react-icons/io";

export default function ProductsCard({ productId, products }) {

    const { data: reviews = [] } = useGetData(['reviews', productId], () => getReviews(productId));
    const contextData = useContext(containerContext)

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price);
    };

    const calculateAverageRating = (productId) => {
        const productReviews = contextData.allReviews?.filter(r => r.productId === productId.toString()) || [];
        if (productReviews.length === 0) return 0;
        const total = productReviews.reduce((sum, r) => sum + r.rating, 0);
        return total / productReviews.length;
    };


    return (
        < >
            {
                products?.map(product => (
                    <div className='w-[33.33%] px-3' key={product.id}>
                        <div className='product-card mb-[45px] group'>
                            <div className='product-img relative h-[316px] rounded-[10px] mb-[25px] overflow-hidden before:absolute before:content-[""] before:top-0 before:right-0 before:w-0 before:h-full before:border before:border-solid before:border-white before:border-opacity-15 before:transition-all before:duration-500 before:ease-in-out before:rounded-[10px] before:opacity-0 before:bg-[#151b20d6] before:group-hover:opacity-100 before:group-hover:w-full'>
                                <img src={product.imgUrl} />
                                <AddToCartButton opacity="opacity-0" product={product} />
                            </div>
                            <div className='product-info flex items-start justify-between'>
                                <div>
                                    <h3 className='text-[22px] text-white font-bold mb-3'>
                                        <Link
                                            to={`/Store/Shopdetails/${product.id}`}
                                            className='transition-all duration-200 ease-in hover:text-orange-250'>
                                            {product.title}
                                        </Link>
                                    </h3>
                                    <ReactStars 
                                        count={5}
                                        value={calculateAverageRating(product.id)}
                                        size={24}
                                        activeColor="#FFBB0B"
                                        edit={false}
                                        isHalf={true}
                                        precision={0.5}
                                        emptyIcon={<IoMdStarOutline />}
                                        halfIcon={<IoMdStarHalf />}
                                        filledIcon={<IoMdStar />}
                                        key={`rating-${product.id}-${contextData.allReviews?.length}`} // برای رندر مجدد
                                    />
                                </div>
                                <span className='text-xl text-orange-250 font-bold'>{formatPrice(product.price)} تومان</span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
}
