import * as api from "../../#Api/Api";
import { CREATE, CREATE_COMMENTS, LIKE_POST, FETCH_POST } from "./Types";
import { success, warning } from "../../Notifications/Notification";

export const createPost = (post) => async(dispatch) => {
    try{
        const { data } = await api.createNewPost(post);
        dispatch({
            type: CREATE, 
            payload: data
        });
        success("🦄 Post created Successfully");
    }catch(err) {
        console.log(err);
        warning(err.response.data.message);
    }
};

export const getPostsByIds = (id) => async(dispatch) => {
    try{
        const { data } = await api.getPostsById(id);
        dispatch({
            type: FETCH_POST, 
            payload: data
        });
    }catch(err) {
        console.log(err);
        warning(err.response.data.message);
    }
};

export const addComments = (id, val) => async(dispatch) => {
    try {
        const { data } = await api.addComment(id, val);
        dispatch({
            type: CREATE_COMMENTS, 
            payload: data
        });
        success("Comment added Successfully");
    } catch(err) {
        console.log(err);
        warning(err.response.data.message);
    }
};

export const likePosts = (id, val) => async(dispatch) => {
    try {
        const { data } = await api.likePost(id, val);
        dispatch({
            type: LIKE_POST, 
            payload: data
        });
        success("Post liked");
    } catch(err) {
        console.log(err);
        warning(err.response.data.message);
    }
};