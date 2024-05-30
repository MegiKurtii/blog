import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/Users'; // Assuming you have a secret key stored in a config file

const secret = 'test';
export const signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        User.findOne({ email: email })
            .then(User => {
                if (User) {
                    if (User.password === password) {
                        res.json("Success");
                    } else {
                        res.json("the password is incorrect");
                    }
                } else {
                    res.json("no record exists");
                }
            });
    } catch (error) {
        
        res.status(500).json({ message: "Server Error" });
    }
};
   

    export const signup = async (req: Request, res: Response) => {

        User.create(req.body)
            .then(users => res.json(users))
            .catch(err => res.json(err))

    }

  