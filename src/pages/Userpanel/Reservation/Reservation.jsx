import React, { useContext, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import DatePicker from 'react-multi-date-picker'
import persian from 'react-date-object/calendars/persian'
import persian_fa from 'react-date-object/locales/persian_fa'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import { createReservation, getReservationsByUser } from '@/Utils/Fetchs'
import containerContext from '@/Context/containerContext'
import { useGetData } from '@/hooks/UseGetData'
import swal from 'sweetalert'
import { useToast } from '@/hooks/use-toast'

export default function UserReservations() {
  const contextData = useContext(containerContext);
  const queryClient = useQueryClient()
  const [date, setDate] = useState(new Date())
  const [guests, setGuests] = useState(1)
  const { toast } = useToast();

  const reservationMutation = useMutation({
    mutationFn: (reservationData) => createReservation(reservationData),
    onSuccess: () => {
      queryClient.invalidateQueries(['reservations', contextData.userInfos?.id]);
      toast({
        description: 'میز شما با موفقیت رزرو شد ',
      });
    },
    onError: (error) => {
      toast({
        description: 'خطا در رزرو میز',
        variant: 'destructive',
      });
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    // اعتبار سنجی تاریخ و زمان
    const now = new Date();
    const selectedDate = new Date(date);


    // بررسی انتخاب تاریخ/زمان گذشته
    if (selectedDate < now) {
      swal({
        title: 'تاریخ نامعتبر',
        text: 'تاریخ و زمان انتخاب شده نباید در گذشته باشد',
        icon: 'error',
        confirmButtonText: 'متوجه شدم'
      });
      return;
    }

    reservationMutation.mutate({
      userId: contextData.userInfos.id,
      name: contextData.userInfos.username,
      phone: contextData.userInfos.phone,
      guests: guests,
      date: date.toISOString(),
      status: 'pending'
    })
  }

  return (
    <div className='p-8'>
      <div className="user-reservations bg-[#151B20] p-8 rounded-lg">
        <h2 className="text-2xl text-white mb-6 font-bold">رزرو میز</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-group">
            <label className="block text-white mb-2">تاریخ و زمان</label>
            <DatePicker
              calendar={persian}
              locale={persian_fa}
              value={date}
              onChange={(dateObject) => {
                const jsDate = dateObject.toDate();

                // اعتبار سنجی لحظه ای
                if (jsDate < new Date()) {
                  swal({
                    title: 'توجه!',
                    text: 'شما در حال انتخاب تاریخ گذشته هستید',
                    icon: 'warning',
                    confirmButtonText: 'متوجه شدم'
                  });
                }
                setDate(jsDate);
              }}
              format="YYYY/MM/DD HH:mm"
              plugins={[
                <TimePicker
                  position="bottom"
                  hideSeconds
                  disabledHours={(currentHour) => {
                    const currentDate = new Date();
                    if (date.toDateString() === currentDate.toDateString()) {
                      return currentHour < currentDate.getHours();
                    }
                    return false;
                  }}
                />
              ]}
              className="rmdp-prime"
              inputClass="w-full p-3 bg-[#0E1317] text-white rounded"
              calendarPosition="bottom-right"
              minDate={new Date()} // غیر فعال کردن تاریخ های گذشته
            />
          </div>

          <div className="form-group">
            <label className="block text-white mb-2">تعداد نفرات</label>
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full p-3 bg-[#0E1317] text-white rounded outline-none"
            >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <option key={num} value={num}>{num} نفر</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-orange-250 text-white px-6 py-3 rounded hover:bg-orange-300 transition"
          >
            رزرو میز
          </button>
        </form>

        <ReservationsList />
      </div>
    </div>
  )
};

function ReservationsList() {
  const contetxData = useContext(containerContext);
  const { data: reservations, isLoading, error } = useGetData(["reservations", contetxData.userInfos?.id],
    () => getReservationsByUser(contetxData.userInfos?.id)
  );

  if (isLoading) return <div>در حال بارگیری...</div>;
  if (error) return <div>خطا در دریافت داده ها</div>;

  const storedReservations = [...reservations].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="mt-8">
      <h3 className="text-xl text-white mb-4">رزروهای من</h3>

      <div className="space-y-4">
        {reservations
          ?.slice()
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map(reservation => (
            <ReservationItem key={reservation.id} reservation={reservation} />
          ))}
      </div>
    </div>
  )
};

function ReservationItem({ reservation }) {
  const reservationData = new Date(reservation.date);

  if (isNaN(reservationData)) {
    console.error('تاریخ نامعتبر:', reservation.date);
    return null;
  }

  const isExpired = new Date(reservation.date) < new Date();

  return (
    <div className={`p-4 rounded-lg ${isExpired ? 'bg-gray-800' : 'bg-[#0E1317]'}`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-white">
            تاریخ: {new Date(reservation.date).toLocaleDateString('fa-IR')}
          </p>
          <p className="text-white">
            زمان: {reservationData.toLocaleTimeString('fa-IR',
              {
                hour: '2-digit',
                minute: '2-digit'
              }
            )}
          </p>
        </div>

        <div>
          <span className={`px-3 py-1 rounded ${isExpired ? 'bg-red-500' : 'bg-green-500'}`}>
            {isExpired ? 'منقضی شده' : 'فعال'}
          </span>
        </div>
      </div>

      <p className="text-white mt-2">تعداد نفرات: {reservation.guests}</p>
    </div>
  )
};
