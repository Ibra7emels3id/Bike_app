'use client'
import Header from '../components/header';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { useUser } from '@clerk/nextjs';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import CartTrast from '../components/CartTrast'
import { FetchGettransactionAdmin } from '../../../lib/features/ProductsSlice';

const Page = () => {
    const dispatch = useAppDispatch()
    const { GetTransactionAdmin } = useAppSelector((state) => state.data)

    const Alltransaction = GetTransactionAdmin.map((item) => (
        <CartTrast key={item.id} item={item} />
    ))


    useEffect(() => {
        dispatch(FetchGettransactionAdmin())
    }, [])

    return (
        <>
            <Header />
            <div className="transactions pt-32 w-[90%] m-auto">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' width={200}>type</TableCell>
                                <TableCell align="center" width={700}>name Product</TableCell>
                                <TableCell align="center" width={400} >Date/Time</TableCell>
                                <TableCell align="center" width={200} >Condition</TableCell>
                                <TableCell align="center" width={200} >Condition</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Alltransaction}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

export default Page;
