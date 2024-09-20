'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const Header = () => {
    const { data: session, state } = useSession();
    const user = session?.user;

    if (user?.role) {
        return (
            <>
                <header className="bg-white">
                    <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">

                        {user?.role && <Link className="block text-teal-600" href="/admin">
                            <span className=" text-indigo-600 font-bold">DashBoard</span>
                        </Link>}

                        <div className="flex flex-1 items-center justify-end md:justify-between">
                            <nav aria-label="Global" className="hidden md:block">
                                <ul className="flex items-center gap-6 text-sm">

                                    <>
                                        {user?.role && <>
                                            <li>
                                                <Link href={'/admin/additem'} className="text-gray-500 transition hover:text-gray-500/75"> Add Product </Link>
                                            </li>
                                            <li>
                                                <Link className="text-gray-500 transition hover:text-gray-500/75" href="/admin/cart">Transaction Cart</Link>
                                            </li>
                                            <li>
                                                <Link className="text-gray-500 transition hover:text-gray-500/75" href="/admin/dashboard">Cart condition</Link>
                                            </li>
                                            <li>
                                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Careers </a>
                                            </li>
                                        </>}
                                    </>
                                </ul>
                            </nav>
                            <div className="flex items-center gap-4">
                                {/* <UserButton /> */}
                                <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                                    <span className="sr-only">Toggle menu</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            </>
        );
    }
}

export default Header;
