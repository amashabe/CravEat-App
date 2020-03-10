import { UPDATE_DESCRIPTION, GET_POSTS, UPDATE_RECIPE, UPDATE_PHOTO, UPDATE_LOCATION, GET_COMMENTS, GET_POST } from '../types';

export default function (state = null, action) {
    switch (action.type) {
        case UPDATE_DESCRIPTION:
            return { ...state, description: action.payload }
        case GET_POSTS:
            return { ...state, feed: action.payload }
        case UPDATE_RECIPE:
            return { ...state, recipe: action.payload }
        case UPDATE_PHOTO:
            return { ...state, photo: action.payload }
        case UPDATE_LOCATION:
            return { ...state, location: action.payload }
        case GET_COMMENTS:
            return { ...state, comments: action.payload }
        case GET_POST:
            return { ...state, singlePost: action.payload }
        default:
            return state
    }
}