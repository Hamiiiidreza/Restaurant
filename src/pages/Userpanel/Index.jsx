import React, { useContext, useState, useEffect } from 'react'
import Sidebar from '@/components/Userpanel/Sidebar/Sidebar'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { HiOutlineLogin } from "react-icons/hi";
import { GiChefToque } from "react-icons/gi";
import { Outlet, useOutlet } from 'react-router-dom';
import containerContext from '@/Context/containerContext';
import swal from 'sweetalert';
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi";
import Cartpanel from '@/components/Userpanel/Cartpanel/Cartpanel';
import Cookies from 'js-cookie';
import { updateUserTheme } from '@/Utils/Fetchs';
import PagesSkeleton from '@/components/PageSkeleton/PagesSkeleton';
import { motion, AnimatePresence } from 'framer-motion';

export default function Index() {

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showBackdrop, setShowBackdrop] = useState(false);
    const contextData = useContext(containerContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [prevPath, setPrevPath] = useState(location.pathname);
    const [isAnimating, setIsAnimating] = useState(false);

    // مدیریت تغییر مسیر و انیمیشن‌ها
    useEffect(() => {
        if (location.pathname !== prevPath) {
            setIsAnimating(true);

            // شروع انیمیشن خروج
            setTimeout(() => {
                // بعد از 300ms انیمیشن خروج، اسکلتون را نمایش می‌دهیم
                contextData.startSkeleton();

                // بعد از 2 ثانیه، انیمیشن ورود را شروع می‌کنیم
                setTimeout(() => {
                    setPrevPath(location.pathname);
                    setIsAnimating(false);
                }, 2000);
            }, 0.1);
        }
    }, [location.pathname, prevPath, contextData]);


    useEffect(() => {
        if (contextData.userInfos?.theme) {
            document.documentElement.classList.toggle('dark', contextData.userInfos.theme === 'dark');
        }
    }, [contextData.userInfos?.theme]);

    const handleThemeToggle = async () => {
        const newTheme = contextData.userInfos.theme === 'light' ? 'dark' : 'light';
        try {
            await updateUserTheme(contextData.userInfos.id, newTheme);
            contextData.setUserInfos(prev => ({ ...prev, theme: newTheme }));
            document.documentElement.classList.toggle('dark', newTheme === 'dark');
        } catch (error) {
            console.error('Error updating theme:', error);
        }
    };

    // غیر فعال کردن اسکرول صفحه هنگام باز بودن سبد خرید
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isCartOpen]);

    // مدیریت باز و بستن سبد خرید
    const toggleCart = (e) => {
        e.stopPropagation();
        if (!isCartOpen) {
            setShowBackdrop(true);
            setIsCartOpen(true);
        } else {
            handleClose();
        }
    };

    // backdrop بستن سبد خرید با کلیک روی 
    const handleClose = () => {
        setIsCartOpen(false);
        document.body.style.overflow = 'auto';
        setTimeout(() => setShowBackdrop(false), 300);
    };

    const logoutUser = (event) => {
        event.preventDefault();

        swal({
            title: 'آیا از خروج اطمینان دارید؟',
            icon: 'warning',
            buttons: ["نه", "آره"]
        }).then(result => {
            console.log(result);
            if (result) {
                swal({
                    title: 'با موفقیت خارج شدید',
                    icon: 'success',
                    buttons: 'اوکی'
                }).then(() => {
                    contextData.logout();
                    navigate("/");
                });
            }
        });
    };

    return (
        <>
            <section className='flex'>
                {/* backdrop با ترانیزیشن */}
                {
                    showBackdrop && (
                        <div
                            className={`fixed inset-0 bg-black/50 z-50 backdrop-blur-sm transition-opacity duration-300
                                 ${isCartOpen ? 'opacity-100' : 'opacity-0'
                                }`}
                            onClick={handleClose}>
                        </div>
                    )}
                <aside className="w-[21%] fixed top-[0px] bottom-0 flex flex-col shrink-0 z-30 overflow-y-auto scrollbar-minimal h-full dark:bg-[#151B20] bg-gray-200 text-gray-800 dark:text-white rounded-lg px-8 py-5 hide-scrollbar transition-colors duration-300">
                    <div className='relative text-white text-center pt-5 pb-3 px-3 h-[140px] mb-20 bg-orange-250 rounded-sm'>
                        <span className="block overflow-hidden text-ellipsis whitespace-nowrap">{contextData.userInfos?.username}</span>
                        <span className='text-sm overflow-hidden text-ellipsis whitespace-nowrap mt-2.5'>سه شنبه 9 بهمن 1403</span>
                        <div className='relative block bg-gradient-to-b from-white/40 to-white/0 to-100% shadow-md p-1 rounded-full size-24 mt-3.5 mb-11 mx-auto'>
                            <img
                                src={contextData.userInfos?.avatar || "/Img/user-1.jpg"}
                                alt="پروفایل"
                                className='rounded-full'
                            />
                            <div className='absolute left-[6px] bottom-[7px] size-6 flex items-center justify-center bg-orange-250 border-2 border-white rounded-full'>
                                <GiChefToque />
                            </div>
                        </div>
                    </div>
                    <Sidebar className='w-full' />
                    <a href=""
                        className='flex items-center justify-between dark:text-[#9ca3af] text-gray-800 dark:bg-[#2D3A3E] bg-gray-300 w-full px-3 py-4 rounded-lg transition-colors duration-300'
                        onClick={logoutUser}
                    >
                        خروج از حساب کاربری
                        <HiOutlineLogin className='size-6' />
                    </a>
                </aside>
                <section className='w-full mr-[21%] overflow-x-hidden'>
                    <header className='flex items-center justify-between dark:bg-[#151B20] bg-gray-200 p-7 mb-8 transition-colors duration-300'>
                        <div className='flex items-center'>
                            <Link to="/" className='pl-6 ml-6 border-l border-l-neutral-200 border-opacity-20 gap-x-2'>
                                <img src="../../Public/Img/logo-white.webp" alt="" />
                            </Link>
                            <div className='flex gap-1 dark:text-slate-400 text-[#151B20] transition-colors duration-300'>
                                <span className='font-bold'>{contextData.userInfos?.username}</span>
                                عزیز، به پنل کاربری رستوران ایتار خوش اومدی🎉
                            </div>
                        </div>
                        <div className='flex items-center gap-x-5 h-12'>
                            <button
                                className='flex items-center justify-center dark:bg-white/5 bg-gray-300 dark:text-white text-slate-500 p-[14px] rounded-full transition-colors duration-300'
                                onClick={handleThemeToggle}
                            >
                                {contextData.userInfos?.theme === 'dark' ? (
                                    <MdOutlineLightMode className='size-6' />
                                ) : (
                                    <MdOutlineDarkMode className='size-6' />
                                )}

                            </button>
                            <div className='relative flex items-center justify-center dark:bg-white/5 bg-gray-300 dark:text-white text-slate-500 cursor-pointer p-[14px] rounded-full z-50 transition-colors duration-300'
                                onClick={toggleCart}>
                                <HiOutlineShoppingBag className='size-6' />
                                <span className='absolute flex items-center justify-center text-sm leading-[25px] font-semibold size-[24px] right-[25px] top-[-2px] left-[-7px] text-white bg-[#d11124] rounded-[50%]'>
                                    {contextData.cartItems}
                                </span>
                                <Cartpanel
                                    isOpen={isCartOpen}
                                    onClose={handleClose}
                                />
                            </div>
                        </div>
                    </header>
                    <div className="p-8">
                        <div className="relative overflow-x-hidden p-6 bg-blue-300/10 rounded-lg">
                            <AnimatePresence mode='wait'>
                                {isAnimating ? (
                                    <>
                                        {/* انیمیشن خروج صفحه فعلی */}
                                        {prevPath && (
                                            <motion.div
                                                key={`exit-${prevPath}`}
                                                initial={{ opacity: 1, x: 0 }}
                                                animate={{ opacity: 0, x: -80 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className='absolute w-full'
                                            >
                                                <Outlet context={{ path: prevPath }} />
                                            </motion.div>
                                        )}

                                        {/* اسکلتون */}
                                        {contextData.showSkeleton && (
                                            <motion.div
                                                key="skeleton"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className='relative'
                                            >
                                                <PagesSkeleton />
                                            </motion.div>
                                        )}
                                    </>
                                ) : (

                                    <motion.div
                                        key={`enter-${location.pathname}`}
                                        initial={{ opacity: 0, x: 80 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className='relative'
                                    >
                                        <Outlet />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}
