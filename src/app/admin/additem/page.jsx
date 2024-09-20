'use client'
import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { AddProduct, FetchCategory, FetchProducts } from '../../../lib/features/ProductsSlice';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from 'next-auth/react';

const AddItems = () => {
    const { data: session, status } = useSession();
    const dispatch = useAppDispatch();
    const { products, category, isLoading, error } = useAppSelector((state) => state.data)
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
    });
    console.log(category);
    const router = useRouter();
    const user = session?.user;

    useEffect(() => {
        if (status === 'loading') return;

        if (user?.role !== 'admin') {
            router.push('/');
        }
        dispatch(FetchProducts())
        dispatch(FetchCategory())
    }, [user?.role, status, router]);

    const handleAddItem = (event) => {
        event.preventDefault();
        dispatch(AddProduct(Data)).then(() => {
            router.push('/admin/dashboard');
        });
        toast.success("Success Notification !", {
            position: "top-center"
        });
    };

    const handleChange = (event) => {
        setData({
            ...Data,
            condition: event.target.value
        });
    };

    if (status === 'loading') return <p>Loading...</p>;


    return (
        <>
            <Header />
            <ToastContainer />
            <div className="flex w-[90%] m-auto">
                <div className="w-full m-auto">
                    <form onSubmit={handleAddItem} className="mb-0 pb-10 p-5 mt-6 m-auto space-y-4 rounded-lg shadow-lg">
                        <h3 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h3>
                        <div>
                            <div className="relative">
                                <input
                                    onChange={(e) => {
                                        setData({ ...Data, title: e.target.value });
                                    }}
                                    value={Data.title}
                                    type="text"
                                    className="w-full rounded-lg bg-[#e8f0fe] border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Title..."
                                />
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <div className="relative w-full">
                                <input
                                    onChange={(e) => {
                                        setData({ ...Data, price: e.target.value });
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
                                        setData({ ...Data, rating: { ...Data.rating, count: e.target.value } });
                                    }}
                                    value={Data.rating.count}
                                    type="number"
                                    className="w-full bg-[#e8f0fe] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter Count..."
                                />
                            </div>
                        </div>
                        <div>
                            <div className="relative">
                                <select onChange={(e)=>{
                                    setData({...Data , category: e.target.value});
                                }} className='w-full h-12 outline-none border' name="category" id="category">
                                    <option value="">Select Category...</option>
                                    {category?.map((item) => (
                                        <option key={item._id}>{item.categoryName}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <div className="relative w-[100%]">
                                <input
                                    onChange={(e) => {
                                        setData({ ...Data, image: URL.createObjectURL(e.target.files[0]) });
                                    }}
                                    type="file"
                                    className="w-full h-14 rounded-lg bg-[#e8f0fe] border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter img..."
                                />
                            </div>
                            <div className="relative w-[100%]">
                                <input
                                    onChange={(e) => {
                                        setData({ ...Data, rating: { ...Data.rating, rate: e.target.value } });
                                    }}
                                    value={Data.rating.rate}
                                    type="number"
                                    className="w-full h-14 rounded-lg bg-[#e8f0fe] border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                    placeholder="Enter rating..."
                                />
                            </div>
                        </div>
                        <div>
                            <FormControl sx={{ width: '100%', backgroundColor: '#e8f0fe', border: 'none', outline: 'none' }} size="small">
                                <InputLabel id="demo-select-small-label">Condition</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={Data.condition}
                                    label="Condition"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={true}>Finish</MenuItem>
                                    <MenuItem value={false}>UnFinish</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div>
                            <textarea
                                onChange={(e) => {
                                    setData({ ...Data, description: e.target.value });
                                }}
                                value={Data.description}
                                className="w-full rounded-lg h-32 bg-[#e8f0fe] border-gray-200 focus:border p-4 pe-12 text-sm shadow-sm"
                                placeholder="Enter description"
                            />
                        </div>
                        <button type="submit" className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddItems;
