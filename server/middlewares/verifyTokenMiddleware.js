import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const authorize = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;

    // No token → Not authorized
    if (!authToken || !authToken.startsWith("Bearer")) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Unauthorized access, token missing",
        });
    }

    // Extract actual token
    const token = authToken.split(" ")[1];

    let decoded;
    try {
      // Verify token with secret
      decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired, please login again",
        });
      }
      return res
        .status(401)
        .json({
          success: false,
          message: "Invalid token, authorization failed",
        });
    }

    // We trust the ID from token, but fetch fresh role/name from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User no longer exists" });
    }
    // Attach full user object (cleaner & more powerful)
    req.user = {
      id: user._id,
      role: user.role,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    if(error.name === "TokenExpiredError"){
        return res.status(401).json({success: false, message: "Token expired, please login again"})
    } else {
        return res.status(401).json({success: false, message: "Invalid token, authorization failed"})
    }
 }
}

// Middleware for Admin-only access
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
};
