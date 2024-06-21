'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { store } from "../lib/store";
import { Provider } from "react-redux";
const inter = Inter({ subsets: ["latin"] });
import "../../node_modules/react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Analytics } from '@vercel/analytics/react';
import AuthProvider from './provider/AuthProvider.js'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


export default function RootLayout({ children }) {
    const initialOptions = {
        clientId: "AU76WoxpKyDmAa4goZkbeKDExVI5BriJmzGx99ux5tjhWqwQ5Px6MJftrGnoQgt94diTJjhUlhfM5QuX",
        currency: "USD",
        intent: "capture",
    };
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider store={store} >
                    <PayPalScriptProvider options={initialOptions}>
                        <AuthProvider>
                            {children}
                        </AuthProvider>
                    </PayPalScriptProvider>
                </Provider>
            </body>
        </html>
    );
}
