import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import containerContext from '@/Context/containerContext'
import { useMutation } from '@tanstack/react-query'
import { updateUser } from '@/Utils/Fetchs'
import { Loader2 } from 'lucide-react';
import { HiOutlineUpload } from 'react-icons/hi'
import swal from 'sweetalert'

export default function Settings() {

  const contextData = useContext(containerContext);
  const formRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const { register, handleSubmit, reset, formState: { errors, isDirty }, } = useForm({
    defaultValues: {
      username: contextData.userInfos?.username || '',
      email: contextData.userInfos?.email || '',
      password: ''
    }
  })

  // پیش نمایش تصویر آپلود شده
  useEffect(() => {
    if (profileImage) {
      const objectUrl = URL.createObjectURL(profileImage)
      setPreviewImage(objectUrl)
      return () => URL.revokeObjectURL(objectUrl)
    }
  }, [profileImage])

  // رصد تغییرات userInfos
  useEffect(() => {
    reset({
      username: contextData.userInfos?.username || '',
      email: contextData.userInfos?.email || '',
      password: ''
    })
  }, [contextData.userInfos, reset]);

  const updateMutation = useMutation({
    mutationFn: async (formData) => {
      let avatarUrl = contextData.userInfos?.avatar;

      // آپلود عکس جدید
      const avatarFile = formData.get('avatar');

      if (avatarFile && avatarFile.name !== 'undefined') {
        const { url } = await uploadAvatar(avatarFile);
        avatarUrl = url;
      }

      // آماده سازی داده‌های آپدیت
      const updateData = {
        username: formData.get('username'),
        email: formData.get('email'),
        ...(formData.get('password') && { password: formData.get('passsword') }),
        avatar: avatarUrl
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
        ...data,
        avatar: data.avatar || prev.avatar
      }));
      swal({
        title: "موفق!",
        text: "اطلاعات با موفقیت به روزرسانی شد",
        icon: "success",
        button: "اوکی"
      })
      setProfileImage(null)
      // بازنشانی فرم و غیر فعال کردن دکمه
      formRef.current.reset();
      reset();
    }
  })

  const onSubmit = (data) => {

    const formData = new FormData();

    formData.append('username', data.username);
    formData.append('email', data.email);
    data.password && formData.append('password', data.password);
    profileImage && formData.append('avatar', profileImage);

    updateMutation.mutate(formData)
  };

  return (
    <div className='p-8'>
      <h2 className="text-2xl font-bold mb-6">تنظیمات حساب کاربری</h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg space-y-4"
      >
        <div className="mb-6">
          <label className="block mb-3">عکس پروفایل</label>
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={previewImage || contextData.userInfos?.avatar || '/default-avatar.jpg'}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                alt="پروفایل"
              />
            </div>
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    setProfileImage(e.target.files[0])
                    // فعال کردن دکمه ذخیره تغییرات
                    formRef.current.dispatchEvent(
                      new Event('input', { bubbles: true })
                    )
                  }
                }}
              />
              <div className="flex items-center gap-2 bg-orange-250 text-white px-4 py-2 rounded-lg hover:bg-orange-300 transition-colors">
                <HiOutlineUpload className="text-lg" />
                <span>آپلود عکس</span>
              </div>
            </label>
          </div>
        </div>
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
          disabled={updateMutation.isPending || (!isDirty && !profileImage)}
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
