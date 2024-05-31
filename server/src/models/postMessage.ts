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
}

// Define the schema
const postSchema: Schema<IPost> = new Schema({
    title: String,
    creator: String,
    name: String,
    description: String,
    tags: [String],
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

// Create the model
const PostMessage = mongoose.model<IPost>('PostMessage', postSchema);

export default PostMessage;