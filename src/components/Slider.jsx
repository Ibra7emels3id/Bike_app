'use client'
import Image from 'next/image';

// Import Swiper React components
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import './style/styles.css';


import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { addToCart } from '../lib/features/cartSlice';

// import material
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };




const Slider = () => {
    // handle Get Data fo the Redux component
    const dispatch = useAppDispatch()
    const { products, isLoading, error } = useAppSelector((state) => state.data)

    return (
        <>
            <div className="swiper w-[80%] my-16">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {products?.slice(0, 5).map((product, index) => (
                        <SwiperSlide key={index} className='flex flex-col'>
                            <div className="box w-full bg-slate-800 p-5 rounded-lg relative">
                                <div className="img p-5">
                                    <Image
                                        src={product.image}
                                        width={200}
                                        height={200}
                                        alt='img'
                                    />
                                </div>
                                <div className="text mt-5 text-start">
                                    <h3 className='text-2xl text-yellow-600 font-medium h-10'>{product.title.slice(0, 20)}.</h3>
                                    <p className='text-gray-400 text-sm mt-2 h-16'>{product.description.slice(0, 130)}...</p>
                                    <div className="rating flex items-center justify-between pt-4 pb-1">
                                        <Stack spacing={1}>
                                            <Rating name="half-rating" defaultValue={product.rating.rate} precision={0.5} />
                                        </Stack>
                                        <small className='text-yellow-500'>$<span className='text-white'>{product.price}</span></small>
                                    </div>
                                </div>
                                <div className="Like flex absolute left-5 top-5 bg-zinc-600 h-10 w-10 rounded-full items-center justify-center">
                                    <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: 'red' }} />} />
                                </div>
                                <div className="btn flex absolute right-5 top-5 bg-zinc-600 h-10 w-10 rounded-full items-center justify-center">
                                    <button onClick={() => {
                                        dispatch(addToCart(product))
                                    }} className='text-white rounded-lg'>
                                        <ShoppingBagIcon />
                                    </button>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}

export default Slider;
