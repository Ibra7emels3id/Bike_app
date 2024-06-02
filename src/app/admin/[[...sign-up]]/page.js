import { SignIn } from '@clerk/nextjs';
import React from 'react';
import Header from '../components/header';

const Page = () => {
    return (
        <>
            <Header />
            <div className='flex items-center justify-center mt-10'>
                <SignIn  afterSignInUrl="/admin/dashboard" />
            </div>
        </>
    );
}

export default Page;
