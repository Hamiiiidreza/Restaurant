import React, { useEffect, useState } from "react";

export default function LandingCounter({ count }) {
  const [Counter, setCounter] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 30);

    if (Counter === count) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [Counter]);

  return <span>{Counter}</span>;
}