import { Request, Response } from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage';

export const getPosts = async (req: Request, res: Response) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    }
    catch (error) {
        res.status(404);
    }
}
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



export const updatePost = async (req: Request, res: Response) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send('No post with that id');

    try {
        await PostMessage.findByIdAndDelete(id);
        res.json({ message: 'Post is deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
}
