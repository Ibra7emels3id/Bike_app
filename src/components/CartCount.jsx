'use client'
import React, { useEffect } from 'react';
// import ICons ui
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { getTitle } from '../lib/features/cartSlice';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));

const CartCount = () => {
    const dispatch = useAppDispatch()
    const {CartTitle , cartQuantity , cart} = useAppSelector((state)=> state.cart)

    useEffect(()=>{
        dispatch(getTitle())
    },[cart])
    return (
        <>
            <IconButton aria-label="cart">
                <StyledBadge badgeContent={cartQuantity} color="secondary">
                    <ShoppingCartIcon />
                </StyledBadge>
            </IconButton>
        </>
    );
}

export default CartCount;
