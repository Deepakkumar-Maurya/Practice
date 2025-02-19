export default function SearchBar() {
    return (
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search passwords..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-blue-300"
        />
      </div>
    );
  }
  