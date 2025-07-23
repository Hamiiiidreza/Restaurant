import React, { useContext, useEffect, useState } from 'react';
import { FaRegTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useToast } from '@/hooks/use-toast';
import containerContext from '@/Context/containerContext';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { FiShoppingCart } from "react-icons/fi";
import { FaTimes } from "react-icons/fa";
import swal from 'sweetalert';
import Cookies from 'js-cookie';
import StepIndicator from '../StepIndicator/StepIndicator';


export default function ReservationCart() {
    const contextData = useContext(containerContext);
    const navigate = useNavigate();
    const { toast } = useToast();
    const [capacityError, setCapacityError] = useState('');

    // اعتبار سنجی ظرفیت
    const calculateTotalCapacity = () => {
        return contextData.reservationData.cart?.filter(item => item.category === 'table')
            .reduce((sum, table) => sum + (table.count * table.max), 0) || 0;
    };

    // اعتبار سنجی خودکار
    useEffect(() => {
        const totalCapacity = calculateTotalCapacity();
        if (totalCapacity > 0 && totalCapacity < contextData.reservationData.guests) {
            setCapacityError(`ظرفیت کل میزها ${totalCapacity} نفر است!`);
        } else {
            setCapacityError('');
        }
    }, [contextData.reservationData.guests, contextData.reservationData.cart]);

    const handleGuestChange = (action) => {
        const newGuests = action === 'increment'
            ? contextData.reservationData.guests + 2
            : Math.max(2, contextData.reservationData.guests - 2);

        contextData.setReservationData(prev => ({
            ...prev,
            guests: newGuests
        }));
    };

    const handleApplyChanges = () => {
        if (!validateCapacity()) return;

        navigate('/my-account/ReservationCheckout');
    };

    const validateCapacity = () => {
        // بررسی وجود میز
        const tables = contextData.reservationData.cart?.filter(item => item.category === 'table');
        if (tables.length === 0) {
            swal({
                title: 'خطا',
                text: 'لطفا حداقل یک میز انتخاب کنید',
                icon: 'error',
                button: 'متوجه شدم'
            });
            return false;
        }

        // بررسی وجود غذا
        const foods = contextData.reservationData.cart?.filter(item => item.category === 'food');
        if (foods.length === 0) {
            swal({
                title: 'خطا',
                text: 'لطفا حداقل یک محصول غذایی انتخاب کنید',
                icon: 'error',
                button: 'متوجه شدم'
            });
            return false;
        }

        // بررسی ظرفیت میزها
        const totalCapacity = calculateTotalCapacity();
        if (totalCapacity < contextData.reservationData.guests) {
            swal({
                title: 'خطای ظرفیت',
                text: `تعداد ${contextData.reservationData.guests} نفر بیشتر از ظرفیت ${totalCapacity} نفر است!`,
                icon: 'error',
                button: 'متوجه شدم'
            });
            return false;
        }

        // بررسی تعداد غذاها
        const hasZeroQuantity = contextData.reservationData.cart?.some(item =>
            (item.category === 'food' && item.quantity === 0) ||
            (item.category === 'table' && item.count === 0)
        );

        if (hasZeroQuantity) {
            swal({
                title: 'خطا',
                text: 'تعداد برخی از آیتم ها صفر است!',
                icon: 'error',
                button: 'متوجه شدم'
            });
            return false;
        }

        return true;
    };

    const formatPrice = (price) => new Intl.NumberFormat('fa-IR').format(price);

    const handleRemoveItem = (itemId) => {
        contextData.setReservationData(prev => ({
            ...prev,
            cart: prev.cart.filter(item => item.id !== itemId)
        }));
    };

    const handleTableCountChange = (type, action) => {
        contextData.setReservationData(prev => {
            const newCart = prev.cart.map(item => {
                if (item.category === 'table' && item.type === type) {
                    let newCount = item.count;
                    if (action === 'increment') newCount++;
                    else if (action === 'decrement' && item.count > 1) newCount--;
                    return { ...item, count: newCount };
                }
                return item;
            });
            return { ...prev, cart: newCart };
        });
    };

    const handleFoodCountChange = (id, action) => {
        contextData.setReservationData(prev => {
            const newCart = prev.cart.map(item => {
                if (item.category === 'food' && item.id === id) {
                    let newQuantity = item.quantity;
                    if (action === 'increment') newQuantity++;
                    else if (action === 'decrement' && item.quantity > 1) newQuantity--;
                    return { ...item, quantity: newQuantity };
                }
                return item;
            });
            return { ...prev, cart: newCart };
        });
    };

    const calculateTotal = () => {
        return contextData.reservationData.cart?.reduce((total, item) => {
            if (item.category === 'table') {
                return total + (item.price * item.count);
            }
            if (item.category === 'food') {
                return total + (item.price * item.quantity);
            }
            return total;
        }, 0);
    };

    return (
        <div className='reservation-cart py-[100px]'>
            <div className='container px-10'>
                <StepIndicator currentStep={2} />
                {contextData.reservationData.cart?.length === 0 ? (
                    <div className='flex flex-col items-center gap-5 w-1/2 py-5 bg-[#151B20] my-0 mx-auto rounded-[5px]'>
                        <div className='relative right-[13px]'>
                            <FiShoppingCart className='size-48 text-[150px]' />
                            <FaTimes className='absolute top-[55px] right-[42px] size-16 text-[50px]' />
                        </div>
                        <h2 className='text-3xl tracking-tighter'>سبد رزرو شما خالی است!</h2>
                        <Link to="/Plate/Bookatable" className='relative mt-20 z-10 leading-none font-bold overflow-hidden text-orange-250 rounded-[50px] py-[15px] px-8 border border-[#38393D] whitespace-nowrap transition-colors hover:text-white before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-0 before:h-[110%] before:-z-10 before:rounded-[5px] before:skew-x-[-15deg] before:overflow-hidden before:transition-all before:duration-200 before:ease-linear before:hover:bg-orange-250 before:hover:w-[110%]'>
                            بازگشت به رزرو میز
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="guest-selector bg-[#1a1e24] p-6 rounded-lg mb-6">
                            <div className="flex items-end justify-between">
                                <h3 className="text-white text-lg">تعداد نفرات:</h3>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleGuestChange('decrement')}
                                        className='p-2 rounded bg-orange-250 text-white hover:bg-orange-300'
                                    >
                                        <FaMinus />
                                    </button>
                                    <span className="text-white px-4">{contextData.reservationData.guests}</span>
                                    <button
                                        onClick={() => handleGuestChange('increment')}
                                        className='p-2 rounded bg-orange-250 text-white hover:bg-orange-300'
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                            {capacityError && (
                                <p className="text-red-500 mt-2 text-sm">{capacityError}</p>
                            )}
                        </div>

                        <div className="cart-items space-y-6">
                            {/* بخش میزها */}
                            <div className="tables-section bg-[#1a1e24] p-6 rounded-lg">
                                <h3 className="text-xl text-white font-bold mb-4">میزهای انتخابی</h3>
                                {contextData.reservationData.cart?.filter(item => item.category === 'table')
                                    .map(table => (
                                        <div key={table.id} className="item-card bg-[#2a2e35] p-4 rounded-lg mb-4">
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <h4 className="text-white font-medium">
                                                        میز {table.name} - {formatPrice(table.price)} تومان
                                                    </h4>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleTableCountChange(table.type, 'decrement')}
                                                            disabled={table.count <= 1}
                                                            className={`p-2 rounded bg-orange-250 text-white hover:bg-orange-300 ${table.count <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        >
                                                            <FaMinus className="w-4 h-4" />
                                                        </button>
                                                        <span className="px-3 text-white">{table.count}</span>
                                                        <button
                                                            onClick={() => handleTableCountChange(table.type, 'increment')}
                                                            className="p-2 rounded bg-orange-250 text-white hover:bg-orange-300"
                                                        >
                                                            <FaPlus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveItem(table.id)}
                                                        className="text-red-500 hover:text-red-400"
                                                    >
                                                        <FaRegTrashAlt />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {/* بخش محصولات */}
                            <div className="products-section bg-[#1a1e24] p-6 rounded-lg">
                                <h3 className="text-xl text-white font-bold mb-4">محصولات انتخابی</h3>
                                {contextData.reservationData.cart?.filter(item => item.category === 'food')
                                    .map(product => (
                                        <div key={product.id} className="item-card bg-[#2a2e35] p-4 rounded-lg mb-4">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-4">
                                                    <img
                                                        src={product.imgUrl}
                                                        alt={product.title}
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                    <div>
                                                        <h4 className="text-white font-medium">{product.title}</h4>
                                                        <p className="text-orange-250">{formatPrice(product.price)} تومان</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => handleFoodCountChange(product.id, 'decrement')}
                                                            disabled={product.quantity <= 1}
                                                            className={`p-2 rounded bg-orange-250 text-white hover:bg-orange-300 ${product.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                        >
                                                            <FaMinus className="w-4 h-4" />
                                                        </button>
                                                        <span className="px-3 text-white">{product.quantity}</span>
                                                        <button
                                                            onClick={() => handleFoodCountChange(product.id, 'increment')}
                                                            className="p-2 rounded bg-orange-250 text-white hover:bg-orange-300"
                                                        >
                                                            <FaPlus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveItem(product.id)}
                                                        className="text-red-500 hover:text-red-400"
                                                    >
                                                        <FaRegTrashAlt />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            {/* جمع کل */}
                            <div className="total-section bg-[#1a1e24] p-6 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl text-white font-bold">جمع کل سفارش:</h3>
                                    <span className="text-2xl text-orange-250 font-bold">
                                        {formatPrice(calculateTotal())} تومان
                                    </span>
                                </div>

                                <div className="mt-6 flex gap-4 justify-center">
                                    <button
                                        onClick={handleApplyChanges}
                                        className="px-6 py-3 bg-orange-250 text-white flex items-center justify-center rounded-lg hover:bg-orange-300 transition-colors"
                                    >
                                        ادامه به پرداخت
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

