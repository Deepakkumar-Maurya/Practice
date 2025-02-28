"use client";

import React, { createContext, useState } from "react";

// Define the context type
interface Web3ContextType {
    account: string | null;
    setAccount: React.Dispatch<React.SetStateAction<string | null>>;
}

const defaultValues: Web3ContextType = {
    account: null,
    setAccount: () => {},
};

// Create the context with a default value
export const GlobalContext = createContext(defaultValues);

// Web3Provider component
const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [account, setAccount] = useState<string | null>(null);

    return (
        <GlobalContext.Provider value={{ account, setAccount }}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalContextProvider };
