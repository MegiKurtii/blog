import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the document
interface IPost extends Document {
    creator: string;
    title: string;
    description: string;
    tags: string[];
    selectedFile: string;
    createdAt: Date;
}

// Define the schema
const postSchema: Schema<IPost> = new Schema({
    creator: String,
    title: String,
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