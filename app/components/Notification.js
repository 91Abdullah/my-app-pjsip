import React, { useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const Alert = ({ error, message, show, setShow }) => {

    if (!show) {
        return null;
    }

    return (
        <div className={`fixed inset-0 flex items-center justify-center z-50 ${show ? '' : 'hidden'}`}>
            <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
            <div className={`max-w-sm m-3 py-3 px-5 rounded-md flex flex-col items-center space-x-3 transform transition-all ease-in-out duration-500 ${show ? 'scale-100 opacity-100' : 'scale-90 opacity-0'} ${error ? 'bg-red-200 text-red-700' : 'bg-gray-500 text-white'}`}>
                {error && <ExclamationCircleIcon className="h-6 w-6 mb-2" />}
                <div className="w-full">
                    {message}
                </div>
                <button onClick={() => setShow(false)} className="text-md font-bold bg-white text-gray-500 px-4 py-2 rounded block text-right mt-4">
                    OK
                </button>
            </div>
        </div>
    );
};

export default Alert;