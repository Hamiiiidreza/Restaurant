import React from 'react'
import { getOrders, getCoupons, getReviews } from '@/Utils/Fetchs'
import { useQueries } from '@tanstack/react-query';

export default function Dashboard() {
  const result = useQueries({
    queries: [
      { queryKey: ['orders'], queryFn: getOrders },
      { queryKey: ['coupons'], queryFn: getCoupons },
      { queryKey: ['reviews'], queryFn: getReviews }
    ]
  });

  const [
    { data: orders, isLoading: ordersLoading, error: ordersError },
    { data: coupons, isLoading: couponsLoading, error: couponsError },
    { data: reviews, isLoading: reviewsLoading, error: reviewsError }
  ] = result;

  if (ordersLoading || couponsLoading || reviewsLoading) {
    return <div>در حال بارگیری...</div>;
  }

  if (ordersError || couponsError || reviewsError) {
    return <div>خطا در دریافت داده ها</div>;
  }

  return (
    <div className='p-8'>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="dark:bg-[#151B20] bg-gray-200 dark:text-white text-gray-800 p-6 rounded-lg transition-colors duration-300">
          <h3 className='text-lg font-semibold mb-2'>
            سفارشات فعال
          </h3>
          <p className='text-2xl'>
            {orders?.filter(o => o.status === 'active').length || 0}
          </p>
        </div>
        <div className="dark:bg-[#151B20] bg-gray-200 dark:text-white text-gray-800 p-6 rounded-lg transition-colors duration-300">
          <h3 className='text-lg font-semibold mb-2'>
            تخفیف های فعال
          </h3>
          <p className='text-2xl'>
            {coupons?.filter(c => {
              const expiryDate = new Date(c.expiry);
              return !isNaN(expiryDate) && expiryDate > new Date();
            }).length || 0}
          </p>
        </div>
        <div className="dark:bg-[#151B20] bg-gray-200 dark:text-white text-gray-800 p-6 rounded-lg transition-colors duration-300">
          <h3 className='text-lg font-semibold mb-2'>
            نظرات من
          </h3>
          <p className='text-2xl'>
            {reviews?.length || 0}
          </p>
        </div>
      </div>
    </div>
  )
}
