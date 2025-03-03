"use client";

import { useState } from "react";
import Link from "next/link";
import { useGlobal } from "@/hooks/useGlobal";

export default function Sidebar() {
  const { account, nationalId, passKey } = useGlobal();

  const [isPhraseModalOpen, setIsPhraseModalOpen] = useState(false);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);

  // Secret Phrase State
  const [phraseName, setPhraseName] = useState("");
  const [phraseWords, setPhraseWords] = useState(Array(12).fill(""));

  // Account Settings State
  const [accountDetails, setAccountDetails] = useState({
    name: "",
    nationalId: "",
    secretHash: "",
    phone: "",
    address: "",
  });

  // Handle change in secret phrase inputs
  const handlePhraseChange = (index: number, value: string) => {
    const updatedWords = [...phraseWords];
    updatedWords[index] = value;
    setPhraseWords(updatedWords);
  };

  // Handle change in account settings inputs
  const handleAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccountDetails({ ...accountDetails, [e.target.name]: e.target.value });
  };

  // Handle secret phrase form submission
  const handlePhraseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const phraseObj = {
        name: phraseName,
        phrase: phraseWords,
      };
  
      await window.contract.methods
        .storePassword(nationalId, passKey, JSON.stringify(phraseObj))
        .send({ from: account });
  
      console.log("Stored Phrase:", JSON.stringify(phraseObj));
  
      setIsPhraseModalOpen(false); // Close modal after successful submission
    } catch (error) {
      console.error("Error storing phrase:", error);
      alert("Failed to store phrase. Please try again.");
    }
  };

  // Handle account settings form submission
  const handleAccountSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      await window.contract.methods
        .editUserDetails(
          accountDetails.nationalId,
          accountDetails.secretHash,
          accountDetails.name,
          accountDetails.phone,
          accountDetails.address
        )
        .send({ from: account });
  
      console.log("Updated Account Details:", accountDetails);
  
      setIsAccountModalOpen(false); // Close modal after successful submission
    } catch (error) {
      console.error("Error updating account details:", error);
      alert("Failed to update account details. Please try again.");
    }
  };

  return (
    <>
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        {/* User Info */}
        <div className="text-center my-5">
          <div className="w-20 h-20 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
            U
          </div>
          <h3 className="mt-3 text-lg font-semibold">John Doe</h3>
          {/* <p className="text-sm text-gray-500">john@example.com</p> */}
        </div>

        {/* Navigation Links */}
        <nav className="my-5 space-y-2">
          <Link href="#" className="block px-4 py-1 text-gray-700 hover:bg-gray-200 rounded-md">
            🔑 My Keys
          </Link>
          <Link href="#" className="block px-4 py-1 text-gray-700 hover:bg-gray-200 rounded-md">
            🔒 Security Settings
          </Link>
          <button
            onClick={() => setIsAccountModalOpen(true)}
            className="block px-4 py-1 text-gray-700 hover:bg-gray-200 rounded-md w-full text-left"
          >
            ⚙️ Account Settings
          </button>
        </nav>

        {/* Add New Phrase Button */}
        <button
          className="mt-auto mb-20 bg-blue-600 text-white px-4 py-2 w-full rounded-md hover:bg-blue-700 transition"
          onClick={() => setIsPhraseModalOpen(true)}
        >
          ➕ Add New Phrase
        </button>
      </aside>

      {/* Secret Phrase Modal */}
      {isPhraseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold text-gray-800 text-center">🔑 Store a New Recovery Phrase</h3>
            <form onSubmit={handlePhraseSubmit} className="mt-4">
              <label className="block text-gray-700 font-medium">Phrase Name:</label>
              <input
                type="text"
                className="w-full border p-2 rounded-md mt-1"
                placeholder="Enter a name (e.g. Wallet Backup)"
                value={phraseName}
                onChange={(e) => setPhraseName(e.target.value)}
                required
              />
              <div className="grid grid-cols-3 gap-2 mt-4">
                {phraseWords.map((word, index) => (
                  <input
                    key={index}
                    type="text"
                    className="border p-2 rounded-md text-center"
                    placeholder={`${index + 1}`}
                    value={word}
                    onChange={(e) => handlePhraseChange(index, e.target.value)}
                    required
                  />
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => setIsPhraseModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  ✅ Save Phrase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Account Settings Modal */}
      {isAccountModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-semibold text-gray-800 text-center">⚙️ Update Account Settings</h3>
            <form onSubmit={handleAccountSubmit} className="mt-4">
              <label className="block text-gray-700 font-medium">Full Name:</label>
              <input
                type="text"
                name="name"
                className="w-full border p-2 rounded-md mt-1"
                placeholder="Enter your full name"
                value={accountDetails.name}
                onChange={handleAccountChange}
                required
              />

              <label className="block text-gray-700 font-medium mt-2">National ID:</label>
              <input
                type="text"
                name="nationalId"
                className="w-full border p-2 rounded-md mt-1"
                placeholder="Enter National ID"
                value={accountDetails.nationalId}
                onChange={handleAccountChange}
                required
              />

              <label className="block text-gray-700 font-medium mt-2">Secret Hash:</label>
              <input
                type="text"
                name="secretHash"
                className="w-full border p-2 rounded-md mt-1"
                placeholder="Enter Secret Hash"
                value={accountDetails.secretHash}
                onChange={handleAccountChange}
                required
              />

              <label className="block text-gray-700 font-medium mt-2">Phone Number:</label>
              <input
                type="text"
                name="phone"
                className="w-full border p-2 rounded-md mt-1"
                placeholder="Enter Phone Number"
                value={accountDetails.phone}
                onChange={handleAccountChange}
                required
              />

              <label className="block text-gray-700 font-medium mt-2">Address:</label>
              <input
                type="text"
                name="address"
                className="w-full border p-2 rounded-md mt-1"
                placeholder="Enter Address"
                value={accountDetails.address}
                onChange={handleAccountChange}
                required
              />

              <div className="flex justify-between mt-6">
                <button type="button" className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={() => setIsAccountModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  ✅ Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
