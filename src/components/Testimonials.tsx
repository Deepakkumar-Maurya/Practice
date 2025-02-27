const testimonials = [
    { name: "Alice Johnson", review: "This password manager is a game-changer! I feel so secure." },
    { name: "Mark Williams", review: "Easy to use and incredibly reliable. Highly recommend!" },
    { name: "Sophia Brown", review: "No more forgetting secret keys! Love the autofill feature." },
];

export default function Testimonials() {
    return (
        <section className="py-20 text-center">
            <h2 className="text-3xl font-bold">What Our Users Say</h2>
            <div className="mt-8 flex flex-col md:flex-row justify-center items-center gap-8">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="p-6 bg-white shadow-lg rounded-lg w-72">
                        <p className="text-gray-600">&quot;{testimonial.review}&quot;</p>
                        <h3 className="text-xl font-semibold mt-4">{testimonial.name}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
