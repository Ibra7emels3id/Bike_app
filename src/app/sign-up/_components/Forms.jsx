'use client'
import React, { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import ButtonsIcons from './ButtonsIcons'
import Link from 'next/link';


const Forms = () => {
    const {data: session} = useSession()
    return (
        <>
            {session?.user ? <Link href={'/Account'} >Account</Link> :
                <>
                    <div className="icons grid grid-cols-2 w-full gap-4">
                        <ButtonsIcons />
                    </div>
                    <form className="mt-8 grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="FirstName"
                                name="first_name"
                                className="mt-1 h-12 outline-none border px-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="LastName" className="block text-sm font-medium text-gray-700">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="LastName"
                                name="last_name"
                                className="mt-1 h-12 outline-none border px-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>
                        <div className="col-span-6">
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
                            <input
                                type="email"
                                id="Email"
                                name="email"
                                className="mt-1 h-12 outline-none border px-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
                            <input
                                type="password"
                                id="Password"
                                name="password"
                                className="mt-1 h-12 outline-none border px-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                            <label htmlFor="PasswordConfirmation" className="block text-sm font-medium text-gray-700">
                                Password Confirmation
                            </label>
                            <input
                                type="password"
                                id="PasswordConfirmation"
                                name="password_confirmation"
                                className="mt-1 h-12 outline-none border px-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>
                        <div className="col-span-6">
                            <label htmlFor="MarketingAccept" className="flex gap-4">
                                <input
                                    type="checkbox"
                                    id="MarketingAccept"
                                    name="marketing_accept"
                                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                                />
                                <span className="text-sm text-gray-700">
                                    I want to receive emails about events, product updates and company announcements.
                                </span>
                            </label>
                        </div>
                        <div className="col-span-6">
                            <p className="text-sm text-gray-500">
                                By creating an account, you agree to our
                                <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                                and
                                <a href="#" className="text-gray-700 underline">privacy policy</a>.
                            </p>
                        </div>
                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                            <button
                                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                            >
                                Create an account
                            </button>
                            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                Already have an account?
                                <a href="#" className="text-gray-700 underline">Log in</a>.
                            </p>
                        </div>
                    </form>
                </>
            }
        </>
    );
}

export default Forms;
