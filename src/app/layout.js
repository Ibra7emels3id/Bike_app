'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
} from '@clerk/nextjs'
import Header from "@/components/Header";
const inter = Inter({ subsets: ["latin"] });
import "../../node_modules/react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <ClerkProvider>
                <body className={inter.className}>
                    <Provider store={store}>
                        {children}
                    </Provider>
                </body>
            </ClerkProvider>
        </html>
    );
}
