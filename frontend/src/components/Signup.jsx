import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../api";  // ✅ fixed import

export default function Signup({ onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const data = await signup({ username, email, password });

      const userData = data.user || data;
      const token = data.token;
      if (token) localStorage.setItem("token", token);
      if (userData) localStorage.setItem("user", JSON.stringify(userData));

      if (onLogin) onLogin(userData, token);
      navigate("/");
    } catch (err) {
      alert(err.message || "Signup failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <form
        onSubmit={handleSignup}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-black/40 focus:outline-none"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-black/40 focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-black/40 focus:outline-none"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
