import React, { useContext, useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import { DateObject } from 'react-multi-date-picker'
import { getReservationsByUser } from '@/Utils/Fetchs'
import containerContext from '@/Context/containerContext'
import { useGetData } from '@/hooks/UseGetData'
import { getTables } from '@/Utils/Fetchs'
import { FaChevronDown } from "react-icons/fa";
import { motion, AnimatePresence } from 'framer-motion';
import { deleteReservation } from '@/Utils/Fetchs'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import StepIndicator from '@/components/StepIndicator/StepIndicator'

export default function UserReservations() {
  const contextData = useContext(containerContext)

  return (
    <div className='p-8'>
      <div className="user-reservations bg-[#151B20] p-8 rounded-lg">
        <StepIndicator currentStep={4} />
        <h2 className="text-2xl text-white mb-6 font-bold">رزرو میز</h2>
        <Link
          to="/Plate/Bookatable"
          className="inline-flex items-center justify-center bg-orange-250 text-white px-6 py-3 rounded hover:bg-orange-300 transition"
        >
          رزرو میز
        </Link>
        <ReservationsList />
      </div>
    </div>
  )
};

function ReservationsList() {
  const contextData = useContext(containerContext);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [expandedReservationId, setExpandedReservationId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const { data: tablesData } = useGetData(['tables'], () => getTables());

  const formatPrice = (price) => new Intl.NumberFormat('fa-IR').format(price);

  const { data: reservationsData } = useGetData(["reservations", contextData.userInfos?.id],
    () => getReservationsByUser(contextData.userInfos?.id)
  );

  const reservations = Array.isArray(reservationsData) ? reservationsData : [];
  console.log("Reservations:", reservations);

  const toggleReservation = (reservationId) => {
    setExpandedReservationId(prev =>
      prev === reservationId ? null : reservationId
    );
  };

  const getTablesArray = (tables) => {
    if (!tables) return [];

    return Array.isArray(tables)
      ? tables
      : Object.entries(tables).map(([type, count]) => {
        const tableInfo = tablesData?.find(t => t.type === type) || {};
        return {
          type,
          quantity: count,
          name: tableInfo.name || type,
          price: tableInfo.price || 0
        };
      });
  };

  const deleteMutation = useMutation({
    mutationFn: deleteReservation,
    onMutate: async (reservationId) => {
      // Cancel ongoing queries for reservations
      await queryClient.cancelQueries(["reservations", contextData.userInfos?.id]);

      // Snapshot previous reservations
      const previousReservations = queryClient.getQueryData(["reservations", contextData.userInfos?.id]) || [];

      // Optimistically remove the reservation
      queryClient.setQueryData(
        ["reservations", contextData.userInfos?.id],
        previousReservations.filter(r => r.id !== reservationId)
      );

      const deletedReservation = previousReservations.find(r => r.id === reservationId);
      if (deletedReservation) {
        const date = new Date(deletedReservation.date);
        const persianDate = new DateObject({ date, calendar: persian })
          .convert(persian, persian_fa)
          .format("YYYY-MM-DD");

        contextData.setReservationData(prev => ({
          ...prev,
          reservedDates: prev.reservedDates.filter(d => d !== persianDate)
        }));
      }

      return { previousReservations };
    },
    onError: (err, _, context) => {
      // Roll back on error
      if (context?.previousReservations) {
        queryClient.setQueryData(
          ["reservations", contextData.userInfos?.id],
          context.previousReservations
        );
      }
    },
    onSettled: () => {
      // Ensure data is fresh
      queryClient.invalidateQueries(["reservations", contextData.userInfos?.id]);
    }
  });


  // تابع حذف رزرو
  const handleDeleteReservation = (reservationId) => {
    swal({
      title: "آیا مطمعن هستید؟",
      text: "رزرو حذف شده قابل بازگشت نیست!",
      icon: "warning",
      buttons: ["لغو", "حذف"],
      dangerMode: true,
    })
      .then(async (willDelete) => {
        if (willDelete) {
          setDeletingId(reservationId);
          await new Promise(resolve => setTimeout(resolve, 2000));
          toast({
            description: 'رزرو شما با موفقیت حذف شد'
          });
          deleteMutation.mutate(reservationId, {
            onSettled: () => {
              setDeletingId(null);
            }
          });
        }
      });
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl text-white mb-4">رزروهای من</h3>
      <div className="space-y-4">
        {reservations.map(reservation => {
          // محاسبه وضعیت انقضا برای هر رزرو
          const reservationDate = reservation?.date ? new Date(reservation.date) : null;
          const isExpired = reservationDate ? new Date() > reservationDate : false;

          // محاسبه 3روز قبل از رزرو
          let threeDaysBefore = null;
          let canDelete = false;
          if (reservationDate) {
            threeDaysBefore = new Date(reservationDate);
            threeDaysBefore.setDate(reservationDate.getDate() - 3);
            canDelete = new Date() < threeDaysBefore;
          }

          return (
            <div key={reservation.id} className="bg-blue-300/10 rounded-lg overflow-hidden">
              <motion.div
                className="cursor-pointer p-4 hover:bg-white/5"
                onClick={() => toggleReservation(reservation.id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white">
                      تاریخ: {new DateObject({
                        date: reservation.displayDate,
                        calendar: persian,
                        locale: persian_fa
                      }).format("YYYY/MM/DD")
                      }
                    </p>
                    <p className="text-white">
                      زمان: {new DateObject({
                        date: reservation.displayDate,
                        calendar: persian,
                        locale: persian_fa
                      }).format("HH:mm")
                      }
                    </p>
                  </div>
                  <div className='flex items-center justify-center gap-4'>
                    <ReservationItem reservation={reservation} />
                    <motion.div
                      animate={{ rotate: expandedReservationId === reservation.id ? 180 : 0 }}
                    >
                      <FaChevronDown className="h-5 w-5" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              <AnimatePresence>
                {expandedReservationId === reservation.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="p-4 border-t border-white/10">

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-gray-400">وضعیت پرداخت:</div>
                        <div className="text-green-500">پرداخت شده</div>

                        <div className="text-gray-400">هزینه کل:</div>
                        <div className="text-white">
                          {Number(reservation.totalCost).toLocaleString('fa-IR')} تومان
                        </div>
                      </div>

                      <div className="flex items-center justify-start gap-5">
                        <h4 className="inline-flex text-white font-bold mb-2">تعداد نفرات:</h4>
                        <div className="inline-flex text-gray-400 mb-2">
                          {reservation.guests?.toLocaleString('fa-IR')} نفر
                        </div>
                      </div>

                      <h4 className="text-white font-bold mb-2">میزها:</h4>
                      <div className="space-y-2">
                        {getTablesArray(reservation.tables).map((table, index) => (
                          <div key={index} className="bg-[#0E1317] p-3 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <div className="flex justify-between items-center">
                                  <div className="text-white">{table.name || table.type}</div>
                                  <div className="flex items-center justify-between gap-28 text-gray-400">
                                    <div>تعداد: {table.quantity.toLocaleString('fa-IR')}</div>
                                    <div>
                                      قیمت: {table.price ? formatPrice(table.price) : '---'} تومان
                                    </div>
                                  </div>
                                  <div className="text-orange-250">
                                    جمع: {formatPrice((table.quantity || 0) * (table.price || 0))} تومان
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <h4 className="text-white font-bold mb-2">محصولات:</h4>
                      <div className="space-y-2">
                        {reservation.products?.map((product, index) => (
                          <div key={index} className="bg-[#0E1317] p-3 rounded-lg">
                            <div className="flex items-center gap-4">
                              {product.imgUrl && (
                                <img
                                  src={product.imgUrl}
                                  alt={product.name}
                                  className="w-16 h-16 object-cover rounded"
                                />
                              )}
                              <div className="flex-1">
                                <div className="flex justify-between items-center">
                                  <div className="text-white">{product.name}</div>
                                  <div className="flex items-center justify-between gap-28 text-gray-400">
                                    <div>
                                      تعداد:  {product.quantity.toLocaleString('fa-IR')}
                                    </div>
                                    <div>
                                      قیمت:  {Number(product.price).toLocaleString('fa-IR')} تومان
                                    </div>
                                  </div>
                                  <div className="text-orange-250">
                                    جمع: {(product.quantity * product.price).toLocaleString('fa-IR')} تومان
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 flex justify-end">
                        {isExpired ? (
                          <button
                            className='bg-gray-500 text-white px-4 py-2 rounded-md cursor-not-allowed opacity-50'
                            disabled
                          >
                            امکان حذف رزرو منقضی وجود ندارد
                          </button>
                        ) : !canDelete ? (
                          <button
                            className='bg-gray-500 text-white px-4 py-2 rounded-md cursor-not-allowed opacity-50'
                            disabled
                          >
                            حذف رزرو تنها تا 3 روز قبل از تاریخ رزرو امکان پذیر است
                          </button>
                        ) : (
                          < button
                            onClick={() => handleDeleteReservation(reservation.id)}
                            disabled={deletingId === reservation.id}
                            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
                          >
                            {deletingId === reservation.id ? (
                              <span className="flex items-center gap-2">
                                <Loader2 className="animate-spin h-4 w-4" />
                                در حال حذف...
                              </span>
                            ) : (
                              <span>حذف رزرو</span>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div >
  );
};

function ReservationItem({ reservation }) {
  const reservationDate = reservation?.date ? new Date(reservation?.date) : null;
  const isExpired = reservationDate ? new Date() > reservationDate : false;

  return (
    <div className={`p-4 rounded-lg ${isExpired ? 'bg-gray-800' : 'bg-[#0E1317]'}`}>
      <span className={`px-3 py-1 rounded ${isExpired ? 'bg-red-500' : 'bg-green-500'}`}>
        {isExpired ? 'منقضی شده' : 'فعال'}
      </span>
    </div>
  );
};


