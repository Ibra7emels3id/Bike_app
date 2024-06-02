'use client'
import React, { use, useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { AddProduct, EditeProduct } from '@/lib/features/ProductsSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import Header from '../../components/header';

const Page = ({ params }) => {
    const [Data, setData] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
        condition: false,
        rating: {
            rate: '',
            count: ''
        }
    })
    const getItemApi = async () => {
        const res = await fetch(`http://localhost:9000/posts/${params.PasteId}`)
        const ItemApi = await res.json()
        setData({
            ...Data,
            id: ItemApi.id,
            title: ItemApi.title,
            description: ItemApi.description,
            image: ItemApi.image,
            category: ItemApi.category
            , price: ItemApi.price,
            rating: {
                ...Data.rating,
                count: ItemApi.rating.count , 
                rate: ItemApi.rating.rate
            }
        })
        console.log(ItemApi);
    }

    useEffect(() => {
        getItemApi()
    }, [params.PasteId])


    const dispatch = useAppDispatch()
    const Navigate = useRouter()

    const handleadditem = (event) => {
        event.preventDefault();
        dispatch(EditeProduct(Data)).then(() => {
            Navigate.push('/admin/dashboard')
        })
    }

    // handle select items
    const handleChange = (event) => {
        setData({
            ...Data,
            condition: event.target.value
        })
    };


    return (
        <>
            <Header />
            <div className="flex  w-[90%] m-auto">
                <div className=" w-full m-auto">
                    <div className="">
                        <form onSubmit={handleadditem} action="#" className="mb-0 pb-10 p-5 mt-6 m-auto space-y-4 rounded-lg shadow-lg ">
                            <h3 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h3>
                            <div className=''>
                                <div className="relative">
                                    <input
                                        onChange={(e) => {
                                            setData({
                                                ...Data,
                                                title: e.target.value
                                            })
                                        }}
                                        value={Data.title}
                                        type="text"
                                        className="w-full rounded-lg bg-[#e8f0fe] border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter Title..."
                                    />
                                </div>
                            </div>
                            <div className='flex gap-8'>
                                <div className="relative w-full">
                                    <input
                                        onChange={(e) => {
                                            setData({
                                                ...Data,
                                                price: e.target.value
                                            })
                                        }}
                                        value={Data.price}
                                        type="number"
                                        className="w-full bg-[#e8f0fe] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter price..."
                                    />
                                </div>
                                <div className="relative w-full">
                                    <input
                                        onChange={(e) => {
                                            setData({ ...Data, rating: { ...Data.rating, count: e.target.value } })
                                        }}
                                        value={Data.rating.count}
                                        type="number"
                                        className="w-full bg-[#e8f0fe] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter Count..."
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <div className="relative">
                                    <input
                                        onChange={(e) => {
                                            setData({
                                                ...Data,
                                                category: e.target.value
                                            })
                                        }}
                                        value={Data.category}
                                        type="text"
                                        className="w-full rounded-lg bg-[#e8f0fe] border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter category..."
                                    />
                                </div>
                            </div>
                            <div className='flex gap-8'>
                                <div className="relative w-[100%]">
                                    <input
                                        onChange={(e) => {
                                            setData({
                                                ...Data,
                                                image: URL.createObjectURL(e.target.files[0])
                                            })
                                        }}
                                        type="file"
                                        className="w-full h-14 rounded-lg bg-[#e8f0fe] border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter img..."
                                    />
                                </div>
                                <div className="relative w-[100%]">
                                    <input
                                        onChange={(e) => {
                                            setData({ ...Data, rating: { ...Data.rating, rate: e.target.value } })
                                        }}
                                        value={Data.rating.rate}
                                        type="number"
                                        className="w-full h-14 rounded-lg bg-[#e8f0fe] border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter rating..."
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <div className="relative">
                                    <FormControl sx={{ width: '100%', backgroundColor: '#e8f0fe', border: 'none', outline: 'none' }} size="small">
                                        <InputLabel id="demo-select-small-label">Age</InputLabel>
                                        <Select
                                            labelId="demo-select-small-label"
                                            id="demo-select-small"
                                            value={Data.condition}
                                            label="Age"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={true}>Finish</MenuItem>
                                            <MenuItem value={false}>UnFinish</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <textarea
                                        onChange={(e) => {
                                            setData({
                                                ...Data,
                                                description: e.target.value
                                            })
                                        }}
                                        value={Data.description}
                                        type="text"
                                        className="w-full rounded-lg h-32 bg-[#e8f0fe] border-gray-200 focus:border p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter description"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">
                                submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;
