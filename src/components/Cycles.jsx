import Image from 'next/image';
import React from 'react';

import './style/Cycles.css'
import Link from 'next/link';

const Cycles = () => {
    return (
        <>
            <div className="Cycles my-32">
                <div className="title text-center">
                    <h3 className='text-4xl font-extrabold'>Our Cycles</h3>
                    <p className=' text-zinc-500 pt-5'>It is a long established fact that a reader will be distracted by the</p>
                </div>
                <div className="grid grid-cols-2  w-[80%] m-auto mt-28">
                    <div className="img bikeImg relative flex justify-center items-center">
                        <Image
                            src={'/imgea/Cycles.png'}
                            width={400}
                            height={400}
                            alt='Cycles'
                        />
                    </div>
                    <div className="text flex flex-col justify-center ">
                        <h5 className='text-end font-bold text-4xl relative text-[#1e293b]'>Cycles</h5>
                        <p className='py-16 text-zinc-600'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters</p>
                        <div className="btn flex items-center justify-between">
                            <Link href={'/shop'} className='text-white bg-[#1e293b] hover:bg-[#f7c17b] px-5 py-3'>Shop Now</Link>
                            <small className='font-bold text-2xl'>Price <span className='text-[#f7c17b]'>$</span><span className='text-[#384c6e]'>199</span></small>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cycles;
