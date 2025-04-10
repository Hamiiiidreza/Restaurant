import React, { useContext, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import containerContext from '@/Context/containerContext';
import { createReservation } from '@/Utils/Fetchs';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

export default function Reservation({ isAriz, bgReserv, imgUrl, bgBoxInputs, bgInput, align, imgUrl2 }) {
  const { type } = useParams();
  const { control, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      guests: 1,
      date: null,
      time: null,
    },
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const contextData = useContext(containerContext);
  const [guests, setGuests] = useState(1);

  // دریافت مقادیر تاریخ و زمان از فرم
  const selectedDate = watch("date");
  const selectedTime = watch("time");

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
    }

    // اعتبار سنجی تاریخ و زمان
    const now = new Date();
    const date = new Date(data.date);
    const time = new Date(data.time);
    const combinedDate = new Date(date);

    if (time) {
      combinedDate.setHours(time.getHours());
      combinedDate.setMinutes(time.getMinutes());
    }

    // بررسی تاریخ/زمان گذشته
    if (combinedDate < now) {
      swal({
        title: 'تاریخ نامعتبر!',
        text: 'تاریخ و زمان انتخاب شده نباید در گذشته باشد',
        icon: 'error',
        confirmButtonText: 'متوجه شدم'
      });
      return;
    }

    try {
      const reservationData = {
        userId: contextData.userInfos.id,
        name: contextData.userInfos.username,
        phone: contextData.userInfos.phone,
        guests: guests,
        date: combinedDate.toISOString(),
        status: 'pending'
      };

      await createReservation(reservationData);

      toast({
        description: 'میز شما با موفقیت رزرو شد ',
      });

      navigate('/my-account/table-Reservation');
    } catch (error) {
      toast({
        description: 'خطا در رزرو میز',
        variant: 'destructive',
      });
    }
  };

  // اعتبار سنجی زمان برای تاریخ امروز
  const validateTime = (time) => {
    if (!selectedDate) return true;

    const now = new Date();
    const selected = new Date(time);
    const isToday = selectedDate.toDateString() === now.toDateString();

    if (isToday && selected < now) {
      return 'زمان انتخاب شده نباید در گذشته باشد';
    }
    return true;
  };

  return (
    <>
      {
        isAriz ? (
          <div className={`reservation relative py-[130px] ${bgReserv} z-10`} >
            <img className='absolute left-0 bottom-[100px] -z-10' src="../Img/reservation-img.webp" alt="reservationimg" />
            <div className='container'>
              <div className='reservation-wrap flex items-center justify-between'>
                <div className='reservation-right w-[60%] -mr-5 px-3'>
                  <div className='reservation-box flex flex-col items-start justify-start relative p-[50px] mx-[18px] border-[6.5px] border-solid border-white border-opacity-5 before:absolute before:content-[""] before:bg-[url(../Img/reservation-shape.webp)] before:top-[50%] before:right-[-24px] bofore:w-[42px] before:h-[445px] before:-translate-y-1/2 before:bg-[#12131B] before:bg-no-repeat before:bg-custom-p before:bg-custom-s after:absolute after:content-[""] after:top-[50%] after:w-[42px] after:h-[445px] after:-translate-y-1/2 after:bg-[url(../Img/reservation-shape.webp)] after:bg-[#12131B] after:bg-no-repeat after:bg-custom-p after:bg-custom-s after:left-[-24px]'>
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
                            value={guests}
                            onChange={(e) => setGuests(e.target.value)}
                            className='select cursor-pointer h-[60px] w-full bg-[#202129] py-[15px] px-[21px] rounded-[5px] text-white text-base border-0 outline-none'
                          >
                            {[1, 2, 3, 4, 5, 6].map(num => (
                              <option key={num} value={num}>{num} نفر</option>
                            ))}
                          </select>
                        </div>
                        <div className='input-date-wrap flex'>
                          <div className='input-date_right w-full px-3 mb-5'>
                            <Controller
                              name="date"
                              control={control}
                              rules={{
                                required: "انتخاب تاریخ الزامی است",
                                validate: (value) => value >= new Date() || 'تاریخ نباید در گذشته باشد'
                              }}
                              render={({ field }) => (
                                <DatePicker
                                  value={field.value}
                                  onChange={(dateObject) => {
                                    const jsDate = dateObject?.toDate();
                                    if (jsDate < new Date()) {
                                      swal({
                                        title: 'توجه!',
                                        text: 'شما در حال انتخاب تاریخ گذشته هستید',
                                        icon: 'warning',
                                        confirmButtonText: 'متوجه شدم'
                                      });
                                    }
                                    field.onChange(jsDate);
                                  }}
                                  calendar={persian}
                                  locale={persian_fa}
                                  format="YYYY/MM/DD"
                                  inputClass="input-date h-[60px] w-full bg-[#202129] text-white text-center"
                                  placeholder="تاریخ را انتخاب کنید"
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
                                validate: validateTime
                              }}
                              render={({ field }) => (
                                <DatePicker
                                  value={field.value}
                                  onChange={(timeObject) => {
                                    const jsTime = timeObject?.toDate();
                                    field.onChange(jsTime);
                                  }}
                                  format="HH:mm"
                                  plugins={[<TimePicker
                                    hideSeconds
                                    disabledHours={(currentHour) => {
                                      const now = new Date();
                                      if (selectedDate?.toDateString() === now.toDateString()) {
                                        return currentHour < now.getHours();
                                      }
                                      return false;
                                    }}
                                  />
                                  ]}
                                  disableDayPicker
                                  inputClass="input-date h-[60px] w-full bg-[#202129] text-white text-center"
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
                <div className='reservation-left w-[40%] px-3'>
                  <div className='reservation-content flex flex-col items-end justify-start'>
                    <h2 className='mb-[18px] text-white text-6xl font-bold w-[468px] leading-tight'>تقویت احساسات شما</h2>
                    <h4 className='mb-[65px] text-white text-2xl font-bold w-[468px] leading-tight'>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ</h4>
                    <div className='counter-card flex items-center justify-end ml-[-30px]'>
                      <div className='counter-card_right w-1/2'>
                        <h4 className='text-[120px] text-white leading-[100px] font-bold mb-3'>
                          <span>70</span>
                          +
                        </h4>
                        <p className='text-white text-2xl font-bold leading-[26px]'>مشتریان هر روز</p>
                      </div>
                      <div className='counter-card_left w-1/2'>
                        <h4 className='text-[120px] text-white leading-[100px] font-bold mb-3'>
                          <span>110</span>
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
          <div className={`reservation relative py-[130px] ${bgReserv} bg-center bg-cover bg-no-repeat z-10 after:absolute after:content-[""] after:top-0 after:right-0 after:w-full after:h-full ${type === 'Restaurantmenu' ? 'after:bg-[#151b20f7]' : 'after:bg-[#171f2194]'} after:-z-10`}>
            <img className='absolute right-0 top-0 h-full z-10' src={imgUrl2} />
            <img className={`absolute left-0 w-auto ${type === 'Restaurantmenu' ? 'bottom-[150px]' : 'top-0 h-full'} z-10`} src={imgUrl} />
            <div className='container'>
              <div className='reservation-wrap'>
                <div className={`${align} w-[66.66%]`}>
                  <div className={`reservation-box-wrap bg-[${bgBoxInputs}] p-[30px]`}>
                    <div className={`reservation-box z-20 flex flex-col items-start justify-center relative p-[50px] border-[6.5px] border-solid border-white border-opacity-5 before:absolute before:content-[""] before:bg-[url(../Img/reservation-shape.webp)] before:top-[50%] before:right-[-24px] bofore:w-[42px] before:h-[445px] before:-translate-y-1/2 before:bg-[#151b2073] before:bg-no-repeat before:bg-custom-p before:bg-custom-s after:absolute after:content-[""] after:top-[50%] after:w-[42px] after:h-[445px] after:-translate-y-1/2 after:bg-[url(../Img/reservation-shape.webp)] after:bg-[#151b2073] after:bg-no-repeat after:bg-custom-p after:bg-custom-s after:left-[-24px]`}>
                      <h2 className='text-white text-[40px] font-semibold mb-[35px] '>رزرو کنید</h2>
                      <form className='form w-full' action="#">
                        <div className='form-wrap'>
                          <div className='input-wrap w-full px-3 ml-[54px] mb-5'>
                            <input type="text" placeholder='نام' className={`input h-[60px] w-full outline-none bg-[${bgInput}] py-[15px] px-[21px] rounded-[5px] text-white text-base border-0`} />
                          </div>
                          <div className='input-wrap w-full px-3 ml-[54px] mb-5'>
                            <input type="text" placeholder='تلفن همراه' className={`input h-[60px] w-full outline-none bg-[${bgInput}] py-[15px] px-[21px] rounded-[5px] text-white text-base border-0`} />
                          </div>
                          <div className='select-wrap w-full px-3 ml-[54px] mb-5'>
                            <select className={`select cursor-pointer h-[60px] w-full bg-[${bgInput}] py-[15px] px-[21px] rounded-[5px] text-white text-base border-0`}>
                              <option value="0">نفر</option>
                              <option value="1">۱ نفر</option>
                              <option value="2">۲ نفر</option>
                              <option value="3">۳ نفر</option>
                            </select>
                          </div>
                          <div className='input-date-wrap flex'>
                            <div className='input-date_right px-3 mb-5 w-full'>
                              <input type="text" className={`input-date h-[60px] w-full outline-none bg-[${bgInput}] py-[15px] px-[21px] text-base border-0`} />
                            </div>
                            <div className='input-date_left px-3 mb-5 w-full'>
                              <input type="text" className={`input-date h-[60px] w-full outline-none bg-[${bgInput}] py-[15px] px-[21px] text-base border-0`} />
                            </div>
                          </div>
                          <div className='reservation-btn-wrap w-1/2 col-12 px-3 ml-[54px]'>
                            <button className='reservation-btn relative rounded-[5px] w-full text-white bg-orange-250 cursor-pointer py-[15px] px-[32px] z-10 leading-none font-bold overflow-hidden border-0 transition-all ease-in-out duration-500 before:absolute before:content-[""] before:top-[-5%] before:right-[-5%] before:w-[0%] before:h-[110%] before:-z-10 before:rounded-[5px] before:-skewx-[15deg] before:overflow-hidden before:transition-all before:ease-in-out before:duration-500 before:hover:bg-[#732701] before:hover:h-[110%] before:hover:w-[110%]'>
                              میز رزرو کنید</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>

  )
}
