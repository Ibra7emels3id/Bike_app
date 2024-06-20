'use client'
import { signIn } from 'next-auth/react';
import React from 'react';
import GoogleButton from 'react-google-button';
import GithubButton from 'react-github-login-button'

const ButtonsIcons = () => {
    return (
        <>
            <GoogleButton
                onClick={() => signIn('google', { callbackUrl: '/' })}
            />
            <GithubButton
                onClick={() => signIn('github', { callbackUrl: '/' })}
            />
        </>
    );
}

export default ButtonsIcons;
