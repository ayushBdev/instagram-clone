import React, { useState, useEffect } from "react";
import "./Home.css";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import Menu from "../Menu/Menu";
import Auth from "../Auth/Auth";

import { LOGOUT } from "../#Redux/Actions/Types";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from 'jwt-decode';

const Home = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect (()=> {
        const token = user?.token;
        if(token) {
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) {
                dispatch({
                    type: LOGOUT
                });
                //logouts();
                history.push("/");
                setUser(null);
            }
        }
        setUser(JSON.parse(localStorage.getItem("profile")));
    }, [location]);

    if (!user) {
        return (
           <Auth/>
        );
    };

    return (
        <div className="home">
            <div className="navbar_div">
                <Navbar/>
            </div>
            <div className="main_div">
                <div className="menu_div">
                    <Menu/>
                </div>
                <div className="sidebar_div">
                    <Sidebar/>
                </div>
            </div>
        </div>
    );
};

export default Home;