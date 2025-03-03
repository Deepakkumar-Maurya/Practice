// import Link from "next/link";

// export default function HeroSection() {
//   return (
//     <header className="bg-blue-600 text-white text-center py-20">
//       <h2 className="text-4xl font-bold">
//         Secure Your Keys, Passwords & Secrets
//       </h2>
//       <p className="mt-4 text-lg">
//         Your ultimate encrypted key storage solution
//       </p>
//       <Link
//         href="/register"
//         className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200"
//       >
//         Get Started
//       </Link>
//     </header>
//   );
// }

"use client"; // Ensure this runs on the client side

import { useRouter } from "next/navigation"; // Import Next.js router
import useWallet from "@/hooks/useWallet";
import { useGlobal } from "@/hooks/useGlobal";


export default function HeroSection() {
  const { connectWallet } = useWallet();
  const router = useRouter(); // Initialize Next.js router
  const { setAccount } = useGlobal();

  const handleGetStarted = async () => {
    const account = await connectWallet();
    if (account) {
      setAccount(account[0]);
      router.push("/register"); // Redirect after connection
    }
  };

  return (
    <header className="bg-blue-600 text-white text-center py-20">
      <h2 className="text-4xl font-bold">
        Keep your keys safe and protected from unauthorized access.
      </h2>
      <p className="mt-4 text-lg">
        Your ultimate encrypted key storage solution
      </p>
      <button
        onClick={handleGetStarted}
        className="mt-6 bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200"
      >
        Get Started
      </button>
    </header>
  );
}
