//! Basic Types 

//! App-wide Operations
export const LOAD = "LOAD";
export const SAVE = "SAVE";
export const ERROR = "ERROR";
export const APP_MSG = "APP_MSG";
export const UPDATE_WIDTH = "UPDATE_WIDTH";
export const UPDATE_HEIGHT = "UPDATE_HEIGHT";
export const UPDATE_RECAPTCHA_SCORE = "UPDATE_RECAPTCHA_SCORE";
export const SET_PAGE_VISIBILITY_API = "SET_PAGE_VISIBILITY_API";
export const SET_INTERSECTION_OBSERVER_API = "SET_INTERSECTION_OBSERVER_API";

//! CRUD Operations
//* */
export const ADD_ENTITY = "ADD_ENTITY";
export const ADD_ENTITIES = "ADD_ENTITIES";
export const UPDATE_ENTITY = "UPDATE_ENTITY";

//! Authentication Related
export const LOGIN = "LOGIN";
export const AUTHENTICATED = "AUTHENTICATED";
export const LOGGED_IN = "LOGGED_IN";
export const LOGIN_ATTEMPT = "INCREMENT_LOGIN_ATTEMPTS";
export const LOGGED_OUT = "LOGGED_OUT";

//! Login Popup Related
export const OPENING_POPUP = "OPEN_POPUP"
export const CHANGE_TO_FORGOT_PASS = "FORGOT_PASS_FORM";
export const CHANGE_TO_NEW_USER = "NEW_USER_FORM";
export const CHANGE_TO_LOGIN_FORM = "_LOGIN_FORM";

export const NOT = "NOT_"; //? Helper to make inverse of the above 3 err, success, & load if needed