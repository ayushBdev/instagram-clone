import { SPINNER } from "../Actions/Types";

const SpinnerReducer = (state = true, action) => {
    switch(action.type) {
        
        case SPINNER: 
            return action.payload;

        default: return state;

    }
};

export default SpinnerReducer;