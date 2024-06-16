'use client'
import Header from '../../components/Header';
import Item from '../../components/item';
import { FetchProducts } from '../../lib/features/ProductsSlice';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { useUser } from '@clerk/nextjs';
import React, { useEffect } from 'react';

// import ui 
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const Page = () => {
    const dispatch = useAppDispatch()
    const { products } = useAppSelector((state) => state.data)
    const [alignment, setAlignment] = React.useState('All');
    const { user } = useUser()

    // handle Change
    const handleChange = (event) => {
        setAlignment(event.target.value);
    };

    // Handle All products 
    const AllItems = products?.map((item) => (
        <Item key={item.id} item={item} />
    ))

    // Handel Get Data Api
    useEffect(() => {
        dispatch(FetchProducts())
    }, []);

    return (
        <>
            <Header />
            <div className="flex flex-col w-[90%] m-auto pt-36 mb-36">
                <h1 className="text-4xl font-bold text-yellow-500">Filter Products</h1>
                <div className="products grid grid-cols-5 mt-10 gap-5">
                    <div className="filter col-span-1">
                        <div className="text-gray-400 mt-3">
                            <div className="filterPrice">
                                <span className="text-gray-400">Filter Price</span>
                                <div className="space-y-2 mt-3">
                                    <details className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden" >
                                        <summary className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition">
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
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="border-t border-gray-200 bg-white">
                                            <header className="flex items-center justify-between p-4">
                                                <span className="text-sm text-gray-700"> 0 Selected </span>
                                                <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                    Reset
                                                </button>
                                            </header>
                                            <ul className="space-y-1 border-t border-gray-200 p-4">
                                                <li>
                                                    <label htmlFor="FilterInStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterInStock" className="size-5 rounded border-gray-300" />
                                                        <span className="text-sm font-medium text-gray-700"> In Stock (5+) </span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label htmlFor="FilterPreOrder" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterPreOrder" className="size-5 rounded border-gray-300" />
                                                        <span className="text-sm font-medium text-gray-700"> Pre Order (3+) </span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label htmlFor="FilterOutOfStock" className="inline-flex items-center gap-2">
                                                        <input type="checkbox" id="FilterOutOfStock" className="size-5 rounded border-gray-300" />
                                                        <span className="text-sm font-medium text-gray-700"> Out of Stock (10+) </span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </details>
                                    <details
                                        className="overflow-hidden rounded border border-gray-300 [&_summary::-webkit-details-marker]:hidden"
                                    >
                                        <summary
                                            className="flex cursor-pointer items-center justify-between gap-2 bg-white p-4 text-gray-900 transition"
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
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="border-t border-gray-200 bg-white">
                                            <header className="flex items-center justify-between p-4">
                                                <span className="text-sm text-gray-700"> The highest price is $600 </span>
                                                <button type="button" className="text-sm text-gray-900 underline underline-offset-4">
                                                    Reset
                                                </button>
                                            </header>
                                            <div className="border-t border-gray-200 p-4">
                                                <div className="flex justify-between gap-4">
                                                    <label htmlFor="FilterPriceFrom" className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-600">$</span>
                                                        <input
                                                            type="number"
                                                            id="FilterPriceFrom"
                                                            placeholder="From"
                                                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                        />
                                                    </label>
                                                    <label htmlFor="FilterPriceTo" className="flex items-center gap-2">
                                                        <span className="text-sm text-gray-600">$</span>
                                                        <input
                                                            type="number"
                                                            id="FilterPriceTo"
                                                            placeholder="To"
                                                            className="w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                                                        />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </details>
                                </div>
                            </div>
                            <div className="groupByt">
                                <span className="text-gray-400 mt-5 mb-2 block">Filter Price</span>
                                <ToggleButtonGroup
                                    sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
                                    color="primary"
                                    value={alignment}
                                    exclusive
                                    onChange={()=>{
                                        handleChange(event)
                                    }}
                                    aria-label="Platform"
                                >
                                    <ToggleButton value="All">All</ToggleButton>
                                    <ToggleButton value="android">Android</ToggleButton>
                                    <ToggleButton value="ios">iOS</ToggleButton>
                                    <ToggleButton value="ios">iOS</ToggleButton>
                                    <ToggleButton value="ios">iOS</ToggleButton>
                                    <ToggleButton value="ios">iOS</ToggleButton>
                                </ToggleButtonGroup>
                            </div>
                        </div>
                    </div>
                    <div className="product col-span-4 w-[] m-auto grid grid-cols-3 gap-5 ">
                        {AllItems}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
