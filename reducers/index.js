import { combineReducers } from 'redux';
import userReducer from './user';
import postReducer from './post';
import UI from './UI';
import profileReducer from './profile';

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    UI: UI,
    profile: profileReducer
})

export default rootReducer;