"use client"

import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

const AccountsTable = () => {

    const [accounts, setAccounts] = useState([])
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [loading, setLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const fetchAccounts = async () => {
        setLoading(true)
        try {
            const response = await axiosInstance.get(`/accounts/`, {
                params: {
                    page: currentPage,
                    page_size: perPage
                }
            })
            setAccounts(response.data.accounts);
            setTotalPages(response.data.total_pages);
        } catch (error) {
            console.error('Error fetching accounts:', error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAccounts()
    }, [currentPage])

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Transport
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            AORS
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Auth
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {accounts.map((account) => (
                        <tr key={account.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.transport}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.aors}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{account.auth}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination controls */}
            <div className="flex justify-center mt-4">
                {/* Render page numbers */}
                {pageNumbers.map((pageNumber) => (
                    <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={`px-3 py-1 bg-gray-100 ${
                        pageNumber === currentPage ? "bg-gray-300 text-gray-700" : "text-gray"
                    }`}
                    >
                    {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AccountsTable;
