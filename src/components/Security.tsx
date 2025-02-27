// import Image from "next/image";

// export default function Security() {
//   return (
//     <section className="py-20 bg-gray-100 text-center">
//       <h2 className="text-3xl font-bold">Top-Notch Security</h2>
//       <p className="mt-4 text-lg text-gray-700">Your data is protected with military-grade encryption and zero-knowledge architecture.</p>
//       <div className="mt-8 flex justify-center">
//         <Image src="/images/security.png" alt="Security" width={400} height={300} />
//       </div>
//     </section>
//   );
// }

// ---------------------------------------------

// "use client";
// import { useEffect, useRef } from "react";

// export default function Security() {
//   const images = [
//     "/images/security.png",
//     "/images/security.png",
//     "/images/security.png",
//     "/images/security.png",
//     "/images/security.png",
//   ];

//   // Duplicate images for seamless looping
//   const allImages = [...images, ...images];

//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     let scrollAmount = 0;
//     const speed = 1; // Speed of scrolling

//     const smoothScroll = () => {
//       if (!scrollContainer) return;

//       scrollAmount += speed;
//       scrollContainer.scrollLeft += speed; // Move leftward

//       // Reset scroll position when reaching the middle (to maintain infinite loop)
//       if (scrollAmount >= scrollContainer.scrollWidth / 2) {
//         scrollContainer.scrollLeft = 0;
//         scrollAmount = 0;
//       }

//       requestAnimationFrame(smoothScroll);
//     };

//     const animationFrameId = requestAnimationFrame(smoothScroll);

//     return () => cancelAnimationFrame(animationFrameId);
//   }, []);

//   return (
//     <section className="py-20 bg-gray-100 text-center overflow-hidden">
//       <h2 className="text-4xl font-bold text-blue-600">Top-Notch Security</h2>
//       <p className="mt-4 text-lg text-gray-700">
//         Your data is protected with military-grade encryption and zero-knowledge architecture.
//       </p>

//       {/* Infinite Scroll Container */}
//       <div
//         ref={scrollRef}
//         className="relative w-full max-w-7xl mx-auto mt-8 overflow-hidden flex"
//         style={{ whiteSpace: "nowrap", scrollBehavior: "smooth" }}
//       >
//         <div className="flex items-center">
//           {allImages.map((src, index) => (
//             <div
//               key={index}
//               className="w-64 h-64 mx-2 flex-shrink-0 rounded-lg shadow-lg"
//             >
//               <img src={src} alt={`Security ${index}`} className="w-full h-full object-cover rounded-lg" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// ----------------------------------------------------

// "use client";
// import { useEffect, useRef } from "react";

// export default function Security() {
//   const images = [
//     "/images/security.png",
//     "/images/security.png",
//     "/images/security.png",
//     "/images/security.png",
//     "/images/security.png",
//   ];

//   const scrollRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const scrollContainer = scrollRef.current;
//     if (!scrollContainer) return;

//     let speed = 100; // Adjust speed as needed

//     const smoothScroll = () => {
//       if (!scrollContainer) return;

//       scrollContainer.scrollLeft += speed; // Move leftward

//       // Reset scroll when reaching the end to create an infinite effect
//       if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
//         scrollContainer.scrollLeft = 0;
//       }

//       requestAnimationFrame(smoothScroll);
//     };

//     const animationFrameId = requestAnimationFrame(smoothScroll);

//     return () => cancelAnimationFrame(animationFrameId);
//   }, []);

//   return (
//     <section className="py-20 bg-gray-100 text-center overflow-hidden">
//       <h2 className="text-4xl font-bold text-blue-600">Top-Notch Security</h2>
//       <p className="mt-4 text-lg text-gray-700">
//         Your data is protected with military-grade encryption and zero-knowledge
//         architecture.
//       </p>

//       {/* Infinite Scroll Container */}
//       <div
//         ref={scrollRef}
//         className="relative w-full max-w-7xl mx-auto mt-8 overflow-hidden flex whitespace-nowrap"
//         style={{ scrollBehavior: "smooth" }}
//       >
//         <div className="flex items-center">
//           {images.map((src, index) => (
//             <div
//               key={index}
//               className="w-64 h-64 mx-2 flex-shrink-0 rounded-lg shadow-lg"
//             >
//               <img
//                 src={src}
//                 alt={`Security ${index}`}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             </div>
//           ))}
//         </div>
//         <div className="flex items-center">
//           {images.map((src, index) => (
//             <div
//               key={`duplicate-${index}`}
//               className="w-64 h-64 mx-2 flex-shrink-0 rounded-lg shadow-lg"
//             >
//               <img
//                 src={src}
//                 alt={`Security ${index}`}
//                 className="w-full h-full object-cover rounded-lg"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// -------------------------------------------------


"use client";
import React from "react";

export default function Security() {
  const images = [
    "/images/security.png",
    "/images/security2.png",
    "/images/security3.png",
    "/images/security4.png",
    "/images/security5.png",
  ];

  // Duplicate images for seamless scrolling
  const infiniteImages = [...images, ...images];

  return (
    <section className="py-20 bg-gray-300 text-center overflow-hidden">
      <h2 className="text-4xl font-bold text-blue-600">Top-Notch Security</h2>
      <p className="mt-4 text-lg text-gray-700">
        Your data is protected with military-grade encryption and zero-knowledge architecture.
      </p>

      {/* Infinite Scrolling Container */}
      <div className="relative w-full max-w-7xl mx-auto mt-8 overflow-hidden">
        <div className="carousel">
          {infiniteImages.map((src, index) => (
            <div key={index} className="carousel-item">
              <img src={src} alt={`Security ${index}`} className="w-64 h-64 object-cover rounded-lg shadow-lg" />
            </div>
          ))}
        </div>
      </div>

      {/* CSS for infinite scrolling */}
      <style jsx>{`
        .carousel {
          display: flex;
          width: max-content;
          animation: scroll 15s linear infinite;
        }

        .carousel-item {
          flex: 0 0 auto;
          margin: 0 10px;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
