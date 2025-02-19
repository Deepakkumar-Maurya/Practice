"use client";

import { useState } from "react";
import Link from "next/link";
import ConnectWallet from "./ConnectWallet";

export default function Sidebar() {
  return (
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
      <ConnectWallet />

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
      <button className="mt-6 bg-blue-600 text-white px-4 py-2 w-full rounded-md hover:bg-blue-700 transition">
        ➕ Add New Password
      </button>
    </aside>
  );
}
