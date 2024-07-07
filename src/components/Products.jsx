import React, { useEffect } from 'react';
import Product from '../app/shop/_components/Product'
import Item from './item';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { FetchProducts } from '../lib/features/ProductsSlice';

const Products = () => {
    const { products } = useAppSelector((state) => state.data)
    const dispatch = useAppDispatch()

    // Handle All products 
    const AllItems = products?.slice(0 , 8)?.map((item) => (
        <Item key={item.id} item={item} />
    ))


    // Handel Get Data Api
    useEffect(() => {
        dispatch(FetchProducts())
    }, [dispatch]);

    return (
        <>
            <div className="mt-4 w-[90%] m-auto py-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {AllItems}
            </div>
        </>
    );
}

export default Products;
