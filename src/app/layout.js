'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { store } from "../lib/store";
import { Provider } from "react-redux";
const inter = Inter({ subsets: ["latin"] });
import "../../node_modules/react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from 'react-toastify';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import 'react-toastify/dist/ReactToastify.css';

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <Provider store={store}>
                        {children}
                        <ToastContainer />
                    </Provider>
                </body>
            </html>
        </ClerkProvider>
    );
}
