import React, { useState } from "react";
import "./Upload.css";

import { Avatar} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { dates } from "../TimeStamp/Timestamp";
import { createPost } from "../#Redux/Actions/Post_Action";

import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";

const Upload = () => {

    const initialState = {
        title: "",
        selectedFile: "",
        postedBy: "",
        uploadDate: "",
        userId: "",
    };

    const user = JSON.parse(localStorage.getItem("profile"));

    const [postData, setPostData] = useState(initialState);

    const dispatch = useDispatch();

    const handelPost = async(event) => {
        event.preventDefault();
        dispatch(createPost(postData));
    };


    return (
        <form className="uploadPost" onSubmit={handelPost}>
            <div className="form_input">
                <Avatar/>
                <input
                    type="text"
                    placeholder={`${user?.result.name}, what's on your mind?`}
                    name="title"
                />
            </div>
            <div className="form_upload">
                <div className="img_upload">
                    <ImageIcon/>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({
                            ...postData, 
                            selectedFile: base64,
                            postedBy: user?.result.name,
                            uploadDate: dates,
                            userId: user?.result._id
                        })}
                    />
                </div>
                <button className="uplaod_btn" type="submit">
                    <CloudUploadIcon/>
                    <p> Upload </p>
                </button>
            </div>
        </form>
    );
};

export default Upload;