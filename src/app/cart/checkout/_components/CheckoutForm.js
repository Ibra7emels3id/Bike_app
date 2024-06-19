import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../lib/hooks';

import { removeFromCart } from '../../../../lib/features/cartSlice';
import Loader from './Loader'
import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';




const CheckoutForm = () => {
    const dispatch = useAppDispatch();
    const { cart, CartTitle, cartQuantity } = useAppSelector((state) => state.cart)
    // const searchparams = useSearchParams()

    const SendDataCartToAdmin = async () => {
        try {
            const res = await fetch('http://localhost:9000/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // username: user?.username,
                    // email: user?.emailAddresses[0].emailAddress,
                    // name: user?.fullName,
                    type: 'cart',
                    amount: Number(searchparams.get('amount')),
                    Date:{
                        Date: new Date().toLocaleDateString(),
                        Time: new Date().toLocaleTimeString(),
                    },
                    condition: false ,
                    cart,
                })
            })
            dispatch(removeFromCart())
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(`HTTP error! status: ${res.status}, message: ${JSON.stringify(errorData)}`);
            }
            const data = await res.json()

        } catch (error) {
            console.error('Error adding data to cart:', error);
        }
    }


    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();


        if (!stripe || !elements) {
            // Stripe.js hasn't yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        // Trigger form validation and wallet collection
        const { error: submitError } = await elements.submit();
        if (submitError) {
            handleError(submitError);
            return;
        }

        const handleError = (error) => {
            setLoading(false);
            setErrorMessage(error.message);
        }

        setErrorMessage(null);
        setLoading(true);

        SendDataCartToAdmin()

        const res = await fetch('/api/create-intent', {
            method: 'POST',
            body: JSON.stringify({
                // amount: Number(searchparams.get('amount'))
                amount: 1000
            })
        })
        const clientSecret = await res.json()

        // Confirm the PaymentIntent with Stripe.js
        const result = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret,
            confirmParams: {
                return_url: `https://bike-app-oic6.vercel.app/cart/checkout/sucsses`,
            },
        })
        setLoading(false);
        if (result.error) {
            // Show error to your customer (for example, payment details incomplete)
            console.log(result.error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    }


    return (
        <form onSubmit={handleSubmit}>
                <div className='flex flex-col pt-44 w-[40%] m-auto '>
                    {loading ? <div className=' fixed z-50 bg-opacity-60 backdrop-blur-sm left-0 top-0 h-full w-full flex items-center justify-center'>
                        <Loader />
                    </div> : null}
                    <PaymentElement />
                    <button className=' bg-teal-800 py-4 mt-8 text-white'>Submit</button>
                </div>
        </form>
    );
};

export default CheckoutForm;