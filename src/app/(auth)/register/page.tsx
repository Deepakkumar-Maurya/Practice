"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGlobal } from "@/hooks/useGlobal";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/app-constant/constant";
import Web3 from "web3";

export default function Signup() {
  const { account, setNationalId, setPassKey } = useGlobal()
  const [formData, setFormData] = useState({ nationalId: "", passkey: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  console.log("------", account)
  window.web3 = new Web3(window.ethereum);
  window.contract = new window.web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

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
      const result = await window.contract.methods.register(formData.nationalId, formData.passkey, "", "", "").send({from : account});
      console.log(result);
      console.log("Registered account:", account);

      router.push("/dashboard"); // Redirect after signup
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Create an Account</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="nationalId">National ID</label>
          <input
            type="nationalId"
            name="nationalId"
            placeholder="National ID"
            value={formData.nationalId}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label htmlFor="passkey">Passkey</label>
          <input
            type="passkey"
            name="passkey"
            placeholder="Passkey"
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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
