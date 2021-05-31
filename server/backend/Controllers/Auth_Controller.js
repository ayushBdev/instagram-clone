import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthUsers from "../Modals/Auth_Modal.js";

const secret = "test";

export const signin = async(req,res) => {
    const { email, password } = req.body;
    try {
        const oldUser = await AuthUsers.findOne({email});
        if(!oldUser) return res.status(404).json({message: "User Does not exists"});
        
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message: "Incorrect Credentials"});

        const token = jwt.sign({email: oldUser.email, id:oldUser._id}, secret, {expiresIn: "1h"});

        res.status(200).json({result: oldUser, token}).select(['-password']);

    }catch(error) {
        res.status(404).json({message: "Something went wrong Errored!!"});
        console.log(error);
    }
};

export const signup = async(req,res) => {
    const { name, email, password, createdAt, status } = req.body;
    try {
        const oldUser = await AuthUsers.findOne({email});
        if(oldUser) return res.status(400).json({message: "User Already Exists"});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await AuthUsers.create({email: email, password: hashedPassword, name: name, createdAt: createdAt, status: status});

        const token = jwt.sign({ email: result.email, id: result._id}, secret, {expiresIn: "1h"});
        res.status(200).json({result,token}).select(['-password']);
    }catch(error) {
        res.status(404).json({message: "Something went wrong!!"});
        console.log(error);
    }
};

export const getUsers = async(req,res) => {
    try {
        const users = await AuthUsers.find().select(['-password']);
        res.status(200).json(users);
    }catch(error) {
        res.status(404).json({message: "Something went wrong!!"});
        console.log(error);
    }
};

export const getUserById = async(req,res) => {
    const { id } = req.params;
    try {
        const users = await AuthUsers.findById(id).select(['-password']);
        res.status(200).json(users);
    }catch(error) {
        res.status(404).json({message: "Something went wrong!!"});
        console.log(error);
    }
};

export const postFollowing = async(req,res) => {
    const { id } = req.params;
    const { userId, name } = req.body;
    try {
        const users = await AuthUsers.findByIdAndUpdate(id, {$push: {followings: {"userId": userId, "name": name}}}).select(['-password']);
        res.status(200).json({result: users});
    }catch(error) {
        res.status(404).json({message: "Something went wrong!!"});
        console.log(error);
    }
};