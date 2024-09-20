'use client'
import { useEffect, useState } from 'react';
import Header from './components/header';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { FetchCategory, FetchProducts } from '../../lib/features/ProductsSlice';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSession } from 'next-auth/react';
import Loading from '../../components/Loading';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Page = () => {
    const { products, category, isLoading, error } = useAppSelector((state) => state.data)
    const dispatch = useAppDispatch()
    const router = useRouter();
    const { data: session, status } = useSession()
    const user = session?.user

    console.log(products);



    useEffect(() => {
        if (status === 'loading') return;

        if (user?.role !== 'admin') {
            router.push('/');
        }
        dispatch(FetchProducts());
        dispatch(FetchCategory());
    }, [user?.role, status, router]);



    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(DeleteProduct(id))
        }
    }

    if (status === 'loading') return <Loading />;


    return (
        <>
            <Header />
            <div className=" m-auto pt-10 w-[90%] flex items-center justify-center">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1200, minWidth: 900, margin: 'auto' }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center' width={150}>Image</StyledTableCell>
                                <StyledTableCell align="center" width={200}>Title</StyledTableCell>
                                <StyledTableCell align="center" width={200}>Description</StyledTableCell>
                                <StyledTableCell align="center" width={150}>Category</StyledTableCell>
                                <StyledTableCell align="center" width={100}>Price</StyledTableCell>
                                <StyledTableCell align="center" width={100}>Quantity</StyledTableCell>
                                <StyledTableCell align="center" width={100}>Update</StyledTableCell>
                                <StyledTableCell align="center" width={100}>Details</StyledTableCell>
                                <StyledTableCell align="center" width={100}>Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.map((it) => (
                                <StyledTableRow key={it.name}>
                                    <StyledTableCell component="th" scope="row">
                                        <img src={it.image} alt="" />
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{it.title}</StyledTableCell>
                                    <StyledTableCell align="center">{it.description.slice(0, 70)}...</StyledTableCell>
                                    <StyledTableCell align="center">{it.category}</StyledTableCell>
                                    <StyledTableCell align="center">{it.price}$</StyledTableCell>
                                    <StyledTableCell align="center">{it.rating.count}</StyledTableCell>
                                    <StyledTableCell align="center"><button className='bg-sky-700 w-28 rounded-lg flex items-center justify-center h-9 text-white' variant="contained" color="primary" startIcon={<EditIcon />}>
                                        Update
                                    </button></StyledTableCell>
                                    <StyledTableCell align="center"><button className='bg-green-600 w-28 rounded-lg flex items-center justify-center h-9 text-white' variant="contained" color="primary" startIcon={<RemoveRedEyeIcon />}>
                                        Details
                                    </button></StyledTableCell>
                                    <StyledTableCell align="center"><button className='bg-red-600 w-28 rounded-lg flex items-center justify-center h-9 text-white' variant="outlined" startIcon={<DeleteIcon />}>
                                        Delete
                                    </button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
};

export default Page;
