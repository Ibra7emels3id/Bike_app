'use client'
import React, { useEffect } from 'react';
import Header from '../components/header';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { DeleteProduct, FetchProducts, handleCondit } from '@/lib/features/ProductsSlice';
import { Checkbox, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Image from 'next/image';
import EditIcon from '@mui/icons-material/Edit';
import Link from 'next/link';


const Page = () => {
    const [checked, setChecked] = React.useState(true);
    const dispatch = useAppDispatch()
    const { products, isLoading, error } = useAppSelector((state) => state.data)

    // handle Delete items
    const handleDelete = (id) => {
        dispatch(DeleteProduct(id))
    };

    // Handle condition
    const handleChange = async (it) => {
        try {
            const res = await fetch(`http://localhost:9000/posts/${it.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    condition: checked
                })
            })
            const data = await res.json()
            return data
        } catch (err) {
            console.error(err)
        }
    };


    React.useEffect(() => {
        dispatch(FetchProducts())
    }, [dispatch, products , checked]);

    return (
        <>
            <Header />
            <div className="overflow-x-auto w-[90%] m-auto mt-32">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border">
                    <thead className="ltr:text-left rtl:text-right bg-[#3323c0]">
                        <tr>
                            <td className="px-4 py-2 w-[150px]">
                                <label className="sr-only" htmlFor="Row1">Row 1</label>
                                <h5 className="size-5 rounded border-gray-300 text-white">condition</h5>
                            </td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-white">img</td>
                            <td className="whitespace-nowrap px-4 py-2 text-white">Title</td>
                            <td className="whitespace-nowrap px-4 py-2 text-white w-[500px]">description</td>
                            <td className="whitespace-nowrap px-4 py-2 text-white">Price</td>
                            <td className="whitespace-nowrap px-4 py-2 text-white w-[80px]">Count</td>
                            <td className="whitespace-nowrap px-4 py-2 text-white text-center w-[100px]">Edit</td>
                            <td className="whitespace-nowrap px-4 py-2 text-white text-center w-[100px]">Delete</td>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {products?.map((it) => {
                            return (
                                <>
                                    <tr key={it.id}>
                                        <td className="px-4 py-2">
                                            <Checkbox
                                                checked={it.condition}
                                                onChange={(event) => {
                                                    setChecked(event.target.checked);
                                                    handleChange(it)
                                                }}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            <Image
                                                src={it?.image}
                                                height={50}
                                                width={50}
                                                alt='img'
                                            />
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{it?.title}</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700 ">{it?.description.slice(0, 50)}...</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">$120,000</td>
                                        <td className="whitespace-nowrap px-4 py-2 ">Count</td>
                                        <td className="whitespace-nowrap px-4 py-2 text-end ">
                                            <Link href={`/admin/dashboard/${it.id}`} className=" bg-green-800 hover:bg-green-950 text-white font-bold py-2 px-4 rounded">
                                                <EditIcon />
                                            </Link>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-end ">
                                            <button onClick={() => {
                                                handleDelete(`${it?.id}`)
                                            }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                                <DeleteIcon />
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Page;
