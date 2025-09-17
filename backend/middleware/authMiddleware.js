import jwt from "jsonwebtoken";

// Main middleware implementation
const middleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// Export the middleware under two names so existing imports work:
// - `authMiddleware` (used in auth routes)
// - `protect` (used in currency routes)
export const authMiddleware = middleware;
export const protect = middleware;

export default middleware;
