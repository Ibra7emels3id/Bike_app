'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Provider store={store}>
                    <Header />
                    {children}
                </Provider>
            </body>
        </html>
    );
}
