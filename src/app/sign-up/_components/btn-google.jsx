'use client'
import { signIn } from 'next-auth/react';
import React from 'react';
import GoogleButton from 'react-google-button';

const BtnGoogle = () => {
    return (
        <>
            <GoogleButton
                onClick={() => signIn('google') }
            />
        </>
    );
}

export default BtnGoogle;
