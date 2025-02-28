"use client";

import { useContext } from "react";
import { GlobalContext } from "../context/Web3Context";

export const useGlobal = () => useContext(GlobalContext);
