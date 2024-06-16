import { SignIn, SignUp } from '@clerk/nextjs';
import React from 'react';
import Header from '../../../components/Header';

const Page = () => {
    return (
        <>
            <Header />
            <div className='flex items-center justify-center pt-32'>
                <SignIn  afterSignInUrl="/" />
            </div>
        </>
    );
}

export default Page;