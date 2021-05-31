import React from "react";
import "./Followings.css";
import { Avatar } from "@material-ui/core";
import img from "../#Images/img.png";

const Followings = ({userData}) => {

    return (
        <div className="followings">
            <div className="follow_title">
                    <p> Following </p>
            </div>
            {userData.map(arr => (
                <div className="follow_details" key={arr._id}>
                    <div className="follow_scroll">
                        <div className="follow_name">
                            <Avatar src={img}/>
                            <p> {arr.name} </p>
                        </div>
                        <button className="follow_btn">
                            Following
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Followings;