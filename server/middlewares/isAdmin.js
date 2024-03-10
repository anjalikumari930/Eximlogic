import jwt from "jsonwebtoken";
import { ERROR_MESSAGES } from "../messages/error.js";


//Check if User is an admin, proceed to the next middleware or route handler
export function isAdmin(req, res, next) {
  
  const tokenHeader = req.header("Authorization");

  if (!tokenHeader) {
    return res.status(401).json({ error: "Token Missing" });
  }

  const token = tokenHeader.split(" ")[1];

  try {
    // eslint-disable-next-line no-undef
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role === "admin") {
      next();
    } else {
      res.status(403).json({ error: "access forbiden" });
    }
  } catch (error) {
    res.status(401).json({ error: "invalid Token" });
  }
}
