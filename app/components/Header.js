"use client"
import React, { useState } from "react";
import Link from "next/link";
import { UserIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation';

const Header = () => {

  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const loggedIn = sessionStorage.getItem('loggedin')
  const user = sessionStorage.getItem('username')

  const logout = async () => {
    try {
      sessionStorage.removeItem('loggedin')
      sessionStorage.removeItem('username')
      setDropdownOpen(false)
      router.push('/')
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }
  
  return (
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white"><Link href="/">Softphone Calling Solution</Link></h1>
        <nav className="space-x-4">
        {loggedIn ? (
            <>
              {user === 'admin' && <Link href="/accounts" className="text-white hover:text-gray-400">Accounts</Link>}
              <Link href="/cdr" className="text-white hover:text-gray-400">Call Records</Link>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="text-white hover:text-gray-400">
                <UserIcon className="h-4 w-4" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white divide-y divide-gray-100 rounded-md shadow-lg">
                  <div className="px-4 py-3">
                    <p className="text-sm">Logged in as {user}</p>
                  </div>
                  <div className="px-4 py-3">
                    <Link href="/change-password" className="text-sm">Change Password</Link>
                  </div>
                  <div className="px-4 py-3">
                    <button onClick={() => logout()} className="text-sm">Logout</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link href="/" className="text-white hover:text-gray-400">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
