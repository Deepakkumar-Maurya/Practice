// "use client";

// import React, { createContext, useState, useEffect, ReactNode } from "react";
// import { web3, contract } from "../lib/web3Provider";

// interface Web3ContextType {
//   account: string | null;
//   contract: any;
// }

// export const Web3Context = createContext<Web3ContextType | undefined>(
//   undefined
// );

// const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [account, setAccount] = useState<string | null>(null);

//   useEffect(() => {
//     const loadAccount = async () => {
//       if (typeof window !== "undefined" && window.ethereum) {
//         try {
//           const accounts: string[] = await window.ethereum.request({
//             method: "eth_requestAccounts",
//           });
//           if (accounts.length > 0) setAccount(accounts[0]);

//           // Listen for account changes
//           window.ethereum.on("accountsChanged", (newAccounts: string[]) => {
//             setAccount(newAccounts.length > 0 ? newAccounts[0] : null);
//           });
//         } catch (error) {
//           console.error("User denied MetaMask connection", error);
//         }
//       }
//     };

//     loadAccount();
//   }, []);

//   return (
//     <Web3Context.Provider value={{ account, contract }}>
//       {children}
//     </Web3Context.Provider>
//   );
// };

// export default Web3Provider;
