const steps = [
    { title: "Sign Up", description: "Create a free account in seconds." },
    { title: "Save Passwords", description: "Securely store and organize your passwords." },
    { title: "Autofill & Access", description: "Quickly access your stored credentials anytime, anywhere." },
  ];
  
  export default function HowItWorks() {
    return (
      <section className="py-20 text-center">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <div className="mt-8 flex flex-col md:flex-row justify-center gap-8">
          {steps.map((step, index) => (
            <div key={index} className="p-6 bg-blue-100 rounded-lg shadow-md w-64">
              <h3 className="text-xl font-semibold">{index + 1}. {step.title}</h3>
              <p className="text-gray-600 mt-2">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  