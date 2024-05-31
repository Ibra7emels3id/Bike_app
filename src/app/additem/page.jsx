import React from 'react';

const additem = () => {
    return (
        <>
            <div className="flex  w-[90%] m-auto">
                <div className=" w-full m-auto">
                    <div className="">
                        <form action="#" className="mb-0 pb-10 p-5 mt-6 m-auto space-y-4 rounded-lg shadow-lg ">

                            <h3 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Get started today</h3>

                            <div className=''>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full rounded-lg bg-[#e8f0fe] border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter Title..."
                                    />
                                </div>
                            </div>
                            <div className='flex gap-8'>
                                <div className="relative w-full">
                                    <input
                                        type="number"
                                        className="w-full bg-[#e8f0fe] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter price..."
                                    />
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="number"
                                        className="w-full bg-[#e8f0fe] rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter Count..."
                                    />
                                </div>
                            </div>
                            <div className=''>
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-full rounded-lg bg-[#e8f0fe] border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter category..."
                                    />
                                </div>
                            </div>
                            <div className='flex gap-8'>
                                <div className="relative w-[100%]">
                                    <input
                                        type="file"
                                        className="w-full h-14 rounded-lg bg-[#e8f0fe] border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter img..."
                                    />
                                </div>
                                <div className="relative w-[100%]">
                                    <input
                                        type="number"
                                        className="w-full h-14 rounded-lg bg-[#e8f0fe] border-gray-200 p-4 pe-12 text-sm shadow-sm"
                                        placeholder="Enter rating..."
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="relative">
                                    <textarea
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

export default additem;
