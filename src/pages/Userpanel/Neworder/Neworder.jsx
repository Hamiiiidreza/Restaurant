import React, { useContext, useEffect } from 'react';
import { useGetData } from '@/hooks/UseGetData';
import { getProducts } from '@/Utils/Fetchs';
import AddToCartButton from '@/components/Products/AddToCartButton';
import Sortoptions from '@/components/Sortoptions/Sortoptions';
import containerContext from '@/Context/containerContext';

export default function Neworder() {

    const { data: products } = useGetData(['products'], getProducts);
    const contextData = useContext(containerContext);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('fa-IR').format(price);
    };

    useEffect(() => {
        if (products) {
            contextData.setDatas(products);
            contextData.setFilteredProducts(products);
        }
    }, [products]);

    return (
        <div className='p-8'>
            <div className="flex items-center justify-between mb-6">
                <h2 className='text-2xl font-bold'>
                    سفارش جدید
                </h2>
                <Sortoptions />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {contextData.filteredProducts?.map(product => (
                    <div key={product.id}
                        className='bg-[#151B20] rounded-lg p-4 group'
                    >
                        <div className='relative before:absolute before:content-[""] before:top-0 before:right-0 before:w-0 before:h-full before:border before:border-solid before:border-white before:border-opacity-15 before:transition-all before:duration-500 before:ease-in-out before:rounded-[10px] before:opacity-0 before:bg-[#151b20d6] before:group-hover:opacity-100 before:group-hover:w-full'>
                            <img
                                src={product.imgUrl}
                                alt={product.title}
                                className='w-full h-48 object-cover rounded-lg mb-4'
                            />
                            <AddToCartButton opacity="opacity-0" product={product} />
                        </div>

                        <h3 className="text-lg font-semibold mb-2">
                            <a href="" className='transition-all duration-200 ease-in hover:text-orange-250'>{product.title}</a>
                        </h3>
                        <div className="flex justify-between items-center">
                            <span className="text-orange-250">{formatPrice(product.price)} تومان</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
