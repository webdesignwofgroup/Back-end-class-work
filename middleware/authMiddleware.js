import jwt from "jsonwebtoken";
import user from "../Model/usermodel.js"

export const protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            req.user = await user.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, invalid failed" });
        }
    }
    if (!token) {
       return res.status(401).json({ message: "Not authorized, no token" });
    }
};