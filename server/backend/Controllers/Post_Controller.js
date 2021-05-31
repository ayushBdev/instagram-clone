import express from "express";
import PostSchema from "../Modals/Post_Modal.js";

const router = express.Router();

export const createPosts = async(req,res) => {
    try{
        const { selectedFile, postedBy, uploadDate, userId } = req.body;
        const newPost = await PostSchema.create({ selectedFile, postedBy, uploadDate, userId });
        res.status(200).json(newPost);
    }catch(err) {
        res.status(404).json({message: err.message});
    }
};

export const getPosts = async(req,res) => {
    try{
        const productInfo = await PostSchema.find().sort("-createdAt");
        res.status(200).json(productInfo);
    }catch(err) {
        res.status(404).json({message: err.message});
    }
};

export const getPostsById = async(req,res) => {
    const { id } = req.params;
    try{
        const postInfo = await PostSchema.find({userId: id}).sort("-createdAt");
        res.status(200).json(postInfo);
    }catch(err) {
        res.status(404).json({message: err.message});
    }
};


export const addComment = async(req,res) => {
    const { id } = req.params;
    const { comment, postedBy } = req.body;
    try {
        const update = await PostSchema.findByIdAndUpdate(id, {$push: {comments: {"cmt": comment, "user":postedBy}}});
        res.status(200).json(update);
    }catch(err) {
        res.status(404).json({message: err.message});
    }
};

export const addLike = async(req,res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const data = await PostSchema.find({like: userId});
        if(data.length !== 0) {
            res.status(404).json({msg: "Action already done by user"});
        } else {
            const update = await PostSchema.findByIdAndUpdate(id, {$push: {like: userId}});
            res.status(200).json(update);
        }
    }catch(err) {
        res.status(404).json({message: err.message});
    }
};

export default router;