'use client';
import { useGlobal } from "@/hooks/useGlobal";
import useWallet from "@/hooks/useWallet";
import { useRouter } from "next/navigation";

export default function CTA() {
  const { connectWallet } = useWallet();
  const router = useRouter(); // Initialize Next.js router
  const { account, setAccount } = useGlobal();

  const handleGetStarted = async () => {
    const account = await connectWallet();
    if (account) {
      console.log("Connected account:123", account);
      setAccount(account);
      console.log("--->....", account);
      router.push("/register"); // Redirect after connection
    }
  };

  return (
    <section className="py-20 bg-blue-600 text-white text-center">
      <h2 className="text-3xl font-bold">Get Started Today</h2>
      <p className="mt-4 text-lg">
        Join thousands of users securing their keys effortlessly.
      </p>
      <div className="mt-6">
        <button
          onClick={handleGetStarted}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Sign Up Free
        </button>
      </div>
    </section>
  );
}
