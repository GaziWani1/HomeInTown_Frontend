import Link from "next/link";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Authenticate
        </h2>

        <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3 mb-6">
          <input
            type="tel"
            placeholder="Enter mobile number"
            className="w-full bg-gray-100 focus:outline-none text-sm"
          />
        </div>

        <Link
          href="../main/map"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium p-3 rounded transition"
        >
          Authenticate
        </Link>
      </div>
    </div>
  );
}
