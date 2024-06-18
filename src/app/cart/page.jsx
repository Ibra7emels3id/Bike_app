'use client'
import Header from "../../components/Header";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cart from "../../components/Cart";
import { useAppDispatch, useAppSelector } from "../../lib/hooks";
import { getTitle, removeFromCart } from "../../lib/features/cartSlice";
import { useUser } from "@clerk/nextjs";



const Page = () => {
    const { user } = useUser()
    const [Free, setFree] = useState(8)
    const [Discount, setDiscount] = useState(20)
    const dispatch = useAppDispatch()
    const { cart, CartTitle, cartQuantity } = useAppSelector((state) => state.cart)

    useEffect(() => {
        dispatch(getTitle())
    }, [cart])

    // Handle All Cart
    const AllCart = cart?.map((item) => (
        <Cart item={item} key={item.id} />
    ))

    return (
        <>
            <Header />
            <div className="checkout pt-14">
                {user ? <section>
                    {cart?.length === 0 ? <div className="flex flex-col gap-14 items-center justify-center h-[80vh] ">
                        <p className=" text-4xl text-green-950">Please shop Cart</p>
                        <Link href={'/shop'} className=" bg-red-900 py-5 px-16 text-white rounded-xl">shop</Link>
                    </div> :
                        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                            <div className="mx-auto max-w-3xl">
                                <header className="text-center">
                                    <h3 className="text-xl font-bold text-gray-900 sm:text-4xl">
                                        Your Cart
                                    </h3>
                                </header>
                                <div className="mt-8">
                                    <ul className="space-y-4">
                                        {AllCart}
                                    </ul>
                                    <div className="btn mt-10">
                                        <button onClick={() => {
                                            dispatch(removeFromCart())
                                        }} className=" bg-red-900 py-3 px-8 rounded-xl text-white" >Clear Items</button>
                                    </div>
                                    <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                                        <div className="w-screen max-w-lg space-y-4">
                                            <dl className="space-y-0.5 text-sm text-gray-700">
                                                <div className="flex justify-between">
                                                    <dt>Subtotal</dt>
                                                    <dd>${CartTitle}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt>free</dt>
                                                    <dd>${Free}</dd>
                                                </div>
                                                <div className="flex justify-between">
                                                    <dt>Discount</dt>
                                                    <dd>-£{Discount}</dd>
                                                </div>
                                                <div className="flex justify-between !text-base font-medium">
                                                    <dt>Total</dt>
                                                    <dd>{Math.round(CartTitle + Free - (CartTitle * Discount / 100))}</dd>
                                                </div>
                                            </dl>
                                            <div className="flex justify-end">
                                                <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="-ms-1 me-1.5 h-4 w-4"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                                                        />
                                                    </svg>
                                                    <p className="whitespace-nowrap text-xs">
                                                        2 Discounts Applied
                                                    </p>
                                                </span>
                                            </div>
                                            <div className="flex justify-end">
                                                <Link href={`/cart/checkout?amount=${Math.round(CartTitle + Free - (CartTitle * Discount / 100))}`} className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600" >
                                                    Checkout
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </section> || [] :
                    <div className="flex flex-col gap-14 items-center justify-center h-[80vh] ">
                        <p className=" text-4xl text-green-950">Please Login</p>
                        <Link href={'/sign-in'} className=" bg-red-900 py-5 px-16 text-white rounded-xl">Login</Link>
                    </div>
                }
            </div>
        </>
    );
};

export default Page;
