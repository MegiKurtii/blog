import { Request, Response } from 'express';
import PostMessage from '../models/postMessage';

export const createPost = async (req: Request, res: Response) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(404);
    }
}

export const getPosts = async (req: Request, res: Response) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    }
    catch (error) {
        res.status(404);
    }
}

export const updatePost = async (req: Request, res: Response) => {
    res.send('HEY!');
}

