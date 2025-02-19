export default function PasswordTable() {
    return (
      <div className="mt-6 bg-white shadow-md rounded-md p-4">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Website</th>
              <th className="text-left py-2">Username</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-2">github.com</td>
              <td className="py-2">johndoe</td>
              <td className="py-2">
                <button className="text-blue-600 hover:underline mr-3">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
            <tr>
              <td className="py-2">gmail.com</td>
              <td className="py-2">johndoe@gmail.com</td>
              <td className="py-2">
                <button className="text-blue-600 hover:underline mr-3">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  