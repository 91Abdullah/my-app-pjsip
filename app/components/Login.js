"use client"
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { useRouter } from 'next/navigation';


const Login = () => {
    const router = useRouter(); // Initialize router
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const checkLogin = async () => {
        try {
            const loggedIn = sessionStorage.getItem('loggedin');
            if (loggedIn) {
                router.push('/cdr');
            } else {
                return;
            }
        } catch (error) {
            console.error('Error checking login:', error);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create base64-encoded string of username:password
        const credentials = btoa(`${username}:${password}`);

        try {
            const response = await axiosInstance.post('/new_login', {
                username: username,
                password: password
            });

            if (response) {
                // If login is successful, redirect to /cdrs/
                sessionStorage.setItem('username', username)
                sessionStorage.setItem('loggedin', true)
                window.location.reload();
            }
        } catch (error) {
            // Handle login error
            if (error.response && error.response.status === 401) {
                alert('Unauthorized: Invalid username or password');
            } else {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        checkLogin();
    }, [])

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;