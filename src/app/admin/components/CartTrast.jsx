'use client'
import React, { useEffect, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button, ListSubheader } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Image from 'next/image';

// import style 
import './style/style.css'
import { FetchGettransactionAdmin } from '../../../lib/features/ProductsSlice';
import { useAppDispatch } from '../../../lib/hooks';

const CartTrast = ({ item }) => {
    const [confirm, setConfirm] = useState(item.condition);
    const dispatch = useAppDispatch()


    // handle Cheange Confirm
    const handleCheangeConfirm = async (id) => {
        if (confirm === true) {
            setConfirm(false);
        } else {
            setConfirm(true);
        }
        try {
            const res = await fetch(`http://localhost:9000/cart/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    condition: confirm
                })
            })
            const data = await res.json()
        } catch (err) {
            console.error(err)
        }
    };

    useEffect(() => {
        dispatch(FetchGettransactionAdmin())
    }, [confirm])
    
    return (
        <>
            <TableRow
                key={item.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align='center' component="th" scope="row">
                    {item.type}
                </TableCell>
                <TableCell align="center">
                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 700,
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 90,
                            '& ul': { padding: 0 },
                        }}
                        subheader={<li />}
                    >
                        {item.cart.map((item) => (
                            <ListItem key={`item-${item.id}`}>
                                <ListItemText primary={`Item--${item.title}`} />
                                <ListItemText primary={<Image
                                    src={item.image}
                                    width={100}
                                    height={100}
                                    alt='img'
                                />} />
                            </ListItem>
                        ))}
                    </List>
                </TableCell>
                <TableCell align="center">
                    <div className="flex items-center justify-center flex-col">
                        <span className='flex'>{item.Date.Date}</span>
                        <span className='flex'>{item.Date.Time}</span>
                    </div>
                </TableCell>
                <TableCell align="center" height={100} width={200} sx={{ margin: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.condition === true ?
                        <Button variant="contained" color="success">
                            Success
                        </Button> :
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    }
                </TableCell>
                <TableCell align="center" >
                    <label class="container">
                        <input onChange={() => {
                            handleCheangeConfirm(item.id)
                        }} type="checkbox" checked={item.condition} />
                        <div class="checkmark"></div>
                    </label>
                </TableCell>
            </TableRow>
        </>
    );
}

export default CartTrast;
