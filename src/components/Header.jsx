'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CartCount from './CartCount';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { ShowAlert, getTitle } from '../lib/features/cartSlice';
import AlertDAtaUser from './AlertDAtaUser.jsx'
import { signOut, useSession } from 'next-auth/react';
import Avatar from './Avatars'
import LogoutIcon from '@mui/icons-material/Logout';
import { Button, IconButton } from '@mui/material';



const Header = () => {
    const { data: session, state } = useSession()
    const [header , setheader] = useState()
    const user = session?.user
    const dispatch = useAppDispatch()
    const { ShowAlerttran } = useAppSelector((state) => state.cart)

    // window.onscroll = () =>{
    //     if(window.scrollY > 30){
    //         setheader('bg-white')
    //     }else{
    //         setheader('')
    //     }
    // }

    return (
        <>
            <header className={`${header} fixed w-full z-30`}>
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="md:flex md:items-center md:gap-12">
                            <Link href={'/'} className="block text-teal-600" >
                                <span className="sr-only">Home</span>
                                <Image
                                    src={'/imgea/hero_bike.png'}
                                    width={70}
                                    height={70}
                                    alt='logo'
                                />
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-6 text-sm">
                                    <li>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" href="#"> About </Link>
                                    </li>
                                    <li>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" href="/shop"> shop </Link>
                                    </li>
                                    <li>
                                        <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> History </a>
                                    </li>
                                    <li>
                                        <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Services </a>
                                    </li>
                                    {user &&
                                        <li>
                                            <button onClick={() => {
                                                dispatch(ShowAlert())
                                            }} className="text-gray-500 transition hover:text-gray-500/75" > Transaction </button>
                                            <span className={`${ShowAlerttran === false ? 'hidden opacity-0' : 'flex opacity-100'}`}><AlertDAtaUser /></span>
                                        </li>
                                    }
                                    <li className='LinkUser'>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" href="/cart">
                                            <span className=''><CartCount /></span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            {user ?
                                <>
                                    <Avatar />
                                    <IconButton onClick={()=> signOut() }  aria-label="delete" size="large">
                                        <LogoutIcon sx={{color:'#333'}} />
                                    </IconButton>
                                </>
                                :
                                <div className="sm:flex sm:gap-4">
                                    <Link className="rounded-md bg-red-800 px-5 py-2.5 text-sm font-medium text-white shadow" href="/sign-in" >
                                        Login
                                    </Link>
                                    <div className="hidden sm:flex">
                                        <Link className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-red-600" href="/sign-up" >
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            }

                            <div className="block md:hidden">
                                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
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
                </div>
            </header>
        </>
    );
}

export default Header;
