import React, { useState } from "react";
import "./Auth.css";
import img1 from "../#Images/auth.png";
import logos from "../#Images/logo.jpg";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { signin, signup } from './../#Redux/Actions/Auth_Action';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { wrongPassword } from "../Notifications/Notifications";

const Auth = () => {

    const initialState = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setshowPassword] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const handelShowPassword = () => {
        setshowPassword(preValue => !preValue);
    };

    const switchMode = () => {
        setIsSignup(preValue => !preValue);
        setshowPassword(false);
    };

    const handelChange = (event) => {
        return setForm({...form, [event.target.name]: event.target.value});
    };

    const handelSubmit = (event) => {
        event.preventDefault();
        if(isSignup) {
            if(form.password === form.confirmPassword) {
                dispatch(signup(form,history));
            } else {
                wrongPassword();
            }
        } else {
            dispatch(signin(form,history));
        }
    };


    return (
        <div className="auth">
            <div className="logo_img">
                <img src={img1}/>
            </div>
            <div className="auth_form">
                <div className="logo">
                    <img src={logos}/>
                    <p> Instagram </p>
                </div>
                <form className="auth_input" onSubmit={handelSubmit}>
                    {isSignup ? (
                        <div>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                value={form.name}
                                name="name"
                                onChange={handelChange}
                            />
                        </div>
                    ) : null}
                    <div>
                        <input
                            type="email"
                            placeholder="Enter email"
                            value={form.email}
                            name="email"
                            onChange={handelChange}
                        />
                    </div>
                    <div>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            value={form.password}
                            name="password"
                            onChange={handelChange}
                        />
                        {showPassword ? <VisibilityIcon onClick={handelShowPassword}/> : <VisibilityOffIcon onClick={handelShowPassword}/>}
                    </div>
                    {isSignup ? (
                        <div>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={form.confirmPassword}
                                name="confirmPassword"
                                onChange={handelChange}
                            />
                        </div>
                    ) : null}
                    <button className="auth_btn" type="submit">
                        {isSignup ? "Sign Up" : "Log In"}
                    </button>
                </form>
                <div className="switch_btn" onClick={switchMode}>
                    {isSignup ? "Already have a account? Log In" : "Don't have a account. Sign Up"}
                </div>
            </div>
        </div>
    );
};

export default Auth;