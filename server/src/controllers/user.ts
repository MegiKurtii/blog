import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users';
import mongoose from 'mongoose';

const secret = 'test';

export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: oldUser, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const signup = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = await User.findOne({ email });

        if (oldUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "1h" });

        res.status(201).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });

        console.log(error);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, oldPassword, newPassword, firstName, lastName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    try {
        const user = await User.findById(id);

        if (!user) return res.status(404).send(`No user with id: ${id}`);

        const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid old password" });

        let updatedFields: any = { email, name: `${firstName} ${lastName}` };

        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 12);
            updatedFields.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updatedFields, { new: true });

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
};
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);

    await User.findByIdAndDelete(id);

    res.json({ message: "User deleted successfully." });
}
