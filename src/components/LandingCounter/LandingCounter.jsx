import React, { useEffect, useState } from "react";

export default function LandingCounter({ count }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (counter >= count) return; // توقف وقتی به مقدار هدف رسید

    const increment = Math.ceil(count / 100); // افزایش پویا بر اساس مقدار نهایی
    const interval = setInterval(() => {
      setCounter(prev => {
        const next = prev + increment;
        return next >= count ? count : next; // جلوگیری از عبور از مقدار نهایی
      });
    }, 30);

    return () => clearInterval(interval);
  }, [count]); // وابستگی به prop ورودی

  return <span>{counter}</span>;
}