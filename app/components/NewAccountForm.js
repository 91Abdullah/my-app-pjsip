"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";
import Alert from "./Notification";
import axiosInstance from "../../axiosInstance";

const NewAccountForm = ({ onSubmit }) => {
    // State variables to store form field values
    const [id, setId] = useState("");
    const [transport, setTransport] = useState("transport-udp");
    const [auth, setAuth] = useState("");
    const [show, setShow] = useState(false)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        console.log(error, show, errorMessage)   
    }, [error, errorMessage, show])

    const createAccount = async () => {
        try {
            const response = await axiosInstance.post(`/accounts/${id}`, {
                username: id,
                password: auth
            })
        } catch (e) {
            setError(true)
            setErrorMessage(e.response.data.detail)
        }

        setShow(true)
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Call the onSubmit function with form data
        //onSubmit({ id, transport, aors, auth });
        createAccount()
    };

    const message = (
        <>
            The account has been created successfully. If you want to check newly created account navigate to the <a href="/accounts">Accounts</a> page.
        </>
    )

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto m-4">
            <Alert show={show} setShow={setShow} error={error} message={error ? errorMessage : message} />
            {/* ID field */}
            <div className="mb-4">
                <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID (ex. 3001)</label>
                <input
                    type="text"
                    id="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    required
                />
            </div>

            {/* Auth field */}
            <div className="mb-4">
                <label htmlFor="auth" className="block text-sm font-medium text-gray-700">Auth (Password)</label>
                <input
                    type="password"
                    id="auth"
                    value={auth}
                    onChange={(e) => setAuth(e.target.value)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    required
                />
            </div>

            {/* Transport field */}
            <div className="mb-4">
                <label htmlFor="transport" className="block text-sm font-medium text-gray-700">Transport</label>
                <select
                    id="transport"
                    value={transport}
                    onChange={(e) => setTransport(e.target.value)}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
                    required
                >
                    <option value="transport-udp">transport-udp</option>
                </select>
            </div>

            {/* Submit button */}
            <button
                type="submit"
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-200 focus:border-gray-300"
            >
                Submit
            </button>
        </form>
    );
};

export default NewAccountForm;