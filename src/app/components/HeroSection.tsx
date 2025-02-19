import Link from "next/link";

export default function HeroSection() {
  return (
    <header className="bg-blue-600 text-white text-center py-20">
      <h2 className="text-4xl font-bold">
        Secure Your Keys, Passwords & Secrets
      </h2>
      <p className="mt-4 text-lg">
        Your ultimate encrypted key storage solution
      </p>
      <Link
        href="/register"
        className="mt-6 inline-block bg-white text-blue-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-200"
      >
        Get Started
      </Link>
    </header>
  );
}
