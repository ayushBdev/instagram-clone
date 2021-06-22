import React from "react";
import "./Followings.css";

import { Avatar } from "@material-ui/core";
import { avatar3 } from "../Images/Images";

import { unfollow } from "../#Redux/Actions/Auth_Action";

import { useDispatch } from "react-redux";

const Followings = ({userData}) => {

    const user = JSON.parse(localStorage.getItem("profile"));

    const dispatch = useDispatch();

    const handelUnfollow = (val,name) => {
        dispatch(unfollow(user?.result._id, {userId: val}, name));
    };


    return (
        <div className="followings">
            <div className="follow_title">
                <p> Following </p>
            </div>
            {userData.map(arr => (
                <div className="follow_details" key={arr._id}>
                    <div className="follow_scroll">
                        <div className="follow_name">
                            <Avatar src={avatar3}/>
                            <p> {arr.name} </p>
                        </div>
                        <button className="follow_btn" onClick={() => handelUnfollow(arr._id, arr.name)}>
                            Unfollow
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Followings;