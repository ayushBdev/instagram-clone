import * as API from "../../#Api/Api";
import { AUTH, GET_USERS, GET_USERS_BY_ID, FOLLOWINGS } from "./Types";
import { success } from "../../Notifications/Notifications";

export const signin = (formData,router) => async(dispatch) => {
    try {
        const { data } = await API.signIn(formData);
        success(data?.result.name);
        dispatch({
            type: AUTH,
            payload: data
        });
        router.push("/");
    }catch(err) {
        console.log(`Auth Action ${err}`);
    }
};

export const signup = (formData,router) => async(dispatch) => {
    try {
        const { data } = await API.signUp(formData);
        success(data?.result.name);
        dispatch({
            type: AUTH,
            payload: data
        });
        router.push("/");
    }catch(err) {
        console.log(`Auth Action ${err}`);
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
    }
};

export const postFollowings = (id, val) => async(dispatch) => {
    try {
        const { data } = await API.postFollowing(id, val);
        dispatch({
            type: FOLLOWINGS,
            payload: data,
        });
    }catch(err) {
        console.log(`Fetching User Error: ${err}`);
    }
};