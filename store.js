import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

const initialState = {};

const middleware = applyMiddleware(thunk, logger);

const store = createStore(
    rootReducer,
    initialState,
    middleware
)

export default store;