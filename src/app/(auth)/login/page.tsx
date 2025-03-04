"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGlobal } from "@/hooks/useGlobal";

export default function Login() {
  const [formData, setFormData] = useState({ nationalId: "", passkey: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { account, setNationalId, setPassKey } = useGlobal();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      setNationalId(formData.nationalId);
      setPassKey(formData.passkey);
      await window.contract.methods.login(formData.nationalId, formData.passkey).send({from : account});
      console.log("Logged in account:", account);

      alert("Login successful!");
      router.push("/dashboard"); // Redirect after login
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Login</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="nationalId">National ID</label>
          <input
            type="text"
            name="nationalId"
            placeholder="Enter National ID"
            value={formData.nationalId}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="passkey">Passkey</label>
          <input
            type="password"
            name="passkey"
            placeholder="Enter Passkey"
            value={formData.passkey}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
