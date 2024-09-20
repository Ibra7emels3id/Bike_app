'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CartCount from './CartCount';
import { useAppDispatch, useAppSelector } from '../lib/hooks';
import { ShowAlert, getTitle } from '../lib/features/cartSlice';
import AlertDAtaUser from './AlertDAtaUser.jsx'
import { signOut, useSession } from 'next-auth/react';
import Avatar from './Avatars'
import LogoutIcon from '@mui/icons-material/Logout';
import { Button } from '@mui/material';
import Loading from './Loading';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Drawer from '@mui/joy/Drawer';
import Input from '@mui/joy/Input';
import List from '@mui/joy/List';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import ModalClose from '@mui/joy/ModalClose';
import Menu from '@mui/icons-material/Menu';
import Search from '@mui/icons-material/Search';


const Header = () => {
    const { data: session, status } = useSession()
    const [header, setheader] = useState()
    const [open, setOpen] = React.useState(false);
    const user = session?.user
    const dispatch = useAppDispatch()
    const { ShowAlerttran } = useAppSelector((state) => state.cart)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 30) {
                setheader('bg-white');
            } else {
                setheader('');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    console.log(session?.user?.role);

    return (
        <>
            <header className={`${header} fixed w-full z-30`}>
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="md:flex md:items-center md:gap-12">
                            <Link href={'/'} className="block text-teal-600" >
                                <span className="sr-only">Home</span>
                                <Image
                                    src={'/imgea/hero_bike.png'}
                                    width={70}
                                    height={70}
                                    alt='logo'
                                />
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <nav aria-label="Global">
                                <ul className="flex items-center gap-6 text-sm">
                                    <li>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" href="/"> Home </Link>
                                    </li>
                                    <li>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" href="/shop"> shop </Link>
                                    </li>
                                    <li>
                                        <a className="text-gray-500 transition hover:text-gray-500/75" href="/services"> Services </a>
                                    </li>
                                    <li>
                                        <a className="text-gray-500 transition hover:text-gray-500/75" href="/team"> Team </a>
                                    </li>
                                    {status === 'loading' ? <Loading /> :
                                        user &&
                                        <li>
                                            <button onClick={() => {
                                                dispatch(ShowAlert())
                                            }} className="text-gray-500 transition hover:text-gray-500/75" > Transaction </button>
                                            <span className={`${ShowAlerttran === false ? 'hidden opacity-0' : 'flex opacity-100'}`}><AlertDAtaUser /></span>
                                        </li>
                                    }
                                    <li className='LinkUser'>
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" href="/cart">
                                            <span className=''><CartCount /></span>
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="flex items-center gap-4">
                            {user ?
                                <>
                                    <Avatar />
                                    <IconButton onClick={async() => {
                                        await signOut()
                                        window.location.href = '/'
                                    }} aria-label="delete" size="large">
                                        <LogoutIcon sx={{ color: '#333' }} />
                                    </IconButton>
                                </>
                                :
                                <div className="sm:flex sm:gap-4">
                                    <Link className="rounded-md bg-red-800 px-5 py-2.5 text-sm font-medium text-white shadow" href="/sign-in" >
                                        Login
                                    </Link>
                                    <div className="hidden sm:flex">
                                        <Link className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-red-600" href="/sign-up" >
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            }

                            <div className="block md:hidden">
                                <React.Fragment>
                                    <IconButton variant="outlined" color="neutral" onClick={() => setOpen(true)}>
                                        <Menu />
                                    </IconButton>
                                    <Drawer open={open} onClose={() => setOpen(false)}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 0.5,
                                                ml: 'auto',
                                                mt: 1,
                                                mr: 2,
                                            }}
                                        >
                                            <Typography
                                                component="label"
                                                htmlFor="close-icon"
                                                sx={{ fontSize: 'sm', fontWeight: 'lg', cursor: 'pointer' }}
                                            >
                                                Close
                                            </Typography>
                                            <ModalClose id="close-icon" sx={{ position: 'initial' }} />
                                        </Box>
                                        <Input
                                            size="sm"
                                            placeholder="Search"
                                            variant="plain"
                                            endDecorator={<Search />}
                                            slotProps={{
                                                input: {
                                                    'aria-label': 'Search anything',
                                                },
                                            }}
                                            sx={{
                                                m: 3,
                                                borderRadius: 0,
                                                borderBottom: '2px solid',
                                                borderColor: 'neutral.outlinedBorder',
                                                '&:hover': {
                                                    borderColor: 'neutral.outlinedHoverBorder',
                                                },
                                                '&::before': {
                                                    border: '1px solid var(--Input-focusedHighlight)',
                                                    transform: 'scaleX(0)',
                                                    left: 0,
                                                    right: 0,
                                                    bottom: '-2px',
                                                    top: 'unset',
                                                    transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                                                    borderRadius: 0,
                                                },
                                                '&:focus-within::before': {
                                                    transform: 'scaleX(1)',
                                                },
                                            }}
                                        />
                                        <List
                                            size="lg"
                                            component="nav"
                                            sx={{
                                                flex: 'none',
                                                fontSize: 'xl',
                                                '& > div': { justifyContent: 'center' },
                                            }}
                                        >
                                            <ListItemButton sx={{ fontWeight: 'lg' }}><Link href={'/'}>Home</Link></ListItemButton>
                                            <ListItemButton><Link href={'/shop'}>Shop</Link></ListItemButton>
                                            <ListItemButton><Link href={'/services'}>Services</Link></ListItemButton>
                                            <ListItemButton><Link href={'/about'}>About</Link></ListItemButton>
                                            <ListItemButton><Link href={'/contact'}>Contact</Link></ListItemButton>
                                            <ListItemButton><Link href={'/team'}>Team</Link></ListItemButton>
                                            {status === 'loading' ? <Loading /> :
                                                user &&
                                                <ListItemButton>
                                                    <button onClick={() => {
                                                        dispatch(ShowAlert())
                                                    }} className="text-gray-500 transition hover:text-gray-500/75" > Transaction </button>
                                                    <span className={`${ShowAlerttran === false ? 'hidden opacity-0' : 'flex opacity-100'}`}><AlertDAtaUser /></span>
                                                </ListItemButton>
                                            }
                                            <ListItemButton className='LinkUser'>
                                                <Link className="text-gray-500 transition hover:text-gray-500/75" href="/cart">
                                                    <span className=''><CartCount /></span>
                                                </Link>
                                            </ListItemButton>
                                        </List>
                                    </Drawer>
                                </React.Fragment>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
