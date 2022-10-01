import Users from "../models/user.model.js";
import jwt from "jsonwebtoken";

/* create method/function refreshToken from cookie browser */
export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        /* conditional check refreshToken*/
        if (!refreshToken) {
            return res.status(401).json({
                code: 401,
                status: "UNAUTHORIZED"
            })
        } else { // compare token with database
            const user = await Users.findAll({
                where: {
                    refresh_token: refreshToken
                }
            });
            /* condition to check if not match refresh_token */
            if (!user[0]) {
                return res.status(403).json({
                    code: 403,
                    status: "FORBIDDEN"
                });
            } else { // if refreshToken = refresh_token from db
                /* verify token using jwt */
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) => {
                    /* if not verified */
                    if (err) {
                        return res.status(403).json({
                            code: 403,
                            status: "UNAUTHORIZED"
                        })
                    } else { // call user from Users
                        const userId = user[0].id;
                        const name = user[0].name;
                        const email = user[0].email;

                        /* create new accestoken */
                        const accestoken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                            expiresIn: '15s'
                        });
                        /* send accesToken to client */
                        res.json({ accestoken });
                    }
                });
            }
        }
    } catch (error) {
        
    }
}