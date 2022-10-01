import Users from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            // set custom attribute to show
            attributes:['id', 'name', 'email']
        });
        res.status(200).json({
            code: 200,
            status: "OK",
            messange: "Data User berhasil ditemukan",
            datas: users
        });
    } catch (error) {
        console.log(error);
    }
}

/* create variable register */
export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    /* conditional cheked password */
    if (password !== confPassword)
        return res.status(400).json({
            code: 400,
            status: "BAD_REQUEST",
            messange: "Password and Confirm Password doesn't match"
        })
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({
            code: 200,
            status: "OK",
            message: "Berhasil Register"
        });
    } catch (error) {
        console.log(error);
    }
};

/* cretae method/function Login */
export const Login = async (req, res) => {
    try {
        /* initiate findUser = email in database */
        /* if email exist */
        const user = await Users.findAll({
            where: {
                email: req.body.email
            }
        });
        /* if password match */
        const passMatch = await bcrypt.compare(req.body.password, user[0].password);
        if (!passMatch) {
            return res.status(400).json({
                code: 400,
                status: "BAD_REQUEST",
                message: "Password yang Anda masukan salah"
            });
        } else {
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20s'
            });
            const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
                expiresIn: '1d'
            });

            /* update refreshToken based userId */
            await Users.update({ refresh_token: refreshToken }, {
                where: {
                    id: userId
                }
            });

            /* create httponly cookie */
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
                // secure: true // if using https
            })

            /* send to client refreshToken */
            res.status(200).json({
                code: 200,
                status: "OK",
                access_token: accessToken
            });
        }
    } catch (error) {
        res.status(404).json({
            code: 404,
            status: "NOT_FOUND",
            message: "Email user tidak terdaftar"
        })
    }
}