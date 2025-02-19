"use client";

import { useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [walletConnected, setWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    setWalletConnected(true);
    alert("Wallet Connected!"); // Placeholder for wallet integration
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        {/* User Info */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
            U
          </div>
          <h3 className="mt-3 text-lg font-semibold">John Doe</h3>
          <p className="text-sm text-gray-500">john@example.com</p>
        </div>

        {/* Connect Wallet */}
        <button
          onClick={handleConnectWallet}
          className={`mt-6 w-full px-4 py-2 rounded-md font-semibold ${
            walletConnected ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {walletConnected ? "Wallet Connected" : "Connect Wallet"}
        </button>

        {/* Navigation Links */}
        <nav className="mt-6 space-y-4">
          <Link href="/dashboard/passwords" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
            🔑 My Passwords
          </Link>
          <Link href="/dashboard/security" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
            🔒 Security Settings
          </Link>
          <Link href="/dashboard/account" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 rounded-md">
            ⚙️ Account Settings
          </Link>
        </nav>

        {/* Add Password Button */}
        <button className="mt-6 bg-blue-600 text-white px-4 py-2 w-full rounded-md hover:bg-blue-700">
          ➕ Add New Password
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-gray-800">My Stored Passwords</h2>

        {/* Search Bar */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search passwords..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Password List */}
        <div className="mt-6 bg-white shadow-md rounded-md p-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Website</th>
                <th className="text-left py-2">Username</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2">github.com</td>
                <td className="py-2">johndoe</td>
                <td className="py-2">
                  <button className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
              <tr>
                <td className="py-2">gmail.com</td>
                <td className="py-2">johndoe@gmail.com</td>
                <td className="py-2">
                  <button className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
