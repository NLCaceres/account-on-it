//! Basic Types 

//! App-Wide Operations
export const BEGIN_LOAD = "BEGIN_LOAD";
export const BEGIN_SAVE = "BEGIN_SAVE";
export const ERROR_OCCURRED = "ERROR_OCCURRED";
export const NEW_MESSAGE = "NEW_MESSAGE";
export const RESIZE_WINDOW = "RESIZE_WINDOW";
export const CHANGE_RECAPTCHA_SCORE = "CHANGE_RECAPTCHA_SCORE";
export const INIT_PAGE_VISIBILITY = "INIT_PAGE_VISIBILITY";
export const INIT_INTERSECTION_OBSERVER = "INIT_INTERSECTION_OBSERVER";

//! CRUD Operations
//* CREATE */
export const ADD_ENTITY = "POST_ENTITY";

//* READ */
export const DETAIL_ENTITY = "DETAIL_ENTITY";
export const ALL_ENTITIES = "ALL_ENTITIES";

//* UPDATE */
export const UPDATE_ENTITY = "UPDATE_ENTITY";

//* DELETE */
export const DELETE_ENTTITY = "DELETE_ENTITY";

//! Authentication
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const AUTHENTICATION_CHECK = "AUTHENTICATION_CHECK";

//! Login Popup
export const OPEN_POPUP = "OPEN_POPUP";
export const CHANGE_POPUP_VIEW = "CHANGE_POPUP_VIEW";