'use client'
import React, { useEffect, useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import ButtonsIcons from './ButtonsIcons'
import Link from 'next/link';
import { toast } from 'react-toastify';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';


const Forms = () => {
    const { data: session } = useSession()
    const [loading, setLoading] = useState(false)
    const [FormData, setFormData] = useState({
        email: '',
        password: '',
    })




    // Change Input Form
    const handleChange = (e) => {
        setFormData({ ...FormData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(FormData);
        setLoading(true)
        try {
            const res = await signIn("credentials", {
                email: FormData.email,
                password: FormData.password,
                redirect: false,
            });
            if (res.error) {
                console.log('Error during signIn:', res.error);
                toast.error('Please check your email or password')
            } else {
                console.log('SignIn successful:', res);
                toast.success("Login success")
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Something went wrong!')
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            {session?.user ? <Link href={'/Account'} >Account</Link> :
                <>
                    <div className="icons grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                        <ButtonsIcons />
                    </div>
                    <form className="mt-8 grid grid-cols-6 gap-6">
                        <div className="col-span-6">
                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>
                            <input
                                onChange={handleChange}
                                type="email"
                                id="Email"
                                name="email"
                                className="mt-1 h-12 outline-none border px-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>
                        <div className="col-span-6">
                            <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>
                            <input
                                onChange={handleChange}
                                type="password"
                                id="Password"
                                name="password"
                                className="mt-1 h-12 outline-none border px-2 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                            />
                        </div>
                        <div className="col-span-6 mt-8 sm:flex flex-col sm:items-center sm:gap-4">
                            {loading ? <Box className=' bg-slate-100 h-12 rounded-md w-full flex items-center justify-center' sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box> : <button
                                onClick={handleSubmit}
                                type="submit"
                                className="inline-block w-full shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                            >
                                Login
                            </button>}
                            <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                                Regester your account?
                                <Link href="/sign-up" className="text-gray-700 underline"> Sign up</Link>.
                            </p>
                        </div>
                    </form>
                </>
            }
        </>
    );
}

export default Forms;
