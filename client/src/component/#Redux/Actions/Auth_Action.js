import * as API from "../../#Api/Api";
import { AUTH, GET_USERS, GET_USERS_BY_ID, FOLLOWINGS, SPINNER, UNFOLLOW } from "./Types";
import { success, danger, warning } from "../../Notifications/Notification";

export const signin = (formData,router) => async(dispatch) => {
    try {
        const { data } = await API.signIn(formData);
        success(`Welcome ${data?.result.name}`);
        dispatch({
            type: AUTH,
            payload: data
        });
        router.push("/");
    }catch(err) {
        console.log(`Auth Action ${err}`);
        dispatch({
            type: SPINNER,
            payload: false
        });
        danger(err.response.data.message);
    }
};

export const signup = (formData,router) => async(dispatch) => {
    try {
        const { data } = await API.signUp(formData);
        success(`Welcome ${data?.result.name}`);
        dispatch({
            type: AUTH,
            payload: data
        });
        router.push("/");
    }catch(err) {
        console.log(`Auth Action ${err}`);
        dispatch({
            type: SPINNER,
            payload: false
        });
        danger(err.response.data.message);
    }
};

export const usersData = () => async(dispatch) => {
    try {
        const { data } = await API.getUsers();
        dispatch({
            type: GET_USERS,
            payload: data,
        });
    }catch(err) {
        console.log(`Fetching User Error: ${err}`);
    }
};

export const getUserByIds = (id) => async(dispatch) => {
    try {
        const { data } = await API.getUserById(id);
        dispatch({
            type: GET_USERS_BY_ID,
            payload: data,
        });
    }catch(err) {
        console.log(`Fetching User Error: ${err}`);
        danger(err.response.data.message);
    }
};

export const postFollowings = (id, val) => async(dispatch) => {
    try {
        const { data } = await API.postFollowing(id, val);
        success(`Following ${val.name}`);
        dispatch({
            type: FOLLOWINGS,
            payload: data,
        });
    }catch(err) {
        console.log(`Fetching User Error: ${err}`);
        danger(err.response.data.message);
    }
};

export const unfollow = (id,userId,name) => async(dispatch) => {
    try {
        const { data } = await API.unfollows(id,userId);
        warning(`Unfollowed ${name}`);
        dispatch({
            type: UNFOLLOW,
            payload: data,
        });
    }catch(err) {
        console.log(err);
    }
};