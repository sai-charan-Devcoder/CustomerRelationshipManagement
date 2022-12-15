
import JWT from "jsonwebtoken";

/* Middleware verify exisiting user by JWT */
export const verifyUser = (req, res, next) => {
    if (!req.headers["authorization"]) {
        return res.status(404).json({ msg: "unauthorized" });
    }
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
            console.log(err);
        }
        req.payload = payload;
        next();
    })
}