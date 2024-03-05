import mongoose from "mongoose";
import PostAdd from "../models/postAdd.js";

export const getPost = async (req, res) => {
    const { page } = req.query;
    try {
        const Limit = 9;
        const startingIndex = (Number(page) - 1) * Limit;
        const total = await PostAdd.countDocuments({});
        const numberOfPages = Math.ceil(total / Limit);
        const postData = await PostAdd.find().sort({ _id: -1 }).limit(Limit).skip(startingIndex);
        res.status(200).json({ data: postData, currentPage: Number(page), numberOfPages: numberOfPages });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
export const getPostById = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await PostAdd.findById(id);
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const addPost = async (req, res) => {
    const body = req.body;
    const newPost = new PostAdd({ ...body, createdAt: new Date().toISOString() });
    if(newPost?.copies && newPost?.images?.length > 0) {
        if(newPost.images.length > newPost?.copies){
            return res.status(401).json({ message: "Number of images should not exceed the number of copies." });
        }
    }
    try {
        const postData = await newPost.save();
        res.status(200).json(postData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that id');
    const updatedPost = await PostAdd.findByIdAndUpdate(_id, post, { new: true });
    res.status(200).json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id');
    await PostAdd.findByIdAndRemove(id);
    res.json('Post deleted Successfully');
}