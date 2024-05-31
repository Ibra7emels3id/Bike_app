'use client'
import Header from "@/components/header";
import { FetchProducts } from "@/lib/features/ProductsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
    const dispatch = useAppDispatch()
    const {products , isLoading , error } = useAppSelector((state)=> state.data)
    console.log(products);

    useEffect(() => {
        dispatch(FetchProducts())
    }, []);

    return (
        <>
            
            {/* {isLoading && <h1>Loading...</h1>}
            {error && <h1>{error}</h1>}
            {products.map((product) => (
                <div key={product.id}>
                    <Image
                        src={product.imge}
                        alt={product.name}
                        width={200}
                        height={200}
                    />
                    <h1>{product.title}</h1>
                    <p>{product.views}</p>
                </div>
            ))} */}
        </>
    )
}
