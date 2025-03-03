// export default function PasswordTable() {
//     return (
//       <div className="mt-6 bg-white shadow-md rounded-md p-4">
//         <table className="w-full">
//           <thead>
//             <tr className="border-b">
//               <th className="text-left py-2">Website</th>
//               <th className="text-left py-2">Username</th>
//               <th className="text-left py-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr className="border-b">
//               <td className="py-2">github.com</td>
//               <td className="py-2">johndoe</td>
//               <td className="py-2">
//                 <button className="text-blue-600 hover:underline mr-3">Edit</button>
//                 <button className="text-red-600 hover:underline">Delete</button>
//               </td>
//             </tr>
//             <tr>
//               <td className="py-2">gmail.com</td>
//               <td className="py-2">johndoe@gmail.com</td>
//               <td className="py-2">
//                 <button className="text-blue-600 hover:underline mr-3">Edit</button>
//                 <button className="text-red-600 hover:underline">Delete</button>
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     );
//   }

// ----------------------------------


// "use client";
// import { useState } from "react";

// export default function RecoveryPhraseTable() {
//   // Example Secret Recovery Phrase (BIP-39 words)
//   const recoveryPhrase = [
//     "pioneer", "volcano", "globe", "jaguar", "midnight", "whisper",
//     "orchard", "tornado", "yellow", "moment", "wisdom", "galaxy"
//   ];

//   // State to toggle visibility
//   const [isVisible, setIsVisible] = useState(false);

//   return (
//     <div className="mt-6 bg-white shadow-md rounded-md p-6 max-w-lg mx-auto">
//       <h2 className="text-xl font-semibold text-center text-gray-800">
//         🔑 Secret Recovery Phrase
//       </h2>
//       <p className="text-sm text-red-600 text-center mt-2">
//         ⚠ Never share this phrase. Anyone with this can access your wallet!
//       </p>

//       {/* Toggle Button */}
//       <div className="flex justify-center mt-4">
//         <button
//           className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md"
//           onClick={() => setIsVisible(!isVisible)}
//         >
//           {isVisible ? "🔒 Hide" : "🔓 Reveal"}
//         </button>
//       </div>

//       {/* Secret Phrase Table */}
//       {isVisible && (
//         <table className="w-full mt-4 border-collapse border border-gray-300">
//           <tbody>
//             {recoveryPhrase.map((word, index) => (
//               <tr key={index} className="border-b border-gray-200">
//                 <td className="py-2 px-4 font-semibold">{index + 1}.</td>
//                 <td className="py-2 px-4 font-mono text-lg bg-gray-100 rounded-md">
//                   {word}
//                 </td>
//                 <td className="py-2 px-4">
//                   <button
//                     className="text-blue-600 hover:underline text-sm"
//                     onClick={() => navigator.clipboard.writeText(word)}
//                   >
//                     📋 Copy
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Security Note */}
//       <p className="text-gray-600 text-sm mt-4 text-center">
//         Store this phrase securely offline. Do not share it with anyone.
//       </p>
//     </div>
//   );
// }


// -----------------------------


"use client";

import { useGlobal } from "@/hooks/useGlobal";
import { useState } from "react";

export default function RecoveryPhraseList() {
  const { account, nationalId, passKey } = useGlobal();

  const fetchStoredKeys = async () => {
    try {
      const storedKeys = await window.contract.methods.fetchPasswords(nationalId, passKey).call({from : account});
      console.log("Stored Keys:", storedKeys);
    } catch (error) {
      console.error("Error fetching stored keys:", error);
    }
  };

  const storedPhrases = [
    {
      name: "Wallet Backup 1",
      phrase: ["pioneer", "volcano", "globe", "jaguar", "midnight", "whisper", "orchard", "tornado", "yellow", "moment", "wisdom", "galaxy"]
    },
    {
      name: "MetaMask Wallet",
      phrase: ["apple", "sunset", "river", "cosmic", "energy", "vortex", "horizon", "nebula", "forest", "twilight", "storm", "harmony"]
    }
  ];

  const [selectedPhrase, setSelectedPhrase] = useState<string[] | null>(null);

  return (
    <div className="max-w-full mx-auto mt-6 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">🔐 Stored Secret Phrases</h2>

      {/* List of Stored Phrases */}
      <div className="mt-4 space-y-4">
        {storedPhrases.map((item, index) => (
          <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-md">
            <span className="text-lg font-medium text-gray-700">{item.name}</span>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => setSelectedPhrase(item.phrase)}
            >
              Show
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPhrase && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
          onClick={() => setSelectedPhrase(null)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full"
            onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
          >
            <h3 className="text-xl font-semibold text-gray-800 text-center">🔑 Secret Recovery Phrase</h3>
            <p className="text-sm text-red-600 text-center mt-2">⚠ Never share this phrase!</p>

            {/* Secret Phrase */}
            <div className="mt-4 grid grid-cols-3 gap-2 bg-gray-100 p-4 rounded-md">
              {selectedPhrase.map((word, index) => (
                <span key={index} className="text-gray-900 font-mono text-lg bg-white p-2 rounded-md shadow-sm text-center">
                  {index + 1}. {word}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                onClick={() => setSelectedPhrase(null)}
              >
                Hide
              </button>
              <button
                className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800"
                onClick={() => navigator.clipboard.writeText(selectedPhrase.join(" "))}
              >
                📋 Copy Phrase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
