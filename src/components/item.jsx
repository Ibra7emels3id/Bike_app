'use client'

import Image from 'next/image';

// import material
import { Checkbox, Rating, Stack } from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { addToCart } from '../lib/features/cartSlice';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Item = ({ item }) => {
    const dispatch = useAppDispatch()
    const {cart } = useAppSelector((state)=> state.cart)
    
    // Handle quantity Cart items
    const quantity = cart.filter((it)=>{
        return  it.id === item.id
    })

    return (
        <>
            <div className="box w-full bg-slate-800 p-5 rounded-lg relative">
                <div className="img p-5 flex items-center justify-center h-48 pt-12">
                    <Image
                        src={item.image}
                        width={200}
                        height={200}
                        alt='img'
                    />
                </div>
                <div className="text mt-5 text-start">
                    <h3 className='text-2xl text-yellow-600 font-medium'>{item.title.slice(0, 20)}.</h3>
                    <p className='text-gray-400 text-sm mt-2 h-16'>{item.description.slice(0, 130)}...</p>
                    <div className="rating flex items-center justify-between pt-6 pb-1">
                        <Stack spacing={1}>
                            <Rating name="half-rating" defaultValue={item.rating.rate} precision={0.5} />
                        </Stack>
                        <small className='text-yellow-500'>$<span className='text-white'>{item.price}</span></small>
                    </div>
                </div>
                <div className="Like flex absolute left-5 top-5 bg-zinc-600 h-10 w-10 rounded-full items-center justify-center">
                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
                </div>
                <div className="btn flex flex-col absolute right-5 top-5 bg-zinc-600 h-10 w-10 rounded-full items-center justify-center">
                    <button onClick={() => {
                        dispatch(addToCart(item))
                    }} className='text-white rounded-lg'>
                        <ShoppingBagIcon />
                    </button>
                    <div className="count relative">
                        <span className=' absolute -bottom-9 -left-[50%] -translate-x-1/2 text-white text-sm'>{quantity[0]?.quantity}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Item;
