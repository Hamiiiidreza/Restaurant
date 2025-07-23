import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import containerContext from '@/Context/containerContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import Cookies from 'js-cookie';
import gregorian from 'react-date-object/calendars/gregorian';
import { getReservationsByDate } from '@/Utils/Fetchs';
import { useQueryClient } from '@tanstack/react-query';
import StepIndicator from '../StepIndicator/StepIndicator';

export default function ReservationCheckout() {

    const contextData = useContext(containerContext);
    const [paymentMethod, setPaymentMethod] = useState('online');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        // بارگذاری مجدد رزروها پس از پرداخت
        if (contextData.userInfos?.id) {
            contextData.loadUserReservations(contextData.userInfos.id);
        }
    }, [contextData.userInfos?.id, contextData.loadUserReservations]);

    const handlePayment = async () => {
        setIsProcessing(true);
        setIsProcessingPayment(true); // فعال کردن حالت "در حال پرداخت"
        try {
            if (!contextData.reservationData.dateTime?.date) {
                throw new Error('تاریخ رزرو انتخاب نشده است');
            }

            await new Promise(resolve => setTimeout(resolve, 2000));

            // تبدیل تاریخ به فرمت ISO
            const dateObj = new DateObject(contextData.reservationData.dateTime.date);
            const isoDate = dateObj.convert(gregorian).toDate().toISOString().split('T')[0];

            // ساخت داده رزرو
            const reservationData = {
                userId: contextData.userInfos.id,
                date: isoDate,
                displayDate: contextData.reservationData.dateTime.displayDate,
                guests: contextData.reservationData.guests,
                tables: contextData.reservationData.cart
                    ?.filter(item => item.category === 'table')
                    .reduce((acc, item) => ({
                        ...acc,
                        [item.type]: item.count
                    }), {}),
                ...(contextData.reservationData.cart?.filter(item => item.category === 'food').length > 0 && {
                    products: contextData.reservationData.cart
                        .filter(item => item.category === 'food')
                        .map(item => ({
                            id: item.id,
                            name: item.title,
                            quantity: item.quantity,
                            price: item.price,
                            imgUrl: item.imgUrl
                        }))
                }),
                totalCost: calculateTotal(),
                status: 'confirmed',
                paymentStatus: 'paid'
            };

            // مرحله 1: ثبت رزرو
            const res = await fetch('http://localhost:4000/reservations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reservationData)
            });

            if (!res.ok) throw new Error('خطا در ثبت رزرو');


            // پاک کردن سبد خرید و به روزرسانی تاریخ های رزرو
            contextData.setReservationData(prev => ({
                ...prev,
                cart: [],
                dateTime: null,
                guests: 2,
                reservedDates: [...new Set(prev.reservedDates || []), isoDate]
            }));

            const persianDateStr = new DateObject(isoDate)
                .convert(persian, persian_fa)
                .format("YYYY-MM-DD");

            // به‌روزرسانی context با تاریخ جدید
            contextData.setReservationData(prev => ({
                ...prev,
                cart: [],
                dateTime: null,
                guests: 2,
                reservedDates: [...new Set([...(prev.reservedDates || []), persianDateStr])]
            }));

            // اعتبارسنجی مجدد کش‌های مربوطه
            await queryClient.invalidateQueries(['reservations']);
            await queryClient.invalidateQueries(['tables']);

            toast({
                description: "پرداخت شما با موفقیت انجام شد",
            });

            navigate('/my-account/table-Reservation');
        } catch (error) {
            toast({
                title: 'خطا',
                description: error.message,
                variant: 'destructive'
            });
        } finally {
            setIsProcessing(false);
            setIsProcessingPayment(false); // غیرفعال کردن حالت "در حال پرداخت"
        }
    };

    useEffect(() => {
        console.log('Reservation Data:', contextData.reservationData);

        // بازیابی از کوکی
        if (contextData.userInfos?.id) {
            const savedData = Cookies.get(`reservationData_${contextData.userInfos.id}`);
            if (savedData) {
                try {
                    const parsedData = JSON.parse(savedData);
                    // به‌روزرسانی کانتکست
                    contextData.setReservationData(parsedData);
                } catch (error) {
                    console.error('Error parsing reservation data:', error);
                }
            }
        }
    }, [contextData.userInfos?.id]);

    const calculateTotal = () => {
        return contextData.reservationData.cart?.reduce((total, item) => {
            if (item.category === 'table') {
                return total + (item.price * item.count);
            }
            if (item.category === 'food') {
                return total + (item.price * item.quantity);
            }
            return total;
        }, 0) || 0;
    };

    const formatDate = (dateString) => {
        if (!dateString || !contextData.reservationData.dateTime) return 'تاریخ نامعتبر';
        try {
            const date = new DateObject({
                date: contextData.reservationData.dateTime.displayDate,
                calendar: persian,
                locale: persian_fa
            });

            const formattedDate = date.format("YYYY/MM/DD HH:mm");
            return formattedDate;
        } catch {
            return 'تاریخ نامعتبر';
        }
    };

    return (
        <div className='reservation-checkout py-[100px]'>
            <div className="container">
                <StepIndicator currentStep={3} />
                <div className="bg-[#151B20] p-8 rounded-lg">
                    <h2 className="text-2xl text-white mb-6">تأیید نهایی رزرو</h2>

                    <div className="reservation-summary mb-6 space-y-4">
                        <div className="bg-[#0E1317] p-4 rounded">
                            <h3 className="text-white text-lg mb-2">زمان رزرو:</h3>
                            <p className="text-orange-250">
                                {contextData.reservationData.dateTime ? formatDate(contextData.reservationData.dateTime.date) : 'تاریخ نا معتبر'}
                            </p>
                        </div>

                        <div className="bg-[#0E1317] p-4 rounded">
                            <h3 className="text-white text-lg mb-2">تعداد نفرات:</h3>
                            <p className="text-orange-250">
                                {contextData.reservationData.guests.toLocaleString('fa-IR')} نفر
                            </p>
                        </div>

                        <div className="bg-[#0E1317] p-4 rounded">
                            <h3 className="text-white text-lg mb-3">میزها:</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-white border-b border-gray-600">
                                            <th className="text-right py-2 px-4">اسم میز</th>
                                            <th className="text-right py-2 px-4">تعداد</th>
                                            <th className="text-right py-2 px-4">قیمت</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contextData.reservationData.cart?.filter(item => item.category === 'table')
                                            .map((table, index) => (
                                                <tr key={index} className="text-gray-400 border-b border-gray-600">
                                                    <td className="py-3 px-4">میز {table.name}</td>
                                                    <td className="py-3 px-4">{table.count.toLocaleString('fa-IR')} عدد</td>
                                                    <td className="py-3 px-4">{(table.price * table.count).toLocaleString('fa-IR')} تومان</td>
                                                </tr>
                                            ))}

                                        {contextData.reservationData.cart?.filter(item => item.category === 'table').length > 0 && (
                                            <tr className="text-white border-t border-gray-600">
                                                <td className="py-3 px-4 font-bold">جمع کل میزها</td>
                                                <td className="py-3 px-4 font-bold">
                                                    {contextData.reservationData.cart
                                                        .filter(item => item.category === 'table')
                                                        .reduce((sum, table) => sum + table.count, 0)
                                                        .toLocaleString('fa-IR')} عدد
                                                </td>
                                                <td className="py-3 px-4 font-bold">
                                                    {contextData.reservationData.cart
                                                        .filter(item => item.category === 'table')
                                                        .reduce((sum, table) => sum + (table.price * table.count), 0)
                                                        .toLocaleString('fa-IR')} تومان
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-[#0E1317] p-4 rounded">
                            <h3 className="text-white text-lg mb-3">محصولات:</h3>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-white border-b border-gray-600">
                                            <th className="text-right py-2 px-4">اسم محصول</th>
                                            <th className="text-right py-2 px-4">تعداد</th>
                                            <th className="text-right py-2 px-4">قیمت</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contextData.reservationData.cart?.filter(item => item.category === 'food')
                                            .map((product, index) => (
                                                <tr key={index} className="text-gray-400 border-b border-gray-600">
                                                    <td className="py-3 px-4">{product.title}</td>
                                                    <td className="py-3 px-4">{product.quantity.toLocaleString('fa-IR')} عدد</td>
                                                    <td className="py-3 px-4">{(product.price * product.quantity).toLocaleString('fa-IR')} تومان</td>
                                                </tr>
                                            ))}

                                        {contextData.reservationData.cart?.filter(item => item.category === 'food').length > 0 && (
                                            <tr className="text-white border-t border-gray-600">
                                                <td className="py-3 px-4 font-bold">جمع کل محصولات</td>
                                                <td className="py-3 px-4 font-bold">
                                                    {contextData.reservationData.cart
                                                        .filter(item => item.category === 'food')
                                                        .reduce((sum, product) => sum + product.quantity, 0)
                                                        .toLocaleString('fa-IR')} عدد
                                                </td>
                                                <td className="py-3 px-4 font-bold">
                                                    {contextData.reservationData.cart
                                                        .filter(item => item.category === 'food')
                                                        .reduce((sum, product) => sum + (product.price * product.quantity), 0)
                                                        .toLocaleString('fa-IR')} تومان
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-[#0E1317] p-4 rounded">
                            <div className="flex justify-between text-xl text-orange-250">
                                <span>جمع کل:</span>
                                <span>{calculateTotal().toLocaleString('fa-IR')} تومان</span>
                            </div>
                        </div>
                    </div>

                    <div className="total-price text-xl text-white mb-6">
                        مبلغ قابل پرداخت: {calculateTotal().toLocaleString('fa-IR')} تومان
                    </div>

                    <button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="bg-orange-250 text-white px-6 py-3 rounded hover:bg-orange-300 transition w-full"
                    >
                        {isProcessingPayment ? (
                            <div className="flex items-center justify-center gap-2">
                                <Loader2 className="animate-spin h-5 w-5" />
                                <span>در حال پرداخت...</span>
                            </div>
                        ) : isProcessing ? (
                            <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                        ) : (
                            'تأیید و پرداخت'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};



