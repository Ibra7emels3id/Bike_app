'use client'
import React, { Suspense } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './_components/CheckoutForm';
import Header from '../../../components/Header';
import { useSearchParams } from 'next/navigation';


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Page = () => {
    const searchparams = useSearchParams()
    const options = {
        mode: 'payment',
        currency: 'usd',
        amount: Number(searchparams.get('amount'))
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

const SuspendedCheckoutPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutPage />
        </Suspense>
    );
};

export default SuspendedCheckoutPage;
