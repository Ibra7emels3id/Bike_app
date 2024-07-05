'use client'
import React, { useEffect } from 'react';
import Item from '../../../components/item';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { FetchProducts } from '../../../lib/features/ProductsSlice'

const Product = ({ Price, category }) => {
    const dispatch = useAppDispatch()
    const { products } = useAppSelector((state) => state.data)


    const PriceProduct = products?.filter(product => {
        return product?.price >= Price?.min && product?.price <= Price?.max
    })

    const CategoryProduct = products?.filter(product => (
        product?.category == category
    ))

    let AllProducts = products

    if (category !== 'All') {
        AllProducts = CategoryProduct
    } else if (category == 'All') {
        AllProducts = products
    } else if (PriceProduct !== '') {
        AllProducts = PriceProduct
    } else if(PriceProduct == '') {
        AllProducts = products
    }

    // Handle All products 
    const AllItems = AllProducts?.map((item) => (
        <Item key={item.id} item={item} />
    ))

    // Handel Get Data Api
    useEffect(() => {
        dispatch(FetchProducts())
    }, [dispatch]);

    return (
        <>
            {AllItems}
        </>
    );
}

export default Product;
