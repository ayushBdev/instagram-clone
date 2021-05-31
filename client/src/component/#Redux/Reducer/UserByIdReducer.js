import { GET_USERS_BY_ID } from "../Actions/Types";

const UserByIdReducer = (state = [], action) => {
    switch(action.type) {
        
        case GET_USERS_BY_ID: 
            return action.payload;

        default: return state;

    }
};

export default UserByIdReducer;