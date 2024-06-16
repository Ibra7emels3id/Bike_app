'use client'
import Link from "next/link"
import { useAppSelector } from "../../../../lib/hooks"

export default function Component() {
    const { cart } = useAppSelector((state) => state.cart)
    return (
        <>
            {!cart ? <div className="flex flex-col gap-14 items-center justify-center h-[80vh] ">
                <p className=" text-4xl text-green-950 text-center">No Data id <br/>Please shop Cart</p>
                <Link href={'/shop'} className=" bg-red-900 py-5 px-16 text-white rounded-xl">shop</Link>
            </div> :
                <div className="flex flex-col min-h-screen">
                    <main className="flex flex-col items-center justify-center flex-grow text-center p-4 md:p-6">
                        <CircleCheckIcon className="h-16 w-16 text-green-500" />
                        <h1 className="mt-4 text-2xl font-semibold">Payment Successful</h1>
                        <p className="mt-2 text-gray-500 dark:text-gray-400">Thank you for your purchase!</p>
                        <div className="mt-6 border rounded-lg p-4 w-full max-w-md">
                            <div className="flex justify-between text-sm">
                                <span>Amount Paid:</span>
                                <span className="font-medium">$100.00</span>
                            </div>
                            <div className="flex justify-between text-sm mt-2">
                                <span>Date & Time:</span>
                                <span className="font-medium">January 22, 2024, 10:30 AM</span>
                            </div>
                            <div className="flex justify-between text-sm mt-2">
                                <span>Reference Number:</span>
                                <span className="font-medium">1234567890</span>
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
            }
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