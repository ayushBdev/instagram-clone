import { combineReducers } from "redux";
import AuthReducer from "./Auth_Reducer";
import PostReducer from "./Post_Reducer"; 
import UserByIdReducer from "./UserByIdReducer"; 

const rootReducer = combineReducers({
    AuthReducer: AuthReducer,
    PostReducer: PostReducer,
    UserByIdReducer: UserByIdReducer,
});

export default rootReducer;