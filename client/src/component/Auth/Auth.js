import React, { useState, useEffect } from "react";
import "./Auth.css";

import { logos, auth } from "../Images/Images";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Loader from "react-loader-spinner";

import { SPINNER } from "../#Redux/Actions/Types";
import { signin, signup } from './../#Redux/Actions/Auth_Action';
import { warning } from "../Notifications/Notification";
import API from "../#Api/Api";

import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

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

    const spinner = useSelector(state => state.SpinnerReducer);

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
        dispatch({
            type: SPINNER,
            payload: true
        });
        if(isSignup) {
            if(form.password === form.confirmPassword) {
                dispatch(signup(form,history));
            } else {
                warning("Password Mismatch");
            }
        } else {
            dispatch(signin(form,history));
        }
    };

    useEffect(async() => {
        try {
            await API.get("/tests")
        }catch(err) {
            dispatch({
                type: SPINNER,
                payload: false
            });
        }
    }, []);


    return (
        <div className="auth">
            <div className={spinner ? "logo_img opacitys" : "logo_img"}>
                <img src={auth} alt=""/>
            </div>
            <div className={spinner ? "auth_form opacitys" : "auth_form"}>
                <div className="logo">
                    <img src={logos} alt=""/>
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
            <div className="loader">
                <Loader
                    type="Oval"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={500000000}
                    visible={spinner}
                />
            </div>
        </div>
    );
};

export default Auth;