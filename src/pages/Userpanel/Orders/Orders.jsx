import React, { useContext, useState } from 'react'
import { useGetData } from '@/hooks/UseGetData'
import { getOrders } from '@/Utils/Fetchs'
import containerContext from '@/Context/containerContext';
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';

export default function Orders() {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const contextData = useContext(containerContext);

  const { data: orders, isLoading } = useGetData(["orders", contextData.userInfos?.id],
    () => getOrders(contextData.userInfos?.id),
    { enabled: !!contextData.userInfos?.id }
  );

  const toggleOrder = (orderId) => {
    setExpandedOrderId(prev => prev === orderId ? null : orderId);
  };


  return (
    <div className='p-8 h-full flex flex-col'>
      <h2 className="text-2xl font-bold mb-6">سفارشات قبلی</h2>

      <div className='flex-1 overflow-hidden relative'>
        <div className='h-full overflow-y-auto pb-4 custom-scrollbar'>
          {orders?.length === 0 ? (
            <div className='text-center py-4'>سفارشی یافت نشد</div>
          ) : (
            <div className='space-y-2'>
              {/* Header */}
              <div className='hidden md:grid grid-cols-12 gap-4 px-4 py-3 bg-[#151B20] rounded-t-lg sticky top-0 z-10'>
                <div className='col-span-1'></div>
                <div className='col-span-2 font-medium'>شماره سفارش</div>
                <div className='col-span-3 font-medium'>تاریخ</div>
                <div className='col-span-3 font-medium'>مبلغ</div>
                <div className='col-span-3 font-medium'>وضعیت</div>
              </div>

              {orders?.map(order => (
                <>
                  <div
                    key={order.id}
                    className='bg-[#151B20] rounded-lg overflow-hidden'
                  >
                    <motion.div
                      className={`cursor-pointer p-4 hover:bg-white/5 transition-colors
                      ${expandedOrderId === order.id ? 'bg-white/5' : ''}`}
                      onClick={() => toggleOrder(order.id)}
                    >
                      <div className='grid grid-cols-12 gap-4 items-center'>
                        <div className='col-span-12 md:col-span-1 flex justify-center md:justify-start'>
                          <motion.div
                            animate={{ rotate: expandedOrderId === order.id ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FaChevronDown className='h-5 w-5' />
                          </motion.div>
                        </div>

                        <div className='col-span-6 md:col-span-2'>
                          <div className='md:hidden text-sm text-gray-400'>شماره سفارش</div>
                          {order.id}
                        </div>

                        <div className='col-span-6 md:col-span-3'>
                          <div className='md:hidden text-sm text-gray-400'>تاریخ</div>
                          {new Date(order.date).toLocaleDateString('fa-IR')}
                        </div>

                        <div className='col-span-6 md:col-span-3'>
                          <div className='md:hidden text-sm text-gray-400'>مبلغ</div>
                          {Number(order.total).toLocaleString('fa-IR')} تومان
                        </div>

                        <div className='col-span-6 md:col-span-3'>
                          <div className='md:hidden text-sm text-gray-400'>وضعیت</div>
                          <span className='px-2 py-1 bg-green-500/20 text-green-500 rounded text-sm'>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                    <AnimatePresence>
                      {expandedOrderId === order.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className='overflow-hidden'
                        >
                          <div className='px-4 pb-4 pt-2 border-t border-white/10'>
                            <h3 className='font-bold mb-3'>محصولات سفارش:</h3>
                            <div className='grid gap-2'>
                              {order.products.map((product, index) => (
                                <div
                                  key={index}
                                  className='bg-black/20 p-3 rounded-lg flex justify-between items-start md:items-center gap-4'
                                >
                                  <div className="flex items-center gap-4 flex-1">
                                    <div>
                                      <h4 className='font-medium'>{product.title}</h4>
                                      <p className='text-sm text-gray-400'>
                                        تعداد: {product.count}
                                      </p>
                                    </div>
                                    <img
                                      src={product.imgUrl}
                                      alt={product.title}
                                      className='w-16 h-16 object-cover rounded-lg border border-white/10' />
                                  </div>
                                  <p className='text-lg'>
                                    {Number(product.price).toLocaleString('fa-IR')} تومان
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

