// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { useGlobal } from "@/hooks/useGlobal";

// export default function Login() {
//   const [formData, setFormData] = useState({ nationalId: "", passkey: "" });
//   const [displayedNationalId, setDisplayedNationalId] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { account, setNationalId, setPassKey } = useGlobal();
//   const router = useRouter();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let rawValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

//     if (rawValue.length > 12) {
//       rawValue = rawValue.slice(0, 12); // Limit input to 12 digits
//     }

//     // Format value with spaces for UI display
//     const formattedValue = rawValue.replace(/(.{4})/g, "$1 ").trim();

//     setFormData({ ...formData, nationalId: rawValue }); // Store only numeric value
//     setDisplayedNationalId(formattedValue); // Store formatted value for UI display
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       setNationalId(formData.nationalId);
//       setPassKey(formData.passkey);
//       const result = await window.contract.methods.login(formData.nationalId, formData.passkey).send({from : account});
//       console.log(result);
//       console.log("Logged in account:", account);

//       alert("Login successful!");
//       router.push("/dashboard"); // Redirect after login
//     } catch (error: any) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">Login</h2>

//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//           <label htmlFor="nationalId">National ID</label>
//           <input
//             type="text" // Keeping text type to allow formatting
//             name="nationalId"
//             placeholder="National ID"
//             value={displayedNationalId}
//             onChange={handleChange}
//             inputMode="numeric" // Helps on mobile to show numeric keypad
//             pattern="\d*" // Ensures only numbers are entered
//             maxLength={14} // 12 digits + 2 spaces for display
//             required
//             className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <label htmlFor="passkey">Passkey</label>
//           <input
//             type="password"
//             name="passkey"
//             placeholder="Enter Passkey"
//             value={formData.passkey}
//             onChange={handleChange}
//             required
//             className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <button
//             type="submit"
//             className="bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="text-sm text-gray-600 text-center mt-4">
//           Don't have an account?{" "}
//           <Link href="/register" className="text-blue-600 hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// ------------------- new code ------

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGlobal } from "@/hooks/useGlobal";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/app-constant/constant";
import Web3 from "web3";
import {
  startRegistration,
  browserSupportsWebAuthn,
} from "@simplewebauthn/browser";

export default function Login() {
  const { account, setNationalId, setPassKey } = useGlobal();
  const [formData, setFormData] = useState({ nationalId: "", passkey: "" });
  const [displayedNationalId, setDisplayedNationalId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  window.web3 = new Web3(window.ethereum);
  window.contract = new window.web3.eth.Contract(
    CONTRACT_ABI,
    CONTRACT_ADDRESS
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/\D/g, "");

    if (rawValue.length > 12) {
      rawValue = rawValue.slice(0, 12);
    }

    const formattedValue = rawValue.replace(/(.{4})/g, "$1 ").trim();

    setFormData({ ...formData, nationalId: rawValue });
    setDisplayedNationalId(formattedValue);
  };

  const handleWebAuthnRegister = async () => {
    if (!browserSupportsWebAuthn()) {
      setError("Your browser does not support WebAuthn.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      // Fetch registration options from your backend (Replace with actual API call)
      const response = await fetch("/api/auth/register-challenge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nationalId: formData.nationalId }),
      });
      const challengeResult = await response.json();

      const { options } = challengeResult;
      console.log("===>options", options);

      // Start WebAuthn registration
      const attestationResponse = await startRegistration({ ...options });
      console.log(
        "====>attestationResponse",
        attestationResponse.response.publicKey
      );

      // Send the response back to your backend for verification
      // const verificationResponse = await fetch("/api/auth/register-verify", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     attestationResponse,
      //     nationalId: formData.nationalId,
      //   }),
      // });
      // const verificationResult = await verificationResponse.json();

      // if (verificationResult.success) {
        // setPassKey(verificationResult.credentialId);
        setPassKey('123456'); // NOTE : will remove in future
        setNationalId(formData.nationalId);

        // Register on blockchain
        const result = await window.contract.methods
          .login(
            formData.nationalId,
            "123456"
          )
          .send({ from: account });
        console.log('resulttttt',result);
        alert("Login successful!");
        router.push("/dashboard");
      // } else {
      //   setError("WebAuthn registration failed.");
      // }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-100 justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl text-blue-600 text-center font-bold mb-4">
          Login
        </h2>

        {error && <p className="text-center text-red-500 text-sm">{error}</p>}

        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col gap-4"
        >
          <label htmlFor="nationalId">National ID</label>
          <input
            type="text"
            name="nationalId"
            placeholder="National ID"
            value={displayedNationalId}
            onChange={handleChange}
            inputMode="numeric"
            pattern="\d*"
            maxLength={14}
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            className="bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700 py-2 transition"
            disabled={loading}
            onClick={handleWebAuthnRegister}
          >
            {loading ? "Signing Up..." : "Register with Passkey"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
