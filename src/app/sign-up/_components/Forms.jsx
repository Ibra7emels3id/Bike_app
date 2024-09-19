// src/components/RegisterForm.jsx
import { Alert, Box, CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ButtonsIcons from '../../sign-in/_components/ButtonsIcons';

const Forms = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        if (formData.first_name === '' || formData.last_name === '' || formData.email === '' || formData.password === '' || confirmPassword === '') {
            setLoading(false);
            toast.error('Please fill all fields.')
            return
        } else {
            if (confirmPassword !== formData.password) {
                setErrors({...errors, confirmPassword: 'Passwords do not match.' })
                setLoading(false);
                return
            }else{
                try {
                    const response = await fetch('/api/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData),
                    });
                    const result = await response.json();
                    if (response.ok) {
                        console.log(result.message);
                        // Optionally, reset form data
                        setFormData({
                            first_name: '',
                            last_name: '',
                            email: '',
                            password: '',
                        });
                        toast.success(result.message)
                        router.push('/sign-in')
                    } else {
                        setErrors(result.error);
                        toast.error(result.error)
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Something went wrong!');
                    setLoading(false);
                } finally {
                    setLoading(false);
                }
            }
        }
    };

    // useError function
    useEffect(() => {
        setTimeout(() => {
            setConfirmPassword('')
        }, 5000)
    }, [])



    return (
        <>
            <form onSubmit={handleSubmit} className="w-[100%] max-w-md mx-auto p-5 shadow rounded">
                <div className="icons mb-5  grid grid-cols-1 md:grid-cols-2 w-full gap-4">
                    <ButtonsIcons />
                </div>
                <div className="mb-4">
                    <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder='First Name'
                        className="mt-1 h-12 outline-none px-3 block w-full border rounded-md shadow-sm"
                    />
                    {errors.first_name && <p className="text-red-500 text-xs">{errors.first_name}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder='Last Name'
                        className="mt-1 h-12 outline-none px-3 block w-full border rounded-md shadow-sm"
                    />
                    {errors.last_name && <p className="text-red-500 text-xs">{errors.last_name}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Enter Your Email'
                        className="mt-1 h-12 outline-none px-3 block w-full border rounded-md shadow-sm"
                    />
                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder='Enter Your Password.......'
                        className="mt-1 h-12 outline-none px-3 block w-full border rounded-md shadow-sm"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">confirm Password</label>
                    <input
                        id="password"
                        name="confirmPassword"
                        type="password"
                        onChange={(e) => {
                            setErrors({ ...errors, password: e.target.value === formData.password ? '' : 'Passwords do not match' });
                            setConfirmPassword(e.target.value)
                        }}
                        placeholder='Enter Your confirm Password.......'
                        className="mt-1 h-12 outline-none px-3 block w-full border rounded-md shadow-sm"
                    />
                    {errors && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                </div>
                {loading ? <Box className=' bg-slate-100 h-12 rounded-md w-full flex items-center justify-center' sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box> : <button
                    onClick={handleSubmit}
                    type="submit"
                    className="inline-block w-full shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                >
                    Register
                </button>}
            </form>
        </>
    );
};

export default Forms;
