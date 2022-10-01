import Users from "../models/user.model.js";
import bcrypt from "bcrypt";

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