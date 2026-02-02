// https://checkout.razorpay.com/v1/checkout.js
"use client";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

const useRazorpay = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && !window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
    } else if (window.Razorpay) {
      setLoaded(true);
    }
  }, []);

  return loaded;
};

export default useRazorpay;
