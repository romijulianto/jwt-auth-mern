import jwt from "jsonwebtoken";

/* initiate middleware with 3 parameter, req, res, nextroute */
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    /* initate token */
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        return res.status(400).json({
            code: 401,
            status: "UNAUTHORIZED"
        })
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({
                    code: 403,
                    status: "FORBIDDEN"
                })
            } else {
                req.email = decoded.email;
                next();
            }
        } )
    }
}