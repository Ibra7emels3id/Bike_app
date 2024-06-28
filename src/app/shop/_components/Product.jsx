'use client'
import React, { useEffect } from 'react';
import Item from '../../../components/item';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { FetchProducts } from '../../../lib/features/ProductsSlice'

const Product = ({ Price }) => {
    console.log(Price?.min);
    const dispatch = useAppDispatch()
    const { products } = useAppSelector((state) => state.data)


    const PriceProduct = products?.filter(product => {
        return product?.price >= Price?.min && product?.price <= Price?.max
    })

    let AllProducts = products ;

    if(PriceProduct == '' ){
        AllProducts = products
    }else{
        AllProducts = PriceProduct
    }

    // Handle All products 
    const AllItems = AllProducts?.map((item) => (
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

export default Product;
