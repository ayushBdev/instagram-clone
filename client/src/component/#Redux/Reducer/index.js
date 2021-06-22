import { combineReducers } from "redux";
import AuthReducer from "./Auth_Reducer";
import PostReducer from "./Post_Reducer"; 
import SpinnerReducer from "./Spinner_Reducer"; 

const rootReducer = combineReducers({
    AuthReducer,
    PostReducer,
    SpinnerReducer,
});

export default rootReducer;