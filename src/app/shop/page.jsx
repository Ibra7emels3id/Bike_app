'use client'
import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Products from './_components/Product'
import Footer from '../../components/Footer';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { FetchCategory, FetchProducts } from '../../lib/features/ProductsSlice';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const Page = () => {
    const [FilterCategory, setAlignment] = useState('All');
    const { products, category, isLoading, error } = useAppSelector((state) => state.data)

    const dispatch = useAppDispatch()
    const [Price, setPrice] = useState({
        min: 0,
        max: 0,
    })

    const [AllPrice, setAllPrice] = useState()

    const handlesubmit = (event) => {
        event.preventDefault()
        setAllPrice(Price)
    }

    // handle Check box
    const handleChange = (event) => {
        setAlignment(event.target.value);
    }


    // Handel Get Data Api
    useEffect(() => {
        dispatch(FetchProducts())
        dispatch(FetchCategory())
    }, []);

    return (
        <>
            <Header />
            <section>
                <div className="m-auto w-[95%] px-4 py-32 sm:px-6 sm:py-32 lg:px-8">
                    <header>
                        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>
                        <p className="mt-4 max-w-md text-gray-500">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque praesentium cumque iure
                            dicta incidunt est ipsam, officia dolor fugit natus?
                        </p>
                    </header>
                    <div className="mt-8 sm:flex sm:items-center sm:justify-between">
                        <div className="block sm:hidden">
                            <button
                                className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
                            >
                                <span className="text-sm font-medium"> Filters & Sorting </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-4 rtl:rotate-180"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                </svg>
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:gap-4">
                            <div className="relative border p-2 w-64">
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary
                                        className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
                                    >
                                        <span className="text-sm font-medium"> Availability </span>
                                        <span className="transition group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div
                                        className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0"
                                    >
                                        <div className="w-96 rounded border border-gray-200 bg-white">
                                            <div className="space-y-1 border-t border-gray-200 px-2">
                                                <ToggleButtonGroup
                                                    className='space-y-1 flex flex-col gap-3 border-t border-gray-200 p-4'
                                                    color="primary"
                                                    value={FilterCategory}
                                                    exclusive
                                                    onChange={handleChange}
                                                    aria-label="Platform"
                                                >
                                                        <ToggleButton className='w-full' value='All'>All</ToggleButton>
                                                    {category?.map((product) => (
                                                        <ToggleButton className='w-full' value={product.categoryName}>{product.categoryName}</ToggleButton>
                                                    ))}
                                                </ToggleButtonGroup>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                            </div>
                            <div className="relative  border p-2 w-64">
                                <details className="group [&_summary::-webkit-details-marker]:hidden">
                                    <summary
                                        className="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
                                    >
                                        <span className="text-sm font-medium"> Price </span>
                                        <span className="transition group-open:-rotate-180">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="h-4 w-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div
                                        className="z-50 group-open:absolute group-open:top-auto group-open:mt-2 ltr:group-open:start-0"
                                    >
                                        <div className="w-96 rounded border border-gray-200 bg-white">
                                            <header className="flex items-center justify-between p-4">
                                                <span className="text-sm text-gray-700"> The highest price is $600 </span>
                                                <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                    Reset
                                                </button>
                                            </header>
                                            <div className="border-t border-gray-200 p-4">
                                                <div className="flex justify-between gap-4">
                                                    <form onSubmit={handlesubmit} action="">
                                                        <div className='flex justify-between gap-4 py-2'>
                                                            <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                                                                <span className="text-sm text-gray-600">$</span>
                                                                <input
                                                                    onChange={(e) => {
                                                                        setPrice({ ...Price, min: e.target.value });
                                                                    }}
                                                                    value={Price.min}
                                                                    type="number"
                                                                    id="FilterPriceFrom"
                                                                    placeholder="From"
                                                                    className="w-full h-10 border px-2 outline-0 rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                                />
                                                            </label>
                                                            <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                                                                <span className="text-sm text-gray-600">$</span>
                                                                <input
                                                                    onChange={(e) => {
                                                                        setPrice({ ...Price, max: e.target.value });
                                                                    }}
                                                                    value={Price.max}
                                                                    type="number"
                                                                    id="FilterPriceTo"
                                                                    placeholder="To"
                                                                    className="w-full h-10 border px-2 outline-0 rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                                />
                                                            </label>
                                                        </div>
                                                        <button className='bg-red-600 w-full my-2 py-2 text-white' type='submit'>Filter Price</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </details>
                            </div>
                        </div>
                        {/* <div className="hidden sm:block">
                            <label htmlFor="SortBy" className="sr-only">SortBy</label>
                            <select id="SortBy" className="h-10 rounded border-gray-300 text-sm">
                                <option>Sort By</option>
                                <option value="Title, DESC">Title, DESC</option>
                                <option value="Title, ASC">Title, ASC</option>
                                <option value="Price, DESC">Price, DESC</option>
                                <option value="Price, ASC">Price, ASC</option>
                            </select>
                        </div> */}
                    </div>
                    <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Products Price={AllPrice} category={FilterCategory} />
                    </ul>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default Page;
