// import { useState, useEffect } from "react";

// export default function useWallet() {
//   const [account, setAccount] = useState<string | null>(null);

//   useEffect(() => {
//     const storedAccount = localStorage.getItem("metamaskAccount");
//     if (storedAccount) {
//       setAccount(storedAccount);
//     }
//   }, []);

//   const connectWallet = async () => {
//     if (typeof window.ethereum !== "undefined") {
//       try {
//         const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

//         if (accounts.length === 0) {
//           alert("You need to create an Ethereum account to use this website.");
//         } else {
//           const selectedAccount = accounts[0];
//           setAccount(selectedAccount);
//           localStorage.setItem("metamaskAccount", selectedAccount);
//           console.log("Connected account:", selectedAccount);
//         }
//       } catch (error) {
//         console.error("Error connecting to MetaMask:", error);
//       }
//     } else {
//       alert("Please install and enable MetaMask to use this website.");
//     }
//   };

//   return { account, connectWallet };
// }

// ------------------------------------

import { useState, useEffect } from "react";

export default function useWallet() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const storedAccount = localStorage.getItem("metamaskAccount");
    if (storedAccount) {
      setAccount(storedAccount);
    }
  }, []);

  const connectWallet = async (): Promise<string | null> => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        if (accounts.length === 0) {
          alert("You need to create an Ethereum account to use this website.");
          return null;
        } else {
          const selectedAccount = accounts[0];
          setAccount(selectedAccount);
          localStorage.setItem("metamaskAccount", selectedAccount);
          console.log("Connected account:", selectedAccount);
          return selectedAccount; // Return account address
        }
      } catch (error) {
        // console.error("Error connecting to MetaMask:", error);
        alert("Error connecting to MetaMask. Please try again.");
        return null;
      }
    } else {
      alert("Please install and enable MetaMask to use this website.");
      return null;
    }
  };

  return { account, connectWallet };
}

