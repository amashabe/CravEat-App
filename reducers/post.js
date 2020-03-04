import {UPDATE_DESCRIPTION, GET_POSTS, UPDATE_RECIPE} from '../types';

export default function(state=null, action) {
    switch (action.type) {
        case UPDATE_DESCRIPTION:
            return {...state, description: action.payload}
        case GET_POSTS:
            return {...state, feed: action.payload}
        case UPDATE_RECIPE:
            return {...state, recipe: action.payload}
        default:
            return state
    }
}