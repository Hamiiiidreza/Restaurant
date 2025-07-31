import React, { useContext, useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import containerContext from '@/Context/containerContext';
import { getTables, getReservationsByUser, getReservationsByDate } from '@/Utils/Fetchs';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { FaRegTrashAlt } from "react-icons/fa";
import { Loader2 } from 'lucide-react';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useGetData } from '@/hooks/UseGetData';
import Cookies from 'js-cookie';
import { DateObject } from 'react-multi-date-picker';
import LandingCounter from '../LandingCounter/LandingCounter';
import StepIndicator from '../StepIndicator/StepIndicator';

gsap.registerPlugin(ScrollTrigger);

export default function Reservation({ isAriz, bgReserv, imgUrl, bgBoxInputs, bgInput, align, imgUrl2 }) {
  const { type } = useParams();
  const contextData = useContext(containerContext);
  const { control, handleSubmit, formState: { errors }, watch, setValue } = useForm({
    defaultValues: {
      guests: contextData.reservationData.guests || 2,
      date: contextData.reservationData.dateTime?.date || null,
      time: contextData.reservationData.dateTime?.time || null,
      tables: {},
      foods: [],
    },
    mode: 'onChange' // اضافه کردن حالت اعتبار سنجی
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [selectedTables, setSelectedTables] = useState({});
  const [showTableModal, setShowTableModal] = useState(false);
  const containerRef = useRef(null);
  const reservationRightRef = useRef(null);
  const reservationLeftRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !reservationRightRef.current || !reservationLeftRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(reservationRightRef.current, {
        autoAlpha: 0,
        y: 50
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: reservationRightRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });

      // انیمیشن برای بخش چپ
      gsap.fromTo(reservationLeftRef.current, {
        autoAlpha: 0,
        y: 50
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 1.2,
        delay: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: reservationLeftRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);


  useEffect(() => {
    setValue("date", null);
    console.log('Current reservedDates:', contextData.reservationData.reservedDates);
  }, [contextData.reservationData.reservedDates, setValue]);

  useEffect(() => {
    // به‌روزرسانی فرم هنگام تغییر داده‌های رزرواسیون
    setValue("guests", contextData.reservationData.guests);
    setValue("date", contextData.reservationData.dateTime?.date || null);
    setValue("time", contextData.reservationData.dateTime?.time || null);
  }, [contextData.reservationData, setValue]);

  // مشاهده تغییرات در فرم
  const guests = watch("guests");
  const selectedDate = watch("date");
  const selectedTime = watch("time");

  // همگام سازی با کانتکست هنگام تغییر تعداد نفرات
  useEffect(() => {
    if (guests !== contextData.reservationData.guests) {
      contextData.setReservationData(prev => ({
        ...prev,
        guests: guests
      }));
    }
  }, [guests]);


  const { data: tables = [] } = useGetData(['tables'], getTables);

  useEffect(() => {
    const loadTables = async () => {
      try {
        const tablesData = await getTables();
        contextData.setAvailableTables(tablesData);
      } catch (error) {
        console.error('Error loading tables:', error);
      }
    };
    loadTables();
  }, [contextData.reservationData]);

  useEffect(() => {
    if (showFoodModal || showTableModal) {
      document.body.style.overflow = 'hidden';
      setShowBackdrop(true);
    } else {
      document.body.style.overflow = 'auto';
      setTimeout(() => setShowBackdrop(false), 300);
    }
  }, [showFoodModal, showTableModal]);

  useEffect(() => {
    const fetchData = async () => {
      await contextData.loadMenuItems();
    };
    fetchData();
  }, []);

  const validateReservation = async (dateObj, timeObj) => {
    if (!dateObj || !timeObj) {
      contextData.setReservationData.dateTime(null);
      await swal({
        title: 'خطا',
        text: 'لطفا تاریخ و زمان را انتخاب کنید',
        icon: 'error',
        button: 'متوجه شدم'
      });
      return false;
    };

    // اعتبار سنجی تاریخ و زمان

    // تبدیل تاریخ شمسی به میلادی
    const date = new DateObject(dateObj);
    const time = new DateObject(timeObj);

    // ترکیب تاریخ و زمان
    date.setHour(time.hour);
    date.setMinute(time.minute);

    // تبدیل به تاریخ میلادی
    const gregorianDate = date.convert(gregorian);
    const combinedDate = gregorianDate.toDate();

    // بررسی زمان گذشته
    const nowDate = new Date();
    if (combinedDate < nowDate) {
      swal({
        title: 'تاریخ نامعتبر!',
        text: 'تاریخ و زمان انتخاب شده نباید در گذشته باشد',
        icon: 'error',
        button: 'متوجه شدم'
      });
      return false;
    };

    // بررسی 3 ساعت قبل
    const now = new Date();
    const threeHoursEarlier = new Date(now.getTime() + 3 * 60 * 60 * 1000);
    if (combinedDate < threeHoursEarlier) {
      swal({
        title: 'خطا',
        text: 'رزرو باید حداقل 3 ساعت قبل انجام شود',
        icon: 'error',
        button: 'متوجه شدم'
      });
      return false;
    };

    // بررسی زمان کاری (9 صبح تا 12 شب)
    const hours = combinedDate.getHours();
    if (hours < 9 || hours >= 24) {
      swal({
        title: 'خارج از ساعت کاری',
        text: 'ساعت کاری رستوران از 9 صبح تا 12 شب می‌باشد.',
        icon: 'error',
        button: 'متوجه شدم'
      });
      return false;
    }
    return true;
  };

  const onSubmit = async (data) => {
    if (!contextData.isLoggedIn) {
      swal({
        title: "نیاز به احراز هویت",
        text: "برای رزرو میز باید ابتدا وارد شوید",
        icon: "warning",
        buttons: ["بعدا", "ورود"]
      }).then((confirm) => {
        if (confirm) navigate('/Store/Myaccount');
      });
      return;
    };

    // اعتبارسنجی انتخاب میزها
    const hasTables = contextData.reservationData.cart?.some(item => item.category === 'table');
    const hasFoods = contextData.reservationData?.cart?.some(i => i.category === 'food');


    // نمایش پیغام خطا برای هر کدام به صورت جداگانه
    if (!hasTables && !hasFoods) {
      await swal({
        title: 'خطا در انتخاب',
        text: 'لطفاً حداقل یک میز و یک محصول انتخاب کنید',
        icon: 'error',
        button: 'متوجه شدم'
      });
      return;
    } else if (!hasTables) {
      await swal({
        title: 'خطا در انتخاب میز',
        text: 'لطفاً حداقل یک میز انتخاب کنید',
        icon: 'error',
        button: 'متوجه شدم'
      });
      return;
    } else if (!hasFoods) {
      await swal({
        title: 'خطا در انتخاب محصول',
        text: 'لطفاً حداقل یک محصول انتخاب کنید',
        icon: 'error',
        button: 'متوجه شدم'
      });
      return;
    }

    // اعتبارسنجی تعداد نفرات (حداقل 2 نفر)
    if (data.guests < 2) {
      await swal({
        title: 'خطا در تعداد نفرات',
        text: 'تعداد نفرات باید حداقل 2 نفر باشد',
        icon: 'error',
        button: 'متوجه شدم'
      });
      return;
    }

    // اعتبارسنجی ظرفیت میزها
    const totalCapacity = contextData.reservationData.cart
      ?.filter(item => item.category === 'table')
      ?.reduce((sum, table) => sum + (table.count * table.max), 0) || 0;

    if (totalCapacity < guests) {
      const missing = guests - totalCapacity;
      await swal({
        title: 'خطای ظرفیت',
        text: `${guests} نفر انتخاب شده اما ظرفیت کل ${totalCapacity} نفر است!`,
        icon: 'error',
        button: 'متوجه شدم'
      });
      return false;
    }

    // دریافت تاریخ و زمان از data
    const persianDate = data.date ? new DateObject(data.date).convert(persian, persian_fa).format("YYYY/MM/DD") : null;
    const persianTime = data.time ? new DateObject(data.time).convert(persian, persian_fa).format("HH:mm") : null;
    if (!persianDate || !persianTime) {
      swal({
        title: 'خطا',
        text: 'لطفا تاریخ و زمان را انتخاب کنید',
        icon: 'error',
        button: 'متوجه شدم'
      });
      return false;
    }

    const isValid = await validateReservation(data.date, data.time, data.guests);
    if (!isValid) return;

    // ترکیب تاریخ و زمان
    const dateObj = new DateObject(data.date);
    const timeObj = new DateObject(data.time);

    dateObj.setHour(timeObj.hour);
    dateObj.setMinute(timeObj.minute);

    const combinedDate = dateObj.convert(gregorian).toDate();


    const reservationData = {
      userId: contextData.userInfos.id,
      name: contextData.userInfos.username,
      phone: contextData.userInfos.phone,
      guests: guests,
      dateTime: {
        isodate: combinedDate.toISOString(),
        displayDate: `${persianDate} ${persianTime}`,
      },
      tables: contextData.reservationData.cart
        .filter(item => item.category === 'table')
        .reduce((acc, t) => ({ ...acc, [t.type]: t.count }), {}),
      ...(contextData.reservationData.cart?.filter(item => item.category === "food").length > 0 && {
        products: contextData.reservationData.cart
          .filter(item => item.category === 'food')
          .map(item => ({
            id: item.id,
            name: item.title,
            quantity: item.quantity,
            price: item.price
          }))
      }),
      totalCost: contextData.calculateTotal(contextData.reservationData),
      status: 'pending'
    };

    // ذخیره در کانتکست
    contextData.setReservationData(prev => ({
      ...prev,
      dateTime: {
        date: data.date,
        time: data.time,
        displayDate: `${persianDate} ${persianTime}` // ذخیره مستقیم در کانتکست
      }
    }));

    try {
      navigate('/my-account/ReservationCart');
    } catch (error) {
      swal({ title: 'خطا', text: 'مشکل در ثبت رزرو', icon: 'error' });
    }
  };

  // کامپوننت انتخاب غذا
  const FoodSelectionModal = () => {
    // State موقت برای ذخیره تغییرات
    const [localFoods, setLocalFoods] = useState({});

    // مقداردهی اولیه با داده‌های فعلی
    useEffect(() => {
      if (showFoodModal) {
        const initialFoods = {};
        contextData.reservationData.cart
          ?.filter(item => item.category === 'food')
          .forEach(food => {
            initialFoods[food.id] = food.quantity;
          });
        setLocalFoods(initialFoods);
      }
    }, [showFoodModal]);

    const handleFoodChange = (id, action) => {
      setLocalFoods(prev => {
        const currentCount = prev[id] || 0;
        let newCount = currentCount;

        if (action === 'increment') {
          newCount = currentCount + 1;
        } else if (action === 'decrement' && currentCount > 0) {
          newCount = currentCount - 1;
        }

        return { ...prev, [id]: newCount };
      });
    };

    const handleConfirm = () => {
      // اعمال تغییرات فقط هنگام تایید
      Object.entries(localFoods).forEach(([id, quantity]) => {
        if (quantity > 0) {
          contextData.updateFoodCount(id, 'set', quantity);
        } else {
          contextData.updateFoodCount(id, 'remove');
        }
      });
      setShowFoodModal(false);
    };

    return (
      <>
        {showBackdrop && (
          <div
            className={`fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity duration-300
            ${showFoodModal ? 'opacity-100' : 'opacity-0'}`}
          ></div>
        )}

        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] scrollbar-minimal max-w-2xl bg-[#242a38] rounded-lg shadow-xl
          ${showFoodModal ? 'block' : 'hidden'}`}
        >
          <div className="p-6 animate-slideIn">
            <h3 className="text-white text-xl font-bold mb-4">انتخاب غذاها</h3>
            <div className="max-h-[70vh] min-h-[200px] overflow-y-auto hide-scrollbar p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                {contextData.menuItems.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 mb-3 bg-[#2a2e35] rounded-lg">
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={item.imgUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className='flex-1'>
                        <h4 className="text-white">{item.title}</h4>
                        <p className="text-orange-250">{item.price.toLocaleString()} تومان</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleFoodChange(item.id, 'decrement')}
                          className='size-8 rounded-full bg-orange-250 text-white flex items-center justify-center hover:bg-orange-300 transition-colors'
                        >
                          <FaMinus />
                        </button>
                        <span className="text-white">
                          {localFoods[item.id] || 0}
                        </span>
                        <button
                          onClick={() => handleFoodChange(item.id, 'increment')}
                          className='size-8 rounded-full bg-orange-250 text-white flex items-center justify-center hover:bg-orange-300 transition-colors'
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                  </div>
                )
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowFoodModal(false)}
                className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors"
              >
                لغو
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-orange-250 rounded-lg hover:bg-orange-300 transition-colors"
              >
                تایید انتخاب
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  // کامپوننت انتخاب میز
  const TableSelectionModal = () => {
    // State موقت برای ذخیره تغییرات
    const [localSelectedTables, setLocalSelectedTables] = useState({});

    // مقداردهی اولیه با داده‌های فعلی
    useEffect(() => {
      if (showTableModal) {
        const initialTables = {};
        contextData.reservationData.cart
          ?.filter(item => item.category === 'table')
          .forEach(table => {
            initialTables[table.type] = table.count;
          });
        setLocalSelectedTables(initialTables);
      }
    }, [showTableModal]);

    const handleTableChange = (type, action) => {
      setLocalSelectedTables(prev => {
        const currentCount = prev[type] || 0;
        let newCount = currentCount;

        if (action === 'increment') {
          newCount = currentCount + 1;
        } else if (action === 'decrement' && currentCount > 0) {
          newCount = currentCount - 1;
        }

        return { ...prev, [type]: newCount };
      });
    };

    const handleConfirm = () => {
      // اعمال تغییرات فقط هنگام تایید
      Object.entries(localSelectedTables).forEach(([type, count]) => {
        if (count > 0) {
          contextData.updateTableCount(type, 'set', count);
        } else {
          contextData.updateTableCount(type, 'remove');
        }
      });
      setShowTableModal(false);
    };

    return (
      <>
        {showBackdrop && (
          <div
            className={`fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity duration-300
                    ${showTableModal ? 'opacity-100' : 'opacity-0'}`}
          ></div>
        )}

        <div
          className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-2xl bg-[#242a38] rounded-lg shadow-xl
                ${showTableModal ? 'block' : 'hidden'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 animate-slideIn">
            <h3 className="text-white text-xl font-bold mb-4">انتخاب میزها</h3>
            <div className="max-h-[60vh] overflow-y-auto">
              {contextData.availableTables?.map(table => {
                const count = localSelectedTables[table.type] || 0;

                return (
                  <div key={table.type}
                    className="flex items-center justify-between p-3 mb-3 bg-[#2a2e35] rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <h4 className="text-white">میز {table.name}</h4>
                        <p className="text-orange-250">{table.price.toLocaleString()} تومان</p>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleTableChange(table.type, 'decrement')}
                            disabled={count <= 0}
                            className={`w-8 h-8 rounded-full bg-orange-250 text-white flex items-center justify-center hover:bg-orange-300 transition-colors
                                    ${count <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            <FaMinus />
                          </button>
                          <span className="text-white w-8 text-center">
                            {count}
                          </span>
                          <button
                            onClick={() => handleTableChange(table.type, 'increment')}
                            className='w-8 h-8 rounded-full bg-orange-250 text-white flex items-center justify-center hover:bg-orange-300 transition-colors'
                          >
                            <FaPlus />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={() => setShowTableModal(false)}
                className="px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors"
              >
                لغو
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-orange-250 rounded-lg hover:bg-orange-300 transition-colors"
              >
                تایید انتخاب
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  // اعتبار سنجی زمان برای تاریخ امروز
  const validateTime = (time) => {
    if (!time || !selectedDate) return true;

    // تبدیل آبجکت تاریخ فارسی به Date استاندارد
    const date = selectedDate.toDate();
    const now = new Date();

    // بررسی تاریخ امروز
    const isToday = date.toDateString() === now.toDateString();

    // تبدیل آبجکت زمان فارسی به Date استاندارد
    const timeDate = time.toDate();

    if (isToday && timeDate < now) {
      return 'زمان انتخاب شده نباید در گذشته باشد';
    }
    return true;
  };

  return (
    <>
      {showTableModal && <TableSelectionModal />}
      {showFoodModal && <FoodSelectionModal />}
      {
        isAriz ? (
          <div className={`reservation relative py-[130px] bg-[${bgReserv}] z-10`} ref={containerRef}>
            <img className='absolute left-0 bottom-[100px] -z-10' src="../Img/reservation-img.webp" alt="reservationimg" />
            <div className='container'>
              <StepIndicator currentStep={1} />
              <div className='reservation-wrap flex items-center justify-between'>
                <div className='reservation-right w-[60%] -mr-5 px-3' ref={reservationRightRef}>
                  <div className='reservation-box flex flex-col items-start justify-start relative p-[50px] mx-[18px] border-[6.5px] border-solid border-white border-opacity-5 before:absolute before:content-[""] before:bg-[url(../Img/reservation-shape.webp)] before:top-[50%] before:right-[-24px] before:w-[42px] before:h-[445px] before:-translate-y-1/2 before:bg-[#12131B] before:bg-no-repeat before:bg-custom-p before:bg-custom-s after:absolute after:content-[""] after:top-[50%] after:w-[42px] after:h-[445px] after:-translate-y-1/2 after:bg-[url(../Img/reservation-shape.webp)] after:bg-[#12131B] after:bg-no-repeat after:bg-custom-p after:bg-custom-s after:left-[-24px]'>
                    <h2 className='text-white text-[40px] font-semibold mb-[35px] '>رزرو کنید</h2>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className='form w-full' action="#"
                    >
                      <div className='form-wrap'>
                        <div className='input-wrap w-full px-3 ml-[54px] mb-5'>
                          <input
                            type="text"
                            placeholder='نام'
                            value={contextData.userInfos?.username || ''}
                            readOnly
                            className='input h-[60px] w-full outline-none bg-[#202129] py-[15px] px-[21px] rounded-[5px] text-white text-base border-0'
                          />
                        </div>
                        <div className='input-wrap w-full px-3 ml-[54px] mb-5'>
                          <input
                            type="text"
                            placeholder='تلفن همراه'
                            value={contextData.userInfos?.phone || ''}
                            readOnly
                            className='input h-[60px] w-full outline-none bg-[#202129] py-[15px] px-[21px] rounded-[5px] text-white text-base border-0'
                          />
                        </div>
                        <div className='select-wrap w-full px-3 ml-[54px] mb-5'>
                          <select
                            value={contextData.reservationData?.guests}
                            onChange={(e) => setValue("guests", Number(e.target.value))}
                            className='select cursor-pointer h-[60px] w-full bg-[#202129] py-[15px] px-[21px] rounded-[5px] text-white text-base border-0 outline-none'
                          >
                            {[2, 4, 6, 8].map(num => (
                              <option key={num} value={num}>{num} نفر</option>
                            ))}
                          </select>
                        </div>
                        {step === 1 && (
                          <div className="flex gap-3 mb-4">
                            <button
                              type="button"
                              onClick={() =>
                                setShowTableModal(true)
                              }
                              className="px-4 py-2 w-1/2 rounded-lg bg-[#202129] border border-solid border-orange-250 hover:bg-orange-250 hover:text-gray-800 hover:border-none transition-colors duration-[0.s]"
                            >
                              انتخاب میز
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowFoodModal(true)}
                              className="px-4 py-2 w-1/2 rounded-lg bg-[#202129] border border-solid border-orange-250 hover:bg-orange-250 hover:text-gray-800 hover:border-none transition-colors duration-[0.s]"
                            >
                              انتخاب غذاها
                            </button>
                          </div>
                        )}
                        <div className='input-date-wrap flex'>
                          <div className='input-date_right w-full px-3 mb-5'>
                            <Controller
                              name="date"
                              control={control}
                              rules={{
                                required: "انتخاب تاریخ الزامی است",
                                validate: (value) => {
                                  if (!value) return true;
                                  const persianDate = new DateObject(value)
                                    .convert(persian, persian_fa)
                                    .format("YYYY-MM-DD");

                                  // بررسی وجود در رزروها
                                  if (contextData.reservationData.reservedDates?.includes(persianDate)) {
                                    return 'شما قبلا برای این تاریخ رزرو دارید';
                                  }

                                  const gregorianDate = new DateObject(value).convert(gregorian).toDate();
                                  return gregorianDate >= new Date() || 'تاریخ نباید در گذشته باشد';
                                }
                              }}
                              render={({ field }) => (
                                <DatePicker
                                  key={contextData.reservationData.reservedDates?.join(',')}
                                  {...field}
                                  value={field.value ? new DateObject(field.value) : null}
                                  onChange={(dateObject) => {
                                    field.onChange(dateObject?.isValid ? dateObject : null);
                                  }}
                                  calendar={persian}
                                  locale={persian_fa}
                                  format="YYYY/MM/DD"
                                  inputClass="input-date h-[60px] w-full rounded-sm bg-[#202129] text-white text-center outline-none"
                                  placeholder="تاریخ را انتخاب کنید"
                                  mapDays={({ date }) => {
                                    const persianDate = new DateObject(date)
                                      .convert(persian, persian_fa)
                                      .format("YYYY-MM-DD");

                                    if (contextData.reservationData.reservedDates?.includes(persianDate)) {
                                      return {
                                        style: {
                                          backgroundColor: '#ff000080',
                                          borderRadius: '4px'
                                        }
                                      };
                                    }
                                  }}
                                />
                              )}
                            />
                            {errors.date && <p className='text-red-500'>{errors.date.message}</p>}
                          </div>
                          <div className='input-date-left w-full px-3 mb-5'>
                            <Controller
                              name="time"
                              control={control}
                              rules={{
                                required: "انتخاب زمان الزامی است",
                                validate: (value) => {
                                  if (!value || !selectedDate) return true;

                                  // ترکیب تاریخ و زمان انتخابی
                                  const dateObj = new DateObject(selectedDate);
                                  const timeObj = new DateObject(value);
                                  dateObj.setHour(timeObj.hour);
                                  dateObj.setMinute(timeObj.minute);

                                  // تبدیل به تاریخ میلادی
                                  const combined = dateObj.convert(gregorian).toDate();

                                  // بررسی زمان گذشته
                                  if (combined < new Date()) {
                                    return 'زمان انتخاب شده نباید در گذشته باشد';
                                  }

                                  // بررسی ساعت کاری
                                  const hours = combined.getHours();
                                  if (hours < 9 || hours >= 24) {
                                    return 'ساعت کاری رستوران 9 صبح تا 12 شب می‌باشد';
                                  }

                                  return true;
                                }
                              }}
                              render={({ field }) => (
                                <DatePicker
                                  {...field}
                                  value={field.value ? new DateObject(field.value) : null}
                                  format="HH:mm"
                                  plugins={[<TimePicker hideSeconds />]}
                                  disableDayPicker
                                  inputClass="input-date h-[60px] w-full rounded-sm bg-[#202129] text-white text-center outline-none"
                                  placeholder="زمان را انتخاب کنید"
                                />
                              )}
                            />
                            {errors.time && <p className='text-red-500'>{errors.time.message}</p>}
                          </div>
                        </div>
                        <div className='reservation-btn-wrap w-1/2 col-12 px-3 ml-[54px]'>
                          <button
                            type='submit'
                            className='reservation-btn relative rounded-[5px] w-full text-white bg-orange-250 cursor-pointer py-[15px] px-[32px] z-10 leading-none font-bold overflow-hidden border-0 transition-all ease-in-out duration-500 before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[110%] before:-z-10 before:rounded-[5px] before:-skewx-[15deg] before:overflow-hidden before:transition-all before:ease-in-out before:duration-500 before:hover:bg-[#732701] before:hover:w-[110%]'>
                            میز رزرو کنید
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='reservation-left w-[40%]' ref={reservationLeftRef}>
                  <div className='reservation-content flex flex-col items-end justify-start'>
                    <h2 className='mb-[18px] text-white text-6xl font-bold w-[468px] leading-tight'>تقویت احساسات شما</h2>
                    <h4 className='mb-[65px] text-white text-2xl font-bold w-[468px] leading-tight'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</h4>
                    <div className='counter-card flex flex-wrap justify-between'>
                      <div className='counter-card_right w-1/2'>
                        <h4 className='text-[120px] text-fill-4 text-stroke-4 leading-[100px] font-bold mb-3'>
                          <LandingCounter count={70} />
                          +
                        </h4>
                        <p className='text-white text-2xl font-bold leading-[26px]'>مشتریان هر روز</p>
                      </div>
                      <div className='counter-card_left w-1/2'>
                        <h4 className='text-[120px] text-fill-4 text-stroke-4 leading-[100px] font-bold mb-3'>
                          <LandingCounter count={110} />
                          +
                        </h4>
                        <p className='text-white text-2xl font-bold leading-[26px]'>لحظات عالی</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div
           className={`reservation relative py-[130px] ${bgReserv} bg-center bg-cover bg-no-repeat z-10 after:absolute after:content-[""] after:top-0 after:right-0 after:w-full after:h-full ${type === 'Restaurantmenu' ? 'after:bg-[#151b20f7]' : 'after:bg-[#171f2194]'} after:-z-10`}
           ref={reservationRightRef}
           >
            <img className='absolute right-0 top-0 h-full z-10' src={imgUrl2} />
            <img className={`absolute left-0 w-auto ${type === 'Restaurantmenu' ? 'bottom-[150px]' : 'top-0 h-full'} z-10`}
              src={imgUrl}
            />
            <div className='container'>
              <div className='reservation-wrap'>
                <div className={`${align} w-[66.66%]`}>
                  <div className={`reservation-box-wrap bg-[${bgBoxInputs}] p-[30px]`}>
                    <div className={`reservation-box z-20 flex flex-col items-start justify-center relative p-[50px] border-[6.5px] border-solid border-white border-opacity-5 before:absolute before:content-[""] before:bg-[url(../Img/reservation-shape.webp)] before:top-[50%] before:right-[-24px] before:w-[42px] before:h-[445px] before:-translate-y-1/2 before:bg-[#151b2073] before:bg-no-repeat before:bg-custom-p
                    before:bg-custom-s after:absolute after:content-[""] after:top-[50%] after:w-[42px] after:h-[445px] after:-translate-y-1/2 after:bg-[url(../Img/reservation-shape.webp)] after:bg-[#151b2073] after:bg-no-repeat after:bg-custom-p after:bg-custom-s after:left-[-24px]`}
                    >
                      <h2 className='text-white text-[40px] font-semibold mb-[35px] '>رزرو کنید</h2>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='form w-full'
                      >
                        <div className='form-wrap'>
                          <div className='input-wrap w-full px-3 ml-[54px] mb-5'>
                            <input
                              type="text"
                              placeholder='نام'
                              value={contextData.userInfos?.username || ''}
                              readOnly
                              className={`input h-[60px] w-full outline-none bg-[${bgInput}] py-[15px] px-[21px] rounded-[5px] text-white text-base border-0`}
                            />
                          </div>
                          <div className='input-wrap w-full px-3 ml-[54px] mb-5'>
                            <input
                              type="text"
                              placeholder='تلفن همراه'
                              value={contextData.userInfos?.phone || ''}
                              readOnly
                              className={`input h-[60px] w-full outline-none bg-[${bgInput}] py-[15px] px-[21px] rounded-[5px] text-white text-base border-0`}
                            />
                          </div>
                          <div className='select-wrap w-full px-3 ml-[54px] mb-5'>
                            <select
                              value={contextData.reservationData?.guests}
                              onChange={(e) => setValue("guests", Number(e.target.value))}
                              className={`select cursor-pointer h-[60px] w-full bg-[${bgInput}] py-[15px] px-[21px] rounded-[5px] text-white text-base border-0 outline-none`}
                            >
                              {[2, 4, 6, 8].map(num => (
                                <option key={num} value={num}>{num} نفر</option>
                              ))}
                            </select>
                          </div>
                          <div className="flex gap-3 mb-4">
                            <button
                              type="button"
                              onClick={() => setShowTableModal(true)}
                              className="px-4 py-2 w-1/2 rounded-lg bg-[#202129] border border-solid border-orange-250 hover:bg-orange-250 hover:text-gray-800 hover:border-none transition-colors duration-[0.s]"
                            >
                              انتخاب میز
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowFoodModal(true)}
                              className="px-4 py-2 w-1/2 rounded-lg bg-[#202129] border border-solid border-orange-250 hover:bg-orange-250 hover:text-gray-800 hover:border-none transition-colors duration-[0.s]"
                            >
                              انتخاب غذاها
                            </button>
                          </div>
                          <div className='input-date-wrap flex'>
                            <div className='input-date_right w-full px-3 mb-5'>
                              <Controller
                                name="date"
                                control={control}
                                rules={{
                                  required: "انتخاب تاریخ الزامی است",
                                  validate: (value) => {
                                    if (!value) return true;
                                    const persianDate = new DateObject(value)
                                      .convert(persian, persian_fa)
                                      .format("YYYY-MM-DD");

                                    if (contextData.reservationData.reservedDates?.includes(persianDate)) {
                                      return 'شما قبلا برای این تاریخ رزرو دارید';
                                    }

                                    const gregorianDate = new DateObject(value).convert(gregorian).toDate();
                                    return gregorianDate >= new Date() || 'تاریخ نباید در گذشته باشد';
                                  }
                                }}
                                render={({ field }) => (
                                  <DatePicker
                                    key={contextData.reservationData.reservedDates?.join(',')}
                                    {...field}
                                    value={field.value ? new DateObject(field.value) : null}
                                    onChange={(dateObject) => {
                                      field.onChange(dateObject?.isValid ? dateObject : null);
                                    }}
                                    calendar={persian}
                                    locale={persian_fa}
                                    format="YYYY/MM/DD"
                                    inputClass={`input - date h-[60px] w-full rounded-sm bg-[${bgInput}] text-white text-center outline-none`}
                                    placeholder="تاریخ را انتخاب کنید"
                                    mapDays={({ date }) => {
                                      const persianDate = new DateObject(date)
                                        .convert(persian, persian_fa)
                                        .format("YYYY-MM-DD");

                                      if (contextData.reservationData.reservedDates?.includes(persianDate)) {
                                        return {
                                          style: {
                                            backgroundColor: '#ff000080',
                                            borderRadius: '4px'
                                          }
                                        };
                                      }
                                    }}
                                  />
                                )}
                              />
                              {errors.date && <p className='text-red-500'>{errors.date.message}</p>}
                            </div>
                            <div className='input-date-left w-full px-3 mb-5'>
                              <Controller
                                name="time"
                                control={control}
                                rules={{
                                  required: "انتخاب زمان الزامی است",
                                  validate: (value) => {
                                    if (!value || !selectedDate) return true;

                                    const dateObj = new DateObject(selectedDate);
                                    const timeObj = new DateObject(value);

                                    dateObj.setHour(timeObj.hour);
                                    dateObj.setMinute(timeObj.minute);

                                    const combined = dateObj.convert(gregorian).toDate();
                                    return combined >= new Date() || 'زمان انتخاب شده نباید در گذشته باشد';
                                  }
                                }}
                                render={({ field }) => (
                                  <DatePicker
                                    {...field}
                                    value={field.value ? new DateObject(field.value) : null}
                                    format="HH:mm"
                                    plugins={[<TimePicker hideSeconds />]}
                                    disableDayPicker
                                    inputClass={`input - date h-[60px] w-full rounded-sm bg-[${bgInput}] text-white text-center outline-none`}
                                    placeholder="زمان را انتخاب کنید"
                                  />
                                )}
                              />
                              {errors.time && <p className='text-red-500'>{errors.time.message}</p>}
                            </div>
                          </div>
                          <div className='reservation-btn-wrap w-1/2 col-12 px-3 ml-[54px]'>
                            <button
                              type='submit'
                              className='reservation-btn relative rounded-[5px] w-full text-white bg-orange-250 cursor-pointer py-[15px] px-[32px] z-10 leading-none font-bold overflow-hidden border-0 transition-all ease-in-out duration-500 before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[110%] before:-z-10 before:rounded-[5px] before:-skewx-[15deg] before:overflow-hidden before:transition-all before:ease-in-out before:duration-500 before:hover:bg-[#732701] before:hover:w-[110%]'>
                              میز رزرو کنید
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div >
                </div >
              </div >
            </div >
          </div >
        )
      }
    </>
  );
};
