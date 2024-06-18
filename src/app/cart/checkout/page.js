'use client'
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './_components/CheckoutForm';
import Header from '../../../components/Header';
// import { useSearchParams } from 'next/navigation';
// Number(searchparams.get('amount'))
import { useSearchParams } from 'next/router';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Page = () => {
    // const searchparams = useSearchParams()
    const options = {
        mode: 'payment',
        currency: 'usd',
        amount: 1000
    };

    return (
        <>  
            <Header/>
            <Elements stripe={stripePromise} options={options}>
                <CheckoutForm />
            </Elements>
        </>
    );
}

export default Page;
