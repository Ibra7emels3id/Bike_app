'use client'
import Cycles from "../components/Cycles";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Slider from "../components/Slider";
import Main from "../components/main";
import { FetchProducts } from "../lib/features/ProductsSlice";
import { useAppDispatch, useAppSelector } from "../lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import Products from '../components/Products';
import Revuoy from '../components/Revuoy';

export default function Home() {
    return (
        <>
            <Header />
            <Main/>
            <Slider />
            <Cycles />
            <Products />
            <Revuoy />
            <Footer/>
        </>
    )
}
