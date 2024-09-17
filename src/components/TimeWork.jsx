'use client'
import Image from 'next/image';

// Import Swiper React components
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
// import './style/styles.css';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const TeamWork = [
    {
        name: 'John Doe',
        role: 'Frontend Developer',
        image: '/team/john.jpg',
        description: 'John Doe is a passionate frontend developer who has a strong foundation in HTML, CSS, and JavaScript. He is always eager to learn and improve his skills.'
    },
    {
        name: 'Jane Smith',
        role: 'Backend Developer',
        image: '/team/jane.jpg',
        description: 'Jane Smith is a skilled backend developer with a deep understanding of Python, Django, and databases. She is dedicated to creating efficient and scalable web applications.'
    },
    {
        name: 'Michael Johnson',
        role: 'Full Stack Developer',
        image: '/team/michael.jpg',
        description: 'Michael Johnson is a creative and collaborative full stack developer with a background in web development. He is always looking for new challenges and is eager to share his knowledge and expert'
    },
    {
        name: 'Michael Johnson',
        role: 'Full Stack Developer',
        image: '/team/michael.jpg',
        description: 'Michael Johnson is a creative and collaborative full stack developer with a background in web development. He is always looking for new challenges and is eager to share his knowledge and expert'
    },

]



const Page = () => {
    return (
        <>
            <div className="swiper w-[90%] md:w-[80%] my-28">
                <div className="team">
                    <h2 className="text-3xl mb-10 font-bold text-center">Meet Our Team</h2>
                </div>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    navigation={true}
                    breakpoints={{
                        140: {
                            slidesPerView: 1,
                            spaceBetween: 30,
                        },
                        600: {
                            slidesPerView: 1,
                            spaceBetween: 100,
                        },
                        868: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        1124: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        },
                    }}
                    modules={[Pagination, Navigation]}
                    className="Swipertime"
                >
                    {TeamWork?.map((product, index) => (
                        <SwiperSlide key={index} className=''>
                            <div className="flex items-stretch gap-4">
                                <div className="image">
                                    <Image
                                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt=""
                                        height={50}
                                        width={200}
                                        className="aspect-square w-20 rounded-lg object-cover"
                                    />
                                </div>
                                <div className='text-start'>
                                    <h3 className="text-xl/tight font-bold  text-gray-900">Title goes here</h3>
                                    <p className="mt-0.5 text-sm text-gray-700">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates voluptas distinctio
                                        nesciunt quas non animi.
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}

export default Page;
