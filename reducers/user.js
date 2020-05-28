import {
  SIGN_IN,
  UPDATE_BIO,
  UPDATE_EMAIL,
  UPDATE_USERNAME,
  UPDATE_PASSWORD,
  SIGN_OUT,
  SET_TOKEN,
  UPDATE_PROFILE_PICTURE,
  GET_ALL_USERS,
  UPDATE_LOCATION,
} from "../types";

const initialState = {
  email: null,
  password: null,
  bio: null,
  loading: false,
  username: null,
  location: null,
};

export default function (state = {}, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { ...state, users: action.payload };
    case SIGN_IN:
      return action.payload;
    case SIGN_OUT:
      return state;
    case UPDATE_EMAIL:
      return { ...state, email: action.payload };
    case UPDATE_LOCATION:
      return { ...state, location: action.payload };
    case UPDATE_PASSWORD:
      return { ...state, password: action.payload };
    case UPDATE_USERNAME:
      return { ...state, username: action.payload };
    case UPDATE_BIO:
      return { ...state, bio: action.payload };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case UPDATE_PROFILE_PICTURE:
      return { ...state, profilePicture: action.payload };
    default:
      return state;
  }
}
