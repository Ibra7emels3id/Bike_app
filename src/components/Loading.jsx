import React from 'react';

const Loading = () => {
    return (
        <>
            <div className="Loading flex bg-white w-full left-0 top-0 z-50 fixed items-center justify-center h-screen">
                <div class="flex flex-row gap-3">
                    <div class="w-6 h-6 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                    <div class="w-6 h-6 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
                    <div class="w-6 h-6 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
                </div>
            </div>
        </>
    );
}

export default Loading;
