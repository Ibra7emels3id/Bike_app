'use client'
import React, { use } from 'react';
import Forms from './_components/Forms'
import Header from '../../components/Header';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';


const Page = () => {
    const navigate = useRouter()
    const { data: session, status } = useSession()
    const user = session?.user;

    if (!user) {
        return (
            <>
                <Header />
                <section className="bg-white w-full">
                    <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                            <img
                                alt=""
                                src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                                className="absolute inset-0 h-full w-full object-cover opacity-80"
                            />
                            <div className="hidden lg:relative lg:block lg:p-12">
                                <Link className="block text-white" href="/">
                                    <span className="sr-only">Home</span>
                                    <Image
                                        src='/imgea/hero_bike.png'
                                        width={70}
                                        height={70}
                                        alt='Home'
                                    />
                                </Link>
                                <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                    Welcome to Squid 🦑
                                </h2>
                                <p className="mt-4 leading-relaxed text-white/90">
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                                    quibusdam aperiam voluptatum.
                                </p>
                            </div>
                        </section>
                        <main className="flex w-full items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                            <div className="max-w-xl lg:max-w-3xl w-full">
                                <div className="relative -mt-16 block lg:hidden">
                                    <h1 className="mt-32 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                        Welcome to Squid 🦑
                                    </h1>
                                    <p className="mt-4 leading-relaxed text-gray-500">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nam dolorum aliquam,
                                        quibusdam aperiam voluptatum.
                                    </p>
                                </div>
                                <div className="flex flex-col w-full">
                                    <Forms />
                                </div>
                            </div>
                        </main>
                    </div>
                </section>
            </>
        );
    } else {
        navigate.push('/')
    }
}

export default Page;

