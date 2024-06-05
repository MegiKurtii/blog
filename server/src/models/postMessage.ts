import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the document
interface IPost extends Document {
    title: string;
    name: string;
    description: string;
    tags: string[];
    selectedFile: string;
    createdAt: Date;
    creator: String;
    likes: string[];
    comments: string[];
}

// Define the schema
const postSchema: Schema<IPost> = new Schema({
    title: String,
    creator: String,
    name: String,
    description: String,
    tags: [String],
    selectedFile: String,
    likes: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

// Create the model
const PostMessage = mongoose.model<IPost>('PostMessage', postSchema);

export default PostMessage;