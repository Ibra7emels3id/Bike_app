import React from 'react';

const Main = () => {
    return (
        <>
            <section className="relative bg-imgs bg-[url(https://surlybikes.com/uploads/bikes/_medium_image/Lowside_BK0534_Background-2000x1333.jpg)] "
            >
                <div
                    className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"
                ></div>

                <div
                    className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8"
                >
                    <div className="main-text z-50 max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                        <h1 className="text-3xl text-start font-extrabold text-white sm:text-5xl">
                            Let us find your

                            <strong className="block font-extrabold text-rose-500"> Forever Home. </strong>
                        </h1>

                        <p className="mt-4 text-start max-w-lg text-white sm:text-xl/relaxed">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
                            numquam ea!
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4 text-center">
                            <a
                                href="#"
                                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                            >
                                Get Started
                            </a>

                            <a
                                href="#"
                                className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Main;
