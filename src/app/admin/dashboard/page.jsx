'use client'
import React, { useEffect } from 'react';
import Header from '../components/header';
import { useAppDispatch, useAppSelector } from '../../../lib/hooks';
import { DeleteProduct, FetchProducts, handleCondit } from '../../../lib/features/ProductsSlice';
import { Checkbox, Chip, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';


// import Table ui
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import VisibilityIcon from '@mui/icons-material/Visibility';



const Page = () => {
    const [checked, setChecked] = React.useState(true);
    const [item, setItem] = React.useState({});
    const dispatch = useAppDispatch()
    const { products, isLoading, error } = useAppSelector((state) => state.data)

    // handle Delete items
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = (id) => {
        dispatch(DeleteProduct(id))
        setOpen(false);
    };

    // Handle condition
    const handleChange = async (it) => {
        try {
            const res = await fetch(`http://localhost:9000/posts/${it.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    condition: checked
                })
            })
            const data = await res.json()
            setItem(data)
            return data
        } catch (err) {
            console.error(err)
        }
    };


    React.useEffect(() => {
        dispatch(FetchProducts())
    }, [dispatch, item]);

    // handle Table Style
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

    // handle User
    // const { user } = useUser()

    return (
        <>
            <Header />
            <div className="overflow-x-auto w-[80%] m-auto mt-32">
                <TableContainer component={Paper}>
                    <Table sx={{ width: 1200 }}  aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell sx={{ width: '100px' }}>condition</StyledTableCell>
                                <StyledTableCell align="center">img</StyledTableCell>
                                <StyledTableCell align="left">Title</StyledTableCell>
                                <StyledTableCell align="left w-[300px]">description</StyledTableCell>
                                <StyledTableCell align="left">Price</StyledTableCell>
                                <StyledTableCell align="right">Count</StyledTableCell>
                                <StyledTableCell align="center">View</StyledTableCell>
                                <StyledTableCell align="center">Edit</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ width: '100%' }}>
                            {products?.map((it) => (
                                <StyledTableRow key={it.id}>
                                    <StyledTableCell component="th" scope="row">
                                        <Checkbox
                                            onChange={(event) => {
                                                setChecked(event.target.checked);
                                                handleChange(it)
                                            }}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                            checked={it.condition}
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '110px' }} >
                                        <Image
                                            src={it?.image}
                                            height={130}
                                            width={130}
                                            alt='img'
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{it.title}</StyledTableCell>
                                    <StyledTableCell align="left">{it.description.slice(0 , 100)}...</StyledTableCell>
                                    <StyledTableCell align="left">${it.price}</StyledTableCell>
                                    <StyledTableCell align="left">{it.rating.count}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Link href={`/admin/dashboard/${it.id}`} className=" bg-sky-800 hover:bg-sky-950 text-white font-bold py-2 px-4 rounded">
                                            <VisibilityIcon />
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Link href={`/admin/dashboard/${it.id}`} className=" bg-green-800 hover:bg-green-950 text-white font-bold py-2 px-4 rounded">
                                            <EditIcon />
                                        </Link>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <React.Fragment>
                                            <Button variant="outlined" onClick={handleClickOpen}>
                                                <DeleteIcon  />
                                            </Button>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Delete Product ?"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        Do you Remove item? <span className=' text-red-950'>${it.title}?</span>
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleClose}>cancel</Button>
                                                    <Button onClick={() => {
                                                        handleDelete(`${it.id}`)
                                                    }} autoFocus>
                                                        Confirm
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </React.Fragment>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

export default Page;
