'use client'
import React, { useEffect } from 'react';
import Header from '../../components/Header';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import ProductsSlice, { FetchGettransaction } from '../../lib/features/ProductsSlice';
import { useUser } from '@clerk/nextjs';
import CartTrast from '../../components/cartTrast.jsx';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import ErrorPage from 'next/error';


const Page = () => {
    const dispatch = useAppDispatch()
    const { Gettransaction } = useAppSelector((state) => state.data)
    const { user } = useUser()
    // console.log(Gettransaction);


    // filter Cart of user 
    const transactions = Gettransaction.filter((it) => {
        return it.username == user?.username
    })

    const Alltransaction = transactions.map((item) => (
        <CartTrast key={item.id} item={item} />
    ))


    useEffect(() => {
        dispatch(FetchGettransaction())
    }, [])

    return (
        user ? <>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Alltransaction}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </> :  <ErrorPage statusCode={404} />
    );
}

export default Page;
