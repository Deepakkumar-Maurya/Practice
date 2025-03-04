"use client";

import React, { createContext, Dispatch, SetStateAction, useCallback, useState } from "react";

// Define the context type
interface Web3ContextType {
    account: string | null;
    setAccount: React.Dispatch<React.SetStateAction<string | null>>;
    nationalId: string | null;
    setNationalId: React.Dispatch<React.SetStateAction<string | null>>;
    passKey: string | null;
    setPassKey: React.Dispatch<React.SetStateAction<string | null>>;
    storedPhrases: { name: string; phrase: string[] }[];
    setStoredPhrases: Dispatch<SetStateAction<{ name: string; phrase: string[] }[]>>;
    fetchStoredKeys: () => Promise<void>;
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
};

// Create the context with default values
export const GlobalContext = createContext<Web3ContextType>(defaultValues);

// Web3Provider component
const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [account, setAccount] = useState<string | null>(null);
    const [nationalId, setNationalId] = useState<string | null>(null);
    const [passKey, setPassKey] = useState<string | null>(null);
    const [storedPhrases, setStoredPhrases] = useState<{ name: string; phrase: string[] }[]>([]);

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
            const storedKeys = await window.contract.methods
                .fetchPasswords(nationalId, passKey)
                .call({ from: account });

            console.log("Fetched Stored Keys:", storedKeys);
            storedKeys.json();

            // Convert storedKeys into required format
            const updatedPhrases = storedKeys.map((key: string, index: number) => ({
                name: `Stored Backup ${index + 1}`,
                phrase: key.split(" "), // Assuming keys are space-separated
            }));

            setStoredPhrases(updatedPhrases);
        } catch (error) {
            console.error("Error fetching stored keys:", error);
        }
    }, [account, nationalId, passKey]);

    return (
        <GlobalContext.Provider value={{
            account,
            setAccount,
            nationalId,
            setNationalId,
            passKey,
            setPassKey,
            storedPhrases,
            setStoredPhrases,
            fetchStoredKeys,
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContextProvider };
