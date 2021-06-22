import React, { useEffect, useState } from 'react';
import "./Sidebar.css";

import Avatar from '@material-ui/core/Avatar';
import { avatar1 } from "../Images/Images";

import { postFollowings } from "../#Redux/Actions/Auth_Action";
import API from "../#Api/Api";
import pusher from "../Pusher/Pusher";

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {

    const [currUser, setCurrUser] = useState([]);
    const [User, setUser] = useState([]);

    const user = JSON.parse(localStorage.getItem("profile"));
    const id = user?.result._id;

    const dispatch = useDispatch();

    const handelFollow = (userId, name) => {
        dispatch(postFollowings(id, {userId: userId, name: name}));
    };

    useEffect(() => {
        const channels = pusher.subscribe("users");
            channels.bind("updated", ((data) => {
                API.get("/auth")
                    .then(res => {
                        res.data.filter(ar => ar._id === user?.result._id).map(val => (
                            setCurrUser(val.followings)
                        ))
        
                        return(setUser(res.data))
            })}))
        return () => {
            channels.unbind_all();
            channels.unsubscribe();
        }
    }, []);

    useEffect(() => {
        API.get("/auth")
            .then(res => {
                res.data.filter(ar => ar._id === user?.result._id).map(val => (
                    setCurrUser(val.followings)
                ))

                return(setUser(res.data))
            })
    }, [dispatch]);

    return (
        <div className="sidebar">
            <div className="header">
                <p> Suggestions For You </p>
            </div>
            <div className="sidebar_menu">
                {User && User.filter(a => a._id !== user?.result._id).map((arr) => (
                    currUser.length>0 ? (
                        currUser.filter(ar => ar.userId !== arr._id).map(() => (
                            <div className="sidebar_container" key={arr._id}>
                                <Link className="sidebar_main" to={`/profile/${arr._id}`}>
                                    <Avatar src={avatar1}/>
                                    <p> {arr.name} </p>
                                </Link>
                                <div className="sidebar_follow" onClick={(() => handelFollow(arr._id))}>
                                    <p> Follow </p>
                                </div>
                            </div>
                        ))
                    ): (
                        <div className="sidebar_container" key={arr._id}>
                            <Link className="sidebar_main" to={`/profile/${arr._id}`}>
                                <Avatar src={avatar1}/>
                                <p> {arr.name} </p>
                            </Link>
                            <div className="sidebar_follow" onClick={(() => handelFollow(arr._id, arr.name))}>
                                <p> Follow </p>
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
};

export default Sidebar;