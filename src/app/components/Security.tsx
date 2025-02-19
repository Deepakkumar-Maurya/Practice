import Image from "next/image";

export default function Security() {
  return (
    <section className="py-20 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold">Top-Notch Security</h2>
      <p className="mt-4 text-lg text-gray-700">Your data is protected with military-grade encryption and zero-knowledge architecture.</p>
      <div className="mt-8 flex justify-center">
        <Image src="/security.png" alt="Security" width={400} height={300} />
      </div>
    </section>
  );
}
