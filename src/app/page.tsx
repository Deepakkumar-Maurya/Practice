"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Key Node</h1>
          <div className="space-x-6">
            <Link href="#about" className="text-gray-700 hover:text-blue-600">
              About Us
            </Link>
            <Link
              href="#services"
              className="text-gray-700 hover:text-blue-600"
            >
              Services
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600">
              Contact
            </Link>
          </div>
          <Link
            href="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
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

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-16 text-center">
        <h3 className="text-3xl font-bold text-gray-800">
          Why Choose Key Node?
        </h3>
        <p className="mt-4 text-gray-600">
          We provide military-grade encryption to store and manage your
          sensitive information securely.
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <p>© {new Date().getFullYear()} Key Node. All rights reserved.</p>
      </footer>
    </div>
  );
}
