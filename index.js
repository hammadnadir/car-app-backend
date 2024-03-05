import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postRouter from "./Routes/post.js";
import userRoutes from "./Routes/user.js";
import dotenv from 'dotenv';

dotenv.config()
const app = express();

// PORT

const PORT = process.env.PORT || 5000;

// APP MIDDLEWARES

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: "true" })); // optional
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" })); // optional

// ROUTES
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Our Car app!' });
});
app.use('/post', postRouter);
app.use('/user', userRoutes);

// CONNNECTING DATABASE

const CONNECTION_URL = process.env.MONGO_URI

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Connected to Db and port ${PORT}`)))
    .catch((err) => console.log(err.message));

