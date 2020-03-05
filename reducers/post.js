import {UPDATE_DESCRIPTION, GET_POSTS, UPDATE_RECIPE, UPDATE_UPLOAD_IMAGE, UPDATE_LOCATION} from '../types';

export default function(state=null, action) {
    switch (action.type) {
        case UPDATE_DESCRIPTION:
            return {...state, description: action.payload}
        case GET_POSTS:
            return {...state, feed: action.payload}
        case UPDATE_RECIPE:
            return {...state, recipe: action.payload}
        case UPDATE_UPLOAD_IMAGE:
            return {...state, photo: action.payload}
        case UPDATE_LOCATION:
            return {...state, location: action.payload}
        default:
            return state
    }
}