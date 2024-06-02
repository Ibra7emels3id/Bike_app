'use client'
import { FetchProducts } from "@/lib/features/ProductsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
    const dispatch = useAppDispatch()
    const { products, isLoading, error } = useAppSelector((state) => state.data)
    console.log(products);

    useEffect(() => {
        dispatch(FetchProducts())
    }, []);

    return (
        <>
            <Link href='/admin'>
                view
            </Link>
        </>
    )
}
