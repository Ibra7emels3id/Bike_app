'use client'
import Cycles from "@/components/Cycles";
import Header from "@/components/Header";
import Slider from "@/components/Slider";
import Main from "@/components/main";
import { FetchProducts } from "@/lib/features/ProductsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
    const dispatch = useAppDispatch()
    const { products, isLoading, error } = useAppSelector((state) => state.data)

    useEffect(() => {
        dispatch(FetchProducts())
    }, []);

    return (
        <>
            <Header />
            <Main/>
            <Slider />
            <Cycles />
        </>
    )
}
