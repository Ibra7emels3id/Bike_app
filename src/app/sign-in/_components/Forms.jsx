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
                        <div className="col-span-6">
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
                            <input
                                type="email"
                                id="Email"
                                name="email"
                                className="mt-1 h-12 outline-none border px-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>
                        <div className="col-span-6">
                            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
                            <input
                                type="password"
                                id="Password"
                                name="password"
                                className="mt-1 h-12 outline-none border px-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>
                        <div className="col-span-6 mt-8 sm:flex flex-col sm:items-center sm:gap-4">
                            <button
                                className="inline-block w-full shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
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
