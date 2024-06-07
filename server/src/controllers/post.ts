import { Request, Response } from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage';

interface AuthRequest extends Request {
    userId?: string;
}

export const getPosts = async (req: Request, res: Response) => {
    const { page } = req.query;
    const LIMIT = 9; // Number of posts per page
    let pageNumber = Number(page) || 1;

    try {
        const total = await PostMessage.countDocuments({});
        const totalPages = Math.ceil(total / LIMIT);

        if (pageNumber < 1) {
            pageNumber = 1;
        } else if (pageNumber > totalPages) {
            pageNumber = totalPages;
        }

        const startIndex = (pageNumber - 1) * LIMIT;

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: pageNumber, totalPages: totalPages });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};


export const getPostsBySearch = async (req: Request, res: Response): Promise<void> => {
    const { searchQuery, tags, name, description } = req.query as { searchQuery?: string; tags?: string; name?: string; description?: string};

    try {
        const titleRegex = searchQuery ? new RegExp(searchQuery, 'i') : undefined;
        const nameRegex = name ? new RegExp(name, 'i') : undefined;
        const tagArray = tags ? tags.split(',').map(tag => new RegExp(tag.trim(), 'i')) : [];
        const descriptionRegex = description ? new RegExp(description, 'i') : undefined;

        const query = {
            $or: [
                ...(titleRegex ? [{ title: titleRegex }] : []),
                ...(descriptionRegex ? [{ description: descriptionRegex }] : []),
                ...(nameRegex ? [{ name: nameRegex }] : []),
                ...(tagArray.length > 0 ? [{ tags: { $in: tagArray } }] : [])
            ]
        };

        const posts = await PostMessage.find(query);

        res.json({ data: posts });
    } catch (error) {
        console.error('Failed to fetch posts:', error);
        res.status(404).json({ message: "Failed to fetch posts." });
    }
};

export const getPost = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        console.log(error);
    }
}

export const createPost = async (req: AuthRequest, res: Response) => {
    const post = req.body;

    const newPostMessage = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        console.log(error);;
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

export const likePost = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    // Retrieve post
    const post = await PostMessage.findById(id);

    // Check if post exists
    if (!post) {
        return res.status(404).send(`No post found with id: ${id}`);
    }

    // Update likes
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    // Save updated post
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}


export const commentPost = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { value } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const post = await PostMessage.findById(id);

    if (!post) {
        return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    res.json(updatedPost);
};


