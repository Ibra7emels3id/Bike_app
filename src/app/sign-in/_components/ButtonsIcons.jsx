'use client'
import { signIn } from 'next-auth/react';
import React from 'react';
import GoogleButton from 'react-google-button';
import GithubButton from 'react-github-login-button'

const ButtonsIcons = () => {
    return (
        <>
            <GoogleButton style={{ width: '100%' }}
                onClick={() => signIn('google', { callbackUrl: '/' })}
            />
            <GithubButton style={{ width: '100%' }}
                onClick={() => signIn('github', { callbackUrl: '/' })}
            />
        </>
    );
}

export default ButtonsIcons;
