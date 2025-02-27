import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 cursor-pointer">Key Node</h1>
        <div className="space-x-6">
          <Link href="#about" className="hidden sm:inline-block text-gray-700 hover:text-blue-600">
            About Us
          </Link>
          <Link href="#services" className="hidden sm:inline-block text-gray-700 hover:text-blue-600">
            Services
          </Link>
          <Link href="#contact" className="hidden sm:inline-block text-gray-700 hover:text-blue-600">
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
  );
}
