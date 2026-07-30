import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_AUTH_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Admin access required" });
    }
};