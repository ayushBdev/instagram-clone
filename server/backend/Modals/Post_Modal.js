import mongoose from "mongoose";

const postSModal = mongoose.Schema({
    selectedFile: {
        type: String,
        required: true
    },

    like: {
        type: Array,
    },

    postedBy: {
        type: String,
        required: true
    },
    
    userId: {
        type: String,
        required: true
    },

    uploadDate: {
        type: String,
        required: true
    },
    comments: [{
        cmt: { type: String },
        user: { type: String }
    }],
}, {timestamps:true});

export default mongoose.model("PostSchema", postSModal);