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
        const isCustomAuth = token?.length && token.length < 500;

        let decodedData: string | JwtPayload | undefined;

        if (token && isCustomAuth) {
            decodedData = jwt.verify(token, secret) as JwtPayload;
            req.userId = decodedData?.id ? String(decodedData.id) : '';
        } else {
            decodedData = jwt.decode(token) as JwtPayload;
            req.userId = decodedData?.sub ? String(decodedData.sub) : '';
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

export default auth;
