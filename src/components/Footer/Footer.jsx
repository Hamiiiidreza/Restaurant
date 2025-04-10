import React from 'react' 
import Socials from '../Socials/Socials'

export default function Footer({ bgColor }) {
  return (
    <div className={`footer relative bg-[${bgColor}] pt-[130px] z-10`}>
      <img src="https://rtlme.ir/Etar/assets/img/shape-1.webp" alt="footershape" className='footer-shape absolute right-[25%] top-0 max-w-full h-auto' />
      <div className='footer-top border-b border-b-[#27282C] pb-[50px] mb-[65px]'>
        <div className='container'>
          <div className='row flex items-center'>
            <div className='col-xl-6 col-lg-5 col-md-4 flex items-center w-[50%] pl-3'>
              <a href="Index" className='pt-[0.3125rem] pb-[0.3125rem] text-xl whitespace-nowrap'>
                <img className='max-w-full h-auto' src="../../public/Img/Logo-white.webp" alt="logo" />
              </a>
            </div>
            <div className='col-xl-6 col-lg-7 col-md-8 px-3 grow'>
              <h2 className='text-4xl text-white font-bold mb-5'>اطلاع رسانی ما</h2>
              <form action="#" className='relative'>
                <input type="email" placeholder='ایمیل' className='!w-full h-[60px] bg-[#25262D] text-white rounded-[50px] border-none py-3.5 pr-[30px] pl-[175px]' />
                <button type='submit' className='footer-btn'>دنبال کردن</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='footer-widget-wrapper flex pb-[30px]'>
          <div className='footer-widget w-[25%] mb-[30px]'>
            <h3 className='text-2xl font-semibold text-white mb-[34px] underline'>اتصال سریع</h3>
            <ul>
              <li className='mb-[9px] '>
                <a href="" className='footer-widget_link text-[#D2D2D2] pr-3.5 font-bold'>مشاهده اکانت</a>
              </li>
              <li className='mb-[9px] '>
                <a href="" className='footer-widget_link text-[#D2D2D2] pr-3.5 font-bold'>پیگیری سفارش</a>
              </li>
              <li className='mb-[9px] '>
                <a href="" className='footer-widget_link text-[#D2D2D2] pr-3.5 font-bold'>پیشنهاد</a>
              </li>
              <li className='mb-[9px] '>
                <a href="" className='footer-widget_link text-[#D2D2D2] pr-3.5 font-bold'>تبلیغات</a>
              </li>
              <li className='mb-[9px] '>
                <a href="" className='footer-widget_link text-[#D2D2D2] pr-3.5 font-bold'>نظرات مشتریان</a>
              </li>
            </ul>
          </div>
          <div className='footer-widget w-[25%] mb-[30px]'>
            <h3 className='text-2xl font-semibold text-white mb-[34px] underline'>لینک شرکت</h3>
            <ul>
              <li className='mb-[9px] '>
                <a href="" className='footer-widget_link text-[#D2D2D2] pr-3.5 font-bold'>درباره ما</a>
              </li>
              <li className='mb-[9px] '>
                <a href="" className='footer-widget_link text-[#D2D2D2] pr-3.5 font-bold'>فروشگاه</a>
              </li>
              <li className='mb-[9px] '>
                <a href="" className='footer-widget_link text-[#D2D2D2] pr-3.5 font-bold'>مرکز کمک</a>
              </li>
              <li className='mb-[9px] '>
                <a href="" className='footer-widget_link text-[#D2D2D2] pr-3.5 font-bold'>سیاست حفظ حریم خصوصی</a>
              </li>
              <li className='mb-[9px] '>
                <a href="" className='footer-widget_link text-[#D2D2D2] pr-3.5 font-bold'>شرایط و ضوابط</a>
              </li>
            </ul>
          </div>
          <div className='footer-widget w-[25%] mb-[30px]'>
            <h3 className='text-2xl font-semibold text-white mb-[34px] underline'>ساعت کاری</h3>
            <ul>
              <li className='footer-widget_item mb-[15px] pr-[15px]'>
                <span className='block text-orange-250'>شنبه تا چهارشنبه</span>
                <span className='block'>از ۹ تا ۲۰</span>
              </li>
              <li className='footer-widget_item mb-[15px] pr-[15px]'>
                <span className='block text-orange-250'>پنجشنبه</span>
                <span className='block'>از ۹ تا ۱۸</span>
              </li>
              <li className='footer-widget_item mb-[15px] pr-[15px]'>
                <span className='block text-orange-250'>جمعه</span>
                <span className='block'>بسته</span>
              </li>
            </ul>
          </div>
          <div className='footer-widget w-[25%] mb-[30px]'>
            <h3 className='text-2xl font-semibold text-white mb-[34px] underline'>راه های ارتباطی</h3>
            <ul>
              <li className='flex items-center mb-[25px] text-white'>
                <span className='footer-widget_icon ml-[30px] block text-orange-250'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                  </svg>
                </span>
                <a href="" className='hover:text-orange-250 transition-colors'>۰۲۱۴۴۷۱۰۷۵۰</a>
              </li>
              <li className='flex items-center mb-[25px] text-white'>
                <span className='footer-widget_icon ml-[30px] block text-orange-250'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </span>
                <a href="" className='hover:text-orange-250 transition-colors'>[rtl@gmail.com]</a>
              </li>
              <li className='flex items-center mb-[25px] text-white'>
                <span className='footer-widget_icon ml-[30px] block text-orange-250'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                </span>
                <a href="" className='hover:text-orange-250 transition-colors'>www.rtl-theme.com</a>
              </li>
              <li className='flex items-center mb-[25px] text-white'>
                <span className='footer-widget_icon ml-[30px] block text-orange-250'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </span>
                <a href="" className='hover:text-orange-250 transition-colors'>تهران،منطقه 22،شهرک گلستان</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className='footer-bottom py-[19px] bg-[#0C0D12]'>
         <div className='container'>
            <div className='footer-bottom-wrap flex items-center'>
                <div className='footer-bottom_right w-1/2'>
                    <p>ساخته شده توسط
                      <a href="" className='footer-bottom_link text-orange-250 font-semibold mr-[6px]'>حمیدرضا بختیار</a>
                    </p>
                </div>
                <div className='footer-bottom_left w-1/2 !text-left'>
                   <Socials />
                </div>
            </div>
         </div>
      </div>
    </div>
  )
}
