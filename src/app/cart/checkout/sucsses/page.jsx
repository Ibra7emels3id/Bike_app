'use client'
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "../../../../lib/hooks"
import { useEffect, useState } from "react"
import { FetchGettransaction } from "../../../../lib/features/ProductsSlice"
import { useSearchParams } from "next/navigation"

export default function Component() {
    const [AllAmount, setAllAmount] = useState()
    const [AllName, setAllName] = useState('')
    const [currentDateTime, setCurrentDateTime] = useState('')
    const { data: session } = useSession()
    const dispatch = useAppDispatch()
    const { Gettransaction, isLoading } = useAppSelector((state) => state.data)
    const user = session?.user

    // filter Cart of user 
    const FilterCart = Gettransaction?.filter((it) => {
        return it.email === session?.user?.email
    })

    useEffect(() => {
        if (FilterCart.length > 0 && FilterCart[0]?.Date?.Date === new Date().toLocaleDateString()) {
            const amounts = FilterCart.map(it => it.amount);
            if (amounts.length > 0) {
                setAllAmount(amounts[0]); 
            }
        }
    }, [FilterCart]);

    useEffect(() => {
        dispatch(FetchGettransaction())
    }, [dispatch]);

    // Update date time only on client-side
    useEffect(() => {
        setCurrentDateTime(new Date().toLocaleString());
    }, []);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <main className="flex flex-col items-center justify-center flex-grow text-center p-4 md:p-6">
                    <CircleCheckIcon className="h-16 w-16 text-green-500" />
                    <h1 className="mt-4 text-2xl font-semibold">Payment Successful</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Thank you for your purchase!</p>
                    <div className="mt-6 border rounded-lg p-4 w-full max-w-md">
                        <div className="flex justify-between text-sm">
                            <span>Amount Paid:</span>
                            <span className="font-medium">{AllAmount}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                            <span>Date & Time:</span>
                            <span className="font-medium">{currentDateTime}</span>
                        </div>
                        <div className="flex justify-between text-sm mt-2">
                            <span>Name User:</span>
                            <span className="font-medium">{user?.first_name} {user?.last_name}</span>
                        </div>
                    </div>
                    <Link
                        href="/"
                        className="mt-6 inline-flex items-center justify-center h-10 px-4 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        prefetch={false}
                    >
                        Return to Homepage
                    </Link>
                </main>
                <footer className="flex items-center justify-center h-14 border-t">
                    <p className="text-sm text-gray-500 dark:text-gray-400">&copy; 2024 Acme Inc. All rights reserved.</p>
                </footer>
            </div>
        </>
    )
}

function CircleCheckIcon(props) {
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
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
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
