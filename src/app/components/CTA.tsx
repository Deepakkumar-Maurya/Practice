import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 bg-blue-600 text-white text-center">
      <h2 className="text-3xl font-bold">Get Started Today</h2>
      <p className="mt-4 text-lg">Join thousands of users securing their passwords effortlessly.</p>
      <div className="mt-6">
        <Link href="/signup" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Sign Up Free
        </Link>
      </div>
    </section>
  );
}
