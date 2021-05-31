import mongoose from "mongoose";

const AuthModal = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    followings: [{
        userId: { type: String },
        name: { type: String },
    }],
});

export default mongoose.model("AuthUsers", AuthModal);