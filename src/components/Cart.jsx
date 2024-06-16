import React from 'react';


// import Ui ICons
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import Image from 'next/image';
import { CleareItem, addToCart, removeItem } from '../lib/features/cartSlice';
import { useAppDispatch } from '../lib/hooks';


const Cart = ({ item }) => {
    const dispatch = useAppDispatch();

    return (
        <>
            <li className="flex items-center gap-4">
                <Image
                    src={item.image}
                    alt={item.title}
                    className="rounded object-cover"
                    width={70}
                    height={70}
                />
                <div>
                    <h3 className="text-sm text-gray-900">
                        {item.title}
                    </h3>
                    <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                        <div>
                            <dt className="inline">Size:</dt>
                            <dd className="inline">XXS</dd>
                        </div>
                        <div>
                            <dt className="inline">Color:</dt>
                            <dd className="inline">White</dd>
                        </div>
                    </dl>
                </div>
                <div className="flex flex-1 items-center justify-end gap-2">
                    <form>
                        <label htmlFor="Line2Qty" className="sr-only">
                            {" "}
                            Quantity{" "}
                        </label>
                        <div className="count flex mr-10">
                            <span onClick={() => {
                                dispatch(removeItem(item))
                            }} className=" bg-red w-8 h-8 flex items-center justify-center cursor-pointer"><IndeterminateCheckBoxIcon sx={{ width: '100%', height: '100%' }} /></span>
                            <small className="w-12 flex items-center justify-center">{item.quantity}</small>
                            <span onClick={() => {
                                dispatch(addToCart(item))
                            }} className=" bg-red w-8 h-8 flex items-center justify-center cursor-pointer"><AddBoxIcon sx={{ width: '100%', height: '100%' }} /></span>
                        </div>
                    </form>
                    <button onClick={()=>{
                        dispatch(CleareItem(item))
                    }} className="text-gray-600 transition hover:text-red-600">
                        <span className="sr-only">Remove item</span>
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
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                        </svg>
                    </button>
                </div>
            </li>
        </>
    );
}

export default Cart;
