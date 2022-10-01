import Users from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await Users.findAll();
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

    } catch (error) {
        res.status(404).json({
            code: 404,
            status: "NOT_FOUND",
            message: "Email user tidak terdaftar"
        })
    }
}