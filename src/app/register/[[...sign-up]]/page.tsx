import { SignUp } from '@clerk/nextjs';
import React from 'react';

const Page = () => {
    return (
        <>
            {/* <Header /> */}
            <div className='flex items-center justify-center mt-10'>
                <SignUp  afterSignInUrl="/" />
            </div>
        </>
    );
}

export default Page;