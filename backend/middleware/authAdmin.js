import jwt from 'jsonwebtoken';

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const {atoken} = req.headers; // Bearer <token>
        if (!atoken) {
            return res.status(401).json({ message: "Authentication failed: No token provided" });
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ message: "Authentication failed: Invalid token" });
        }
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ message: "Authentication failed: Invalid token" });
    }
};


export default authAdmin;