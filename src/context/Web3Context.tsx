"use client";

import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/app-constant/constant";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import Web3 from "web3";

// Define the context type
interface Web3ContextType {
  account: string | null;
  setAccount: React.Dispatch<React.SetStateAction<string | null>>;
  nationalId: string | null;
  setNationalId: React.Dispatch<React.SetStateAction<string | null>>;
  passKey: string | null;
  setPassKey: React.Dispatch<React.SetStateAction<string | null>>;
  storedPhrases: { name: string; phrase: string[] }[];
  setStoredPhrases: Dispatch<
    SetStateAction<{ name: string; phrase: string[] }[]>
  >;
  fetchStoredKeys: () => Promise<void>;
//   accountDetails: { name: string; nationalId: string; secretHash: string; phone: string; address: string; };
//   setAccountDetails: Dispatch<SetStateAction<{ name: string; nationalId: string; secretHash: string; phone: string; address: string; }>>;
}

// Default values for the context
const defaultValues: Web3ContextType = {
  account: null,
  setAccount: () => {},
  nationalId: null,
  setNationalId: () => {},
  passKey: null,
  setPassKey: () => {},
  storedPhrases: [],
  setStoredPhrases: () => {},
  fetchStoredKeys: async () => {},
//   accountDetails: { name: "", nationalId: "", secretHash: "", phone: "", address: "" },
//   setAccountDetails: () => {},
};

// Create the context with default values
export const GlobalContext = createContext<Web3ContextType>(defaultValues);

// Web3Provider component
const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState<string | null>(() =>
    localStorage.getItem("account")
  );
  const [nationalId, setNationalId] = useState<string | null>(() =>
    localStorage.getItem("nationalId")
  );
  const [passKey, setPassKey] = useState<string | null>(() =>
    localStorage.getItem("passKey")
  );
  const [storedPhrases, setStoredPhrases] = useState<
    { name: string; phrase: string[] }[]
  >(() => {
    const savedPhrases = localStorage.getItem("storedPhrases");
    return savedPhrases ? JSON.parse(savedPhrases) : [];
  });
//   const [accountDetails, setAccountDetails] = useState<{ name: string; nationalId: string; secretHash: string; phone: string; address: string; }>(() => {
//     const savedDetails = localStorage.getItem("accountDetails");
//     return savedDetails ? JSON.parse(savedDetails) : { name: "", nationalId: "", secretHash: "", phone: "", address: "" };
//   });

  // Save state to localStorage on changes
  useEffect(() => {
    if (account) localStorage.setItem("account", account);
    if (nationalId) localStorage.setItem("nationalId", nationalId);
    if (passKey) localStorage.setItem("passKey", passKey);
    localStorage.setItem("storedPhrases", JSON.stringify(storedPhrases));
  }, [account, nationalId, passKey, storedPhrases]);

  // Fetch stored keys from contract
  const fetchStoredKeys = useCallback(async () => {
    if (!account || !nationalId || !passKey) {
      console.warn("Missing required data for fetchStoredKeys.");
      return;
    }

    // if (!(window as any).contract) {
    //     console.warn("Contract instance not found.");
    //     return;
    // }

    try {
      window.web3 = new Web3(window.ethereum);
      window.contract = new window.web3.eth.Contract(
        CONTRACT_ABI,
        CONTRACT_ADDRESS
      );
      const storedKeys = await window.contract.methods
        .getStoredPasswords(nationalId, passKey)
        .call({ from: account });

      console.log("Fetched Stored Keys:", storedKeys);
      const parsedKeys = storedKeys.map((key: string) => JSON.parse(key));
      console.log("Parsed Stored Keys:", parsedKeys);

      // Convert storedKeys into required format
      //   const updatedPhrases = storedKeys.map((key: string, index: number) => ({
      //     name: `Stored Backup ${index + 1}`,
      //     phrase: key.split(" "), // Assuming keys are space-separated
      //   }));

      setStoredPhrases(parsedKeys);
    } catch (error) {
      console.error("Error fetching stored keys:", error);
    }
  }, [account, nationalId, passKey]);

  return (
    <GlobalContext.Provider
      value={{
        account,
        setAccount,
        nationalId,
        setNationalId,
        passKey,
        setPassKey,
        storedPhrases,
        setStoredPhrases,
        fetchStoredKeys,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContextProvider };
