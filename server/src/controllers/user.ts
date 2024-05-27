import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { Request, Response } from 'express'; 

const secret = 'test';
export const signin  = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const existsUser = await User.findOne({ email });
        if (!existsUser) return res.status(404).json({ message: "User doesn't exists!" });
        const isPassCorrect = await bcrypt.compare(password, existsUser.password);
        if (!isPassCorrect) return res.status(404).json({ message: "Password is incorrect!" });
        const token = jwt.sign({ email: existsUser.email, id: existsUser._id }, secret, { expiresIn: "1h" } );
        res.status(200).json({ result: existsUser, token});
    }
    catch (error) {
        res.status(404);
    }
}

export const signup  = async (req: Request, res: Response) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existsUser = await User.findOne({ email });
        if (existsUser) return res.status(409).json({ message: "User already exists!" });
        if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match!" });

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
};