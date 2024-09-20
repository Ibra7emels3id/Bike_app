'use client'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import * as React from 'react';
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
    const { data: session, state } = useSession();
    const user = session?.user;
    const [open, setOpen] = React.useState(false);


    if (user?.role) {
        return (
            <>
                <header className="bg-white">
                    <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">

                        {user?.role && <Link className="block text-teal-600" href="/admin">
                            <span className=" text-indigo-600 font-bold">DashBoard</span>
                        </Link>}

                        <div className="flex flex-1 items-center justify-end md:justify-between">
                            <nav aria-label="Global" className="hidden md:block">
                                <ul className="flex items-center gap-6 text-sm">

                                    <>
                                        {user?.role && <>
                                            <li>
                                                <Link href={'/admin/additem'} className="text-gray-500 transition hover:text-gray-500/75"> Add Product </Link>
                                            </li>
                                            <li>
                                                <Link className="text-gray-500 transition hover:text-gray-500/75" href="/admin/cart">Transaction Cart</Link>
                                            </li>
                                            <li>
                                                <Link className="text-gray-500 transition hover:text-gray-500/75" href="/admin/dashboard">Cart condition</Link>
                                            </li>
                                            <li>
                                                <a className="text-gray-500 transition hover:text-gray-500/75" href="#"> Careers </a>
                                            </li>
                                        </>}
                                    </>
                                </ul>
                            </nav>
                            <div className="flex items-center gap-4">
                                {/* <UserButton /> */}
                                <button className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden">
                                    <span className="sr-only">Toggle menu</span>
                                    {/* <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg> */}
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
                                                <ListItemButton sx={{ fontWeight: 'lg' }}>Home</ListItemButton>
                                                <ListItemButton>About</ListItemButton>
                                                <ListItemButton>Studio</ListItemButton>
                                                <ListItemButton>Contact</ListItemButton>
                                            </List>
                                        </Drawer>
                                    </React.Fragment>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
            </>
        );
    }
}

export default Header;
