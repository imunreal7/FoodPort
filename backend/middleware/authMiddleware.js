const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    // Expecting "Authorization: Bearer <token>"
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ msg: "Token format is 'Bearer <token>'" });
    }

    const token = parts[1]; // Extract just the raw JWT

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // e.g. { userId: '...' }
        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
};
