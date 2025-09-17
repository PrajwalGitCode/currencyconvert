import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      {/* Company Name */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold text-indigo-400 cursor-pointer"
      >
        NebulaConvert
      </h1>

      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-indigo-400 transition">
              Login
            </Link>
            <Link to="/signup" className="hover:text-indigo-400 transition">
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded-lg transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
