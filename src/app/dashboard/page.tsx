'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import PasswordTable from "./components/PasswordTable";

export default function Dashboard() {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const account = localStorage.getItem("account"); // Replace with actual authentication logic
    if (!account) {
      alert("You have been logged out! Redirecting to home...");
      router.push("/"); // Redirect to home if user is not logged in
    } else {
      setIsLoading(false); // Show dashboard only after checking auth
    }
  }, [router]);

  if (isLoading) return <p>Loading...</p>; // Show loading state while checking auth

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Header />
        <SearchBar />
        <PasswordTable />
      </main>
    </div>
  );
}
