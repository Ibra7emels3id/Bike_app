'use client'
import Link from 'next/link';
import React from 'react';
import { useAppDispatch } from '../lib/hooks';
import { ShowAlert } from '../lib/features/cartSlice';

const AlertDAtaUser = () => {
    const dispatch = useAppDispatch()
    return (
        <>
            <div
                className=" absolute right-10 top-24  w-[250px] border border-gray-600 bg-gray-100 px-4 py-8 sm:px-6 lg:px-8"
                aria-modal="true"
                role="dialog"
                tabIndex="-1"
            >
                <button onClick={() => {
                    dispatch(ShowAlert())
                }} className="absolute end-4 top-4 text-gray-600 transition hover:scale-110">
                    <span className="sr-only">Close cart</span>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <div className="Transactions flex flex-col gap-4">
                    <Link onClick={() => {
                        dispatch(ShowAlert())
                    }} className='bg-white py-2 px-3' href={'/transactions'}>Transactions</Link>
                    <Link onClick={() => {
                        dispatch(ShowAlert())
                    }} className='bg-white py-2 px-3' href={'/cart-transaction'}>cart Transaction</Link>
                </div>
            </div>
        </>
    );
}

export default AlertDAtaUser;
