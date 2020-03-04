import {SIGN_IN, UPDATE_BIO, UPDATE_EMAIL, UPDATE_USERNAME, UPDATE_PASSWORD, SIGN_OUT} from '../types';

export default function(state = {}, action)  {
    switch (action.type) {
        case SIGN_IN:
            return action.payload
        case SIGN_OUT:
            return state
        case UPDATE_EMAIL:
            return {...state, email: action.payload}
        case UPDATE_PASSWORD:
            return {...state, password: action.payload}
        case UPDATE_USERNAME:
            return {...state, username: action.payload}
        case UPDATE_BIO:
            return {...state, bio: action.payload}
        default:
            return state
    }
}