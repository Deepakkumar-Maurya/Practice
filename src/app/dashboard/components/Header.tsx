import LogoutButton from "./LogoutButton";

export default function Header() {
    return (
      <header className="bg-white shadow-md p-4 mb-4 flex justify-between">
        <h2 className="text-2xl font-bold text-gray-800">My Stored Keys</h2>
        <LogoutButton />
      </header>
    );
  }
  