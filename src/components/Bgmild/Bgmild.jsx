import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Bgmildcard from './Bgmildcard';

gsap.registerPlugin(ScrollTrigger);

export default function Bgmild() {

  const features = [
    { id: 1, name: 'تازه ترین ماهی', imgUrl: 'https://rtlme.ir/Etar/assets/img/icons/fish.svg' },
    { id: 2, name: 'خاویار طبیعی', imgUrl: 'https://rtlme.ir/Etar/assets/img/icons/caviar.svg' },
    { id: 3, name: 'بهترین میگو ها', imgUrl: 'https://rtlme.ir/Etar/assets/img/icons/lobstar.svg' },
    { id: 4, name: 'صدف های عالی"', imgUrl: 'https://rtlme.ir/Etar/assets/img/icons/mussels.svg' },
  ]

  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current, {
        autoAlpha: 0,
        y: 50
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className='bgmild pt-[130px] pb-[100px] bg-[#151B20] leading-[26px]' ref={containerRef}>
      <div className='container'>
        <div className='feature-card_wrap flex items-center justify-center'>
          <Bgmildcard {...features[0]} />
          <Bgmildcard {...features[1]} />
          <Bgmildcard {...features[2]} />
          <Bgmildcard {...features[3]} />
        </div>
      </div>
    </div>
  )
}
