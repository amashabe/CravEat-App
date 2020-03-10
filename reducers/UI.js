import { LOADING, SET_ERROR } from '../types';

const initialState = {
    loading: false,
    errors: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING:
            return { ...state, loading: action.payload }
        case SET_ERROR:
            return { ...state, errors: action.payload }
        default:
            return state
    }
}