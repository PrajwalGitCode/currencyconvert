import { useEffect, useState } from "react";

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch available currencies from backend
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/currency/currencies");
        const data = await res.json();
        setCurrencies(Object.keys(data)); // keys like ["USD","EUR","INR"]
      } catch (err) {
        console.error("Error fetching currencies:", err);
      }
    };
    fetchCurrencies();
  }, []);

  const handleConvert = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const token = localStorage.getItem("token"); // user JWT stored at login
      const res = await fetch("http://localhost:5000/api/currency/convert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // protect middleware requires this
        },
        body: JSON.stringify({ from, to, amount }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Conversion failed");
      }

      setResult(data.result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-indigo-400 mb-6 text-center">
          Currency Converter
        </h1>

        <form onSubmit={handleConvert} className="space-y-4">
          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-indigo-400"
              required
            />
          </div>

          {/* From Currency */}
          <div>
            <label className="block text-sm font-medium mb-1">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-indigo-400"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>

          {/* To Currency */}
          <div>
            <label className="block text-sm font-medium mb-1">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-indigo-400"
            >
              {currencies.map((cur) => (
                <option key={cur} value={cur}>
                  {cur}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 text-white py-2 rounded-lg transition duration-200"
          >
            {loading ? "Converting..." : "Convert"}
          </button>
        </form>

        {/* Result */}
        {result !== null && (
          <div className="mt-4 p-3 bg-gray-800 rounded-lg text-center">
            <p className="text-lg">
              {amount} {from} ={" "}
              <span className="text-indigo-400 font-semibold">
                {result} {to}
              </span>
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-800 rounded-lg text-center">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
