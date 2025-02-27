const features = [
    { icon: "🔐", title: "End-to-End Encryption", description: "Your keys are securely stored using AES-256 encryption." },
    { icon: "⚡", title: "Easy Access", description: "Access your keys from anywhere, on any device." },
    { icon: "📱", title: "Multi-Device Sync", description: "Seamlessly sync your data across desktop and mobile." },
    { icon: "🔑", title: "One-Click Autofill", description: "Securely autofill keys with one click." },
  ];
  
  export default function Features() {
    return (
      <section id="services" className="py-20 bg-gray-200 text-center">
        <h2 className="text-3xl font-bold">Why Choose Our Key Manager?</h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto px-6">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-lg">
              <span className="text-5xl">{feature.icon}</span>
              <h3 className="text-xl font-semibold mt-4">{feature.title}</h3>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  