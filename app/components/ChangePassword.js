"use client"
import { useState } from 'react';
import axiosInstance from '../../axiosInstance';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Add logic to handle password change
        const username = sessionStorage.getItem('username')

        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await axiosInstance.put('/change_password', {
                username: username,
                current_password: currentPassword,
                new_password: newPassword,
                confirm_password: confirmPassword,
            })

            if (response.status === 200) {
                alert('Password changed successfully');
            } else {
                alert('Error changing password');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    alert('Bad Request: The server could not understand the request due to invalid syntax.');
                } else if (error.response.status === 401) {
                    alert('Unauthorized: Invalid username or password');
                }
            } else {
                console.error(error);
            }
        }
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
                        Current Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="currentPassword" type={isChecked ? 'text' : "password"} value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                    New Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newPassword" type={isChecked ? 'text' : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Confirm New Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="confirmPassword" type={isChecked ? 'text' : "password"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                {/* <!-- Checkbox --> */}
                <div className="flex mt-4">
                    <input id="password-checkbox" checked={isChecked} onChange={handleCheckboxChange} type="checkbox" className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                    <label htmlFor="password-checkbox" className="text-sm ms-3 dark:text-neutral-400">Show password</label>
                </div>
                {/* <!-- End Checkbox --> */}
                <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;