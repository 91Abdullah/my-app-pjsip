"use client"
import Link from "next/link"
import AccountsTable from "../components/AccountsTable"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { Router, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Page = () => {

    //const [user, setUser] = useState('')
    const router = useRouter()

    useEffect(() => {
        let user = window.sessionStorage.getItem('username')

        if(user !== 'admin') 
            router.push('/')
    }, [])

    return (
        <div className="container mx-auto p-4">
            <h2 className="mb-4 font-bold">Accounts</h2>
            <div className="group mt-2 mb-4">
                <Link href="/accounts/create" className="p-2 mb-2 border rounded text-gray-500 hover:bg-gray-600 hover:text-white active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300">
                    <PlusCircleIcon className="group-hover:text-white inline-block h-6 w-6 text-gray-500" /> New Account
                </Link>
            </div>
            <AccountsTable />
        </div>
    )
}

export default Page