// src/components/RegisterForm.jsx
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Forms = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            console.log(result);
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
                toast.success(result.error)
            }
            toast.success(result.message)
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong!');
        }
    };

    // useError function
    useEffect(() => {
        setTimeout(() => {
            setConfirmPassword('')
        }, 5000)
    }, [])

    return (
        <form onSubmit={handleSubmit} className="w-[100%] max-w-md mx-auto p-5 shadow rounded">
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
                {confirmPassword != formData.password && <p className="text-red-500 text-xs">please Check Password</p>}
            </div>
            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded-md">Register</button>
        </form>
    );
};

export default Forms;
