import { Request, Response } from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage';

interface AuthRequest extends Request {
    userId?: string;
}

export const getPosts = async (req: Request, res: Response) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: "Failed to fetch posts." });
    }
}

export const getPostBySearch = async (req: Request, res: Response) => {
    const { searchQuery, tags } = req.query;

    if (!searchQuery || !tags) {
        return res.status(400).json({ message: "searchQuery and tags are required." });
    }

    try {
        const title = new RegExp(searchQuery as string, 'i');

        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: (tags as string).split(',') } }] })
        res.json({ data: posts });
    }
    catch (error) {
        console.error(error);
        res.status(404).json({ message: "Failed to fetch posts." });
    }
}

export const getPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: "Failed to fetch posts." });
    }
}

export const createPost = async (req: AuthRequest, res: Response) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        console.error(error);
    }
}



export const updatePost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, description, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await PostMessage.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully." });
}

