import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';


const Loader = ({ isLoading }) => {
    const spinnerRef = useRef(null);
    const leftCurtainRef = useRef(null);
    const rightCurtainRef = useRef(null);
    const wrapperRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!spinnerRef.current || !leftCurtainRef.current || !rightCurtainRef.current) return;

        if (animationRef.current) {
            animationRef.current.kill();
        }

        if (isLoading) {
            // تنظیم حالت اولیه - پرده‌ها کل صفحه را پوشانده‌اند
            gsap.set([spinnerRef.current, leftCurtainRef.current, rightCurtainRef.current], {
                opacity: 1
            });

            gsap.set([leftCurtainRef.current, rightCurtainRef.current], {
                width: '50%' // شروع از حالت پوشش کامل
            });

            const tl = gsap.timeline();

            // محو شدن اسپینر
            tl.to(spinnerRef.current, {
                opacity: 0,
                delay: 0.3,
                duration: 0.4,
                ease: "powr2.out"
            });

            // کاهش پرده‌ها از مرکز به سمت چپ و راست (محو شدن به بیرون)
            tl.to(leftCurtainRef.current, {
                width: 0,
                delay: 0.6,
                duration: 1.2,
                ease: "power3.out"
            }, 0);

            tl.to(rightCurtainRef.current, {
                width: 0,
                delay: 0.6,
                duration: 1.2,
                ease: "power3.out"
            }, 0); // شروع همزمان

            animationRef.current = tl;
        } else {
            const tl = gsap.timeline();

            tl.to([leftCurtainRef.current, rightCurtainRef.current], {
                width: '50%',
                duration: 1.6, 
                ease: "powr1.inout", 
                stagger: 0.02 // تأخیر جزئی بین دو پرده
            }, "-=0.3");

            tl.then(() => {
                gsap.set(wrapperRef.current, { display: 'none' });
            });

            animationRef.current = tl;
        }
    }, [isLoading]);

    if (!isLoading && animationRef.current?.progress() === 1) {
        return null;
    }

    return (
        <div
            ref={wrapperRef}
            className="fixed inset-0 z-[1000] overflow-hidden"
            style={{ display: isLoading ? 'block' : 'none' }}
        >
            <div
                ref={spinnerRef}
                className="absolute top-[40%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 z-[1001] 
                   w-[150px] h-[150px] border-[5px] border-transparent border-t-[#a8dadc] rounded-full 
                   animate-spin"
            >
                <div className="absolute inset-[4px] border-[5px] border-transparent border-t-[#1d3557] 
                        rounded-full animate-[spin_3s_linear_infinite]"></div>
                <div className="absolute inset-[14px] border-[5px] border-transparent border-t-[#457b9d] 
                        rounded-full animate-[spin_1.5s_linear_infinite]"></div>
            </div>

            {/* تغییر موقعیت پرده‌ها به لبه‌های صفحه */}
            <div
                ref={leftCurtainRef}
                className="fixed left-0 top-0 bg-[#12131B] h-full z-[1000] w-0"
            />

            <div
                ref={rightCurtainRef}
                className="fixed right-0 top-0 bg-[#12131B] h-full z-[1000] w-0"
            />
        </div>
    );
};

export default Loader;