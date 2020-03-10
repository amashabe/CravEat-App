import { combineReducers } from 'redux';
import userReducer from './user';
import postReducer from './post';
import UI from './UI';

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer,
    UI: UI
})

export default rootReducer;