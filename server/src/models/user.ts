import mongoose, { Schema, Document } from 'mongoose';


interface IUser extends Document {
    name: string;
    lastName: string;
    email: string;
    password: string;
    id?: string;
}


const userSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true }, 
    email: { type: String, required: true }, 
    password: { type: String, required: true }, 
    id: String
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;