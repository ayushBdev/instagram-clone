import React, { useState } from "react";
import "./Navbar.css";
import logo from "../#Images/logo.jpg";
import img from "../#Images/img.png";
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Avatar, IconButton, Dialog, DialogActions } from '@material-ui/core';

import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { LOGOUT } from "../#Redux/Actions/Types";
import Upload from "../Upload/Upload";
import { Logouts } from "../Notifications/Notifications";

const Navbar = () => {

    const user = JSON.parse(localStorage.getItem("profile"));
    const id = user?.result._id;
    
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
        dispatch({
            type: LOGOUT
        });
        Logouts();
        history.push("/");
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="navbar">
            <Link className="logo" to="/">
                <img src={logo}/>
                <p> Instagram </p>
            </Link>
            <div className="search">
                <div className="input_div">
                    <SearchIcon/>
                    <input
                        type="text"
                        placeholder="Search"
                    />
                </div>
            </div>
            <div className="add" onClick={handleClickOpen}>
                <CloudUploadIcon/>
                <p> Upload </p>
            </div>
            <div className="navbar_menu">
                <Link to={`/profile/${id}`} className="navbar_link">
                    <Avatar src={img}/>
                    <p> {user?.result.name} </p>
                </Link>
                <IconButton onClick={logout}> <ExitToAppIcon/> </IconButton>
            </div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogActions>
                    <Upload />
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Navbar;