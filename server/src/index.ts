import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import postRoutes from './routes/posts';
import userRouter from './routes/user';
const app = express();


app.use(express.json());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/users', userRouter);

const CONNECTION_URL = 'mongodb+srv://blog:blog1234@cluster0.dpbwgzd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true } as any)
    .then(() => {
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
       
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message);
    });