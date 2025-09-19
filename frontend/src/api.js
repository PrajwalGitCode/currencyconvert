const API_URL = "http://localhost:5000/api";

export const login = async (credentials) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const signup = async (data) => {
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
};

export const fetchCurrencies = async () => {
  const res = await fetch(`${API_URL}/currency/currencies`);
  if (!res.ok) throw new Error("Failed to fetch currencies");
  return res.json();
};

export const convertCurrency = async ({ from, to, amount, token }) => {
  const res = await fetch(`${API_URL}/currency/convert`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ from, to, amount }),
  });
  if (!res.ok) throw new Error("Conversion failed");
  return res.json();
};
