import React, { useEffect, useState } from 'react';
import "./Menu.css";
import img from "../#Images/img1.jpg";
import img3 from "../#Images/img3.png";
import { Avatar } from "@material-ui/core";
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoodOutlinedIcon from '@material-ui/icons/MoodOutlined';

import { addComments, likePosts } from "../#Redux/Actions/Post_Action";
import { useDispatch } from "react-redux";
import Pusher from "pusher-js";
import API from "../#Api/Api";

const Menu = () => {

    const initialState = {
        comment: "",
        postedBy: "",
        id: "",
    };

    const user = JSON.parse(localStorage.getItem("profile"));

    const [post, setPost] = useState([]);
    const [commentData, setCommentData] = useState(initialState);

    const dispatch = useDispatch();

    const handelSubmit = async(event) => {
        event.preventDefault();
        dispatch(addComments(commentData.id, commentData));
        setCommentData(initialState);
    };

    const handelLike = (id) => {
        dispatch(likePosts(id, {userId: user?.result._id}));
    };

    useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER, {
            cluster: process.env.REACT_APP_CLUSTER
        });
    
        const channels = pusher.subscribe("posts");
            channels.bind("inserted", ((data) => {
                setPost([...post, data]);
            }));
        return () => {
            channels.unbind_all();
            channels.unsubscribe();
        }
    }, []);

    useEffect(() => {
        const pusher = new Pusher(process.env.REACT_APP_PUSHER, {
            cluster: process.env.REACT_APP_CLUSTER
        });
    
        const channels = pusher.subscribe("posts");
            channels.bind("updated", ((data) => {
                    API.get("/posts")
                    .then(res => (
                        setPost(res.data)
                )); 
            }));
        return () => {
            channels.unbind_all();
            channels.unsubscribe();
        }
    }, []);

    useEffect(() => {
        API.get("/posts")
            .then(res => (
                setPost(res.data)
        ));
    }, []);

    return (<>
        {post && post.map((val) => (
            <div className="post" key={val._id}>
                <div className="post_header">
                    <div>
                        <Avatar src={img3}/>
                        <p> {val.postedBy} </p>
                    </div>
                    <div>
                        <p> {val.uploadDate} </p>
                    </div>
                </div>
                <div className="post_img">
                    <img src={val.selectedFile}/>
                </div>
                <div className="post_menu">
                    <FavoriteIcon onClick={(() => handelLike(val._id))}/>
                    <p> {val.like.length} likes </p>
                </div>
                {val.comments.map(ar => (
                    <div className="post_comment">
                        <p> {ar.user}: </p>
                        <span> {ar.cmt} </span>
                    </div>
                ))}
                <form className="post_comments" onSubmit={handelSubmit}>
                    <MoodOutlinedIcon/>
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        value={commentData.comment}
                        onChange={(event) => setCommentData({ ...commentData, comment:event.target.value, postedBy: user?.result.name, id: val._id })}
                    />
                    <button type="submit"> Post </button>
                </form>
            </div>
        ))}
        
    </>);
};

export default Menu;