"use client";

import { useState } from "react";

export default function ConnectWallet() {
  const [walletConnected, setWalletConnected] = useState(false);

  const handleConnectWallet = () => {
    setWalletConnected(true);
    alert("Wallet Connected!"); // Placeholder for wallet integration
  };

  return (
    <button
      onClick={handleConnectWallet}
      className={`mt-6 w-full px-4 py-2 rounded-md font-semibold transition ${
        walletConnected ? "bg-green-500 text-white" : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
    >
      {walletConnected ? "Wallet Connected" : "Connect Wallet"}
    </button>
  );
}
