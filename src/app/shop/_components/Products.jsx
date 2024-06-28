'use client'
import React, { useEffect } from 'react';
import Item from '../../../components/item';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import {FetchProducts} from '../../../lib/features/ProductsSlice'

const Products = () => {
    const dispatch = useAppDispatch()
    const { products } = useAppSelector((state) => state.data)

    // Handle All products 
    const AllItems = products?.map((item) => (
        <Item key={item.id} item={item} />
    ))

    // Handel Get Data Api
    useEffect(() => {
        dispatch(FetchProducts())
    }, []);

    return (
        <>
            {AllItems}
        </>
    );
}

export default Products;
