import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import containerContext from '@/Context/containerContext'
import { useMutation } from '@tanstack/react-query'
import { updateUser } from '@/Utils/Fetchs'
import { Loader2 } from 'lucide-react';
import swal from 'sweetalert'

export default function Settings() {

  const contextData = useContext(containerContext);
  const formRef = useRef(null);

  const { register, handleSubmit, reset, isLoading, formState: { errors, isDirty }, } = useForm({
    defaultValues: {
      username: contextData.userInfos?.username || '',
      email: contextData.userInfos?.email || '',
      phone: contextData.userInfos?.phone || '',
      password: ''
    }
  })

  // رصد تغییرات userInfos
  useEffect(() => {
    reset({
      username: contextData.userInfos?.username || '',
      email: contextData.userInfos?.email || '',
      phone: contextData.userInfos?.phone || '',
      password: ''
    })
  }, [contextData.userInfos, reset]);

  const updateMutation = useMutation({
    mutationFn: async (formValues) => {

      // آماده سازی داده‌های آپدیت
      const updateData = {
        username: formValues.username,
        email: formValues.email,
        ...(formValues.phone && { phone: formValues.phone }),
        ...(formValues.password && { password: formValues.password }),
      };

      // حذف فیلدهای خالی
      Object.keys(updateData).forEach(key =>
        updateData[key] === undefined && delete updateData[key]
      );

      await new Promise(resolve => setTimeout(resolve, 1000));

      return updateUser(contextData.userInfos.id, updateData);
    },
    onSuccess: (data) => {
      contextData.setUserInfos(prev => ({
        ...prev,
        ...data
      }));
      swal({
        title: "موفق!",
        text: "اطلاعات با موفقیت به روزرسانی شد",
        icon: "success",
        button: "اوکی"
      })
      // بازنشانی فرم و غیر فعال کردن دکمه
      formRef.current.reset();
      reset();
    }
  })

  const onSubmit = (data) => {

    updateMutation.mutate(data)
  };

  return (
    <div className='p-8'>
      <h2 className="text-2xl font-bold mb-6">تنظیمات حساب کاربری</h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg space-y-4"
      >
        <div>
          <label className="block mb-2">نام کاربری</label>
          <input
            type="text"
            {...register('username', {
              required: 'نام کاربری الزامی است',
              minLength: {
                value: 3,
                message: "نام کاربری حداقل باید 3 کاراکتر داشته باشد"
              },
              maxLength: {
                value: 20,
                message: "نام کاربری حداکثر باید 15 کاراکتر داشته باشد"
              },
              pattern: {
                value: /^[a-zA-Z0-9_\-\u0600-\u06FF]{3,15}$/,
                message: "🔴 **نام کاربری باید شامل حروف کوچک، اعداد، خط زیر و خط تیره باشد!**"
              },
            })}
            className='w-full p-2 rounded bg-[#151B20] outline-none'
          />
          {errors.username && <p className='text-red-500 text-sm'>{errors.username.message}</p>}
        </div>
        <div>
          <label className="block mb-2">ایمیل</label>
          <input
            type="email"
            {...register('email', {
              required: 'ایمیل الزامی است',
              pattern: {
                value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
                message: "🔴لطفاً ایمیل خود را به صورت example@domain.com وارد کنید.",
              }
            })}
            className='w-full p-2 rounded bg-[#151B20] outline-none'
          />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
        </div>
        <div>
          <label className="block mb-2">شماره تلفن</label>
          <input
            type="tel"
            {...register('phone', {
              pattern: {
                value: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                message: "شماره تلفن معتبر نیست"
              }
            })}
            className='w-full p-2 rounded bg-[#151B20] outline-none text-right'
          />
          {errors.phone && <p className='text-red-500 text-sm'>{errors.phone.message}</p>}
        </div>
        <div>
          <label className="block mb-2">رمز عبور جدید(اختیاری)</label>
          <input
            type="password"
            {...register('password', {
              minLength: {
                value: 8,
                message: "پسورد حداقل باید 8 کاراکتر داشته باشد"
              },
              maxLength: {
                value: 15,
                message: "پسورد حداکثر باید 15 کاراکتر داشته باشد"
              },
              pattern: {
                value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                message: "🔴 **پسورد باید شامل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک نماد ویژه باشد!**",
              },
            })}
            className='w-full p-2 rounded bg-[#151B20] outline-none'
          />
        </div>
        <button
          type='submit'
          disabled={updateMutation.isPending || !isDirty}
          className='bg-orange-250 px-6 py-2 rounded hover:bg-orange-300 disabled:opacity-50'
        >
          {updateMutation.isPending ? (
            <span className="flex items-center gap-2">
              <Loader2 className='animate-spin h-5 w-5' />
              در حال ذخیره...
            </span>
          ) : (
            'ذخیره تغییرات'
          )}
        </button>
      </form>
    </div>
  )
}
