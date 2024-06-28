import React from 'react';
import Product from '../app/shop/_components/Product'

const Products = () => {
    return (
        <>
            <div className="mt-4 w-[90%] m-auto py-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Product />
            </div>
        </>
    );
}

export default Products;
