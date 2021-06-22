import React, { useState, useEffect } from "react";
import "./Profile.css";

import { avatar2 } from "../Images/Images";
import { Avatar, Dialog, DialogActions } from '@material-ui/core';

import Navbar from './../Navbar/Navbar';
import Followings from "../Followings/Followings";
import { getPostsByIds } from "../#Redux/Actions/Post_Action";
import API from "../#Api/Api"
import pusher from "../Pusher/Pusher";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {

    const [open, setOpen] = useState(false);
    const [currUser, setCurrUser] = useState([]);
    
    const { id } = useParams();
    const dispatch = useDispatch();

    const postData = useSelector(state => state.PostReducer);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(getPostsByIds(id));
    }, [dispatch, id]);

    useEffect(() => {
        const channels = pusher.subscribe("users");
            channels.bind("updated", (data => (
                API.get(`/auth/${id}`)
                    .then(res => (
                        setCurrUser(res.data)
                ))
            )))
        return () => {
            channels.unbind_all();
            channels.unsubscribe();
        }
    }, []);

    useEffect(() => {
        API.get(`/auth/${id}`)
            .then(res => (
                setCurrUser(res.data)
        ))
    }, [id]);

    return (
        <div className="profile">
            <Navbar/>
            <div className="profile_container">
                <div className="profile_avatar">
                    <Avatar src={avatar2}/>
                </div>
                <div className="profile_main">
                    <div className="username">
                        <p> {currUser.name} </p>
                    </div>
                    <div className="profile_menu">
                        <p> {postData.length} <span> posts </span> </p>
                        <p onClick={handleClickOpen}> 
                            {currUser.length===0 ? "" : currUser.followings.length} <span> followings </span> 
                        </p>
                    </div>
                </div>
            </div>
            {postData.length !== 0 ? (
                    <div className="user_post">
                    <p> My Posts </p>
                    <div className="user_posts">
                        {postData.map(ar => (
                            <img src={ar.selectedFile} alt="" kry={ar._id}/>
                        ))}
                    </div>
                </div>
            ): null}
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogActions>
                    <Followings 
                        userData={currUser.followings}
                    />
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Profile;