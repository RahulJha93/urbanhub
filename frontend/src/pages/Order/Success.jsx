import React from 'react'
import { useState,useEffect } from 'react'
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti'

const Success = () => {
  const { width, height } = useWindowSize()

    const [countdown, setCountdown] = useState(10)
    useEffect(() => {
      const timer = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1)
      }, 1000)
      if (countdown === 0) {
        clearInterval(timer)
        window.location.href = "/me/order"
      }
      return () => clearInterval(timer)
    }, [countdown])
  return (
    <>
    <Confetti
    width={width}
    height={height}
  />
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-950 rounded-lg shadow-md p-8 text-center">
          <FaCheckCircle  className="text-green-500 h-16 w-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Order Successful!</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Your order will be processed shortly. Redirecting to the order page in {countdown} seconds...
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/me/order"
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              prefetch={false}
            >
              Return to Order Page
            </Link>
          </div>
        </div>
      </main>
      
    </div>
    </>
  )
}

function MountainIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  }

export default Success;