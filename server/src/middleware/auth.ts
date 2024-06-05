import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const secret = 'test';

// Define an interface extending Request to include userId property
interface AuthRequest extends Request {
    userId?: string;
}

// Middleware function for authentication
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

        next(); // Call next to proceed to the next middleware or route handler
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Unauthorized' }); // Respond with 401 Unauthorized if authentication fails
    }
};

export default auth;
