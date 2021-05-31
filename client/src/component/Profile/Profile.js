import React, { useState, useEffect } from "react";
import "./Profile.css";
import img3 from "../#Images/img3.png";
import { Avatar, Dialog, DialogActions } from '@material-ui/core';
import Navbar from './../Navbar/Navbar';
import Followings from "../Followings/Followings";

import { getUserByIds } from "../#Redux/Actions/Auth_Action";
import { getPostsByIds } from "../#Redux/Actions/Post_Action";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {

    const [open, setOpen] = useState(false);
    
    const { id } = useParams();
    const dispatch = useDispatch();

    const userData = useSelector(state => state.UserByIdReducer);
    const postData = useSelector(state => state.PostReducer);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(getUserByIds(id));
        dispatch(getPostsByIds(id));
    }, [dispatch, id]);

    return (
        <div className="profile">
            <Navbar/>
            <div className="profile_container">
                <div className="profile_avatar">
                    <Avatar src={img3}/>
                </div>
                <div className="profile_main">
                    <div className="username">
                        <p> {userData.name} </p>
                    </div>
                    <div className="profile_menu">
                        <p> {postData.length} <span> posts </span> </p>
                        <p onClick={handleClickOpen}> 
                            {userData.length===0 ? "" : userData.followings.length} <span> followings </span> 
                        </p>
                    </div>
                </div>
            </div>
            {postData.length !== 0 ? (
                    <div className="user_post">
                    <p> My Posts </p>
                    <div className="user_posts">
                        {postData.map(ar => (
                            <img src={ar.selectedFile}/>
                        ))}
                    </div>
                </div>
            ): null}
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogActions>
                    <Followings 
                        userData={userData.followings}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Profile;