import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = 'test';
interface AuthRequest extends Request {
    userId?: string;
}

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new Error('Authorization header not found');
        }

        const token = authorizationHeader.split(" ")[1];
        const isCustomAuth = token.length < 500;

        let decodedData: string | JwtPayload; // Define the type of decodedData

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test') as JwtPayload; // Type assertion
        } else {
            decodedData = jwt.decode(token) as JwtPayload; // Type assertion
        }

        if (typeof decodedData === 'string') {
            // Handle the case where decodedData is a string
            throw new Error('Invalid token');
        } else {
            req.userId = decodedData.id as string; // Type assertion
        }

        next();
    }
    catch (error) {
        console.log(error);
    }
}

export default auth;