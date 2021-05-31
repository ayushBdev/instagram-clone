import { CREATE, FETCH_POST } from "../Actions/Types";

const PostReducer = (state=[], action) => {
    switch(action.type) {

        case CREATE:
            return [...state, action.payload];

        case FETCH_POST:
            return action.payload;

        default: return state;
    }
};

export default PostReducer;