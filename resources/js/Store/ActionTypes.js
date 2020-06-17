//! Basic Types 

//! App-Wide Operations
export const BEGIN_LOAD = 'BEGIN_LOAD';
export const BEGIN_SAVE = 'BEGIN_SAVE';
export const ERROR_OCCURRED = 'ERROR_OCCURRED';
export const RESIZE_WINDOW = 'RESIZE_WINDOW';

//! CRUD Operations
//* CREATE */
export const ADD_ENTITY = 'POST_ENTITY';

//* READ */
export const DETAIL_ENTITY = 'DETAIL_ENTITY';
export const ALL_ENTITIES = "ALL_ENTITIES";

//* UPDATE */
export const UPDATE_ENTITY = 'UPDATE_ENTITY';

//* DELETE */
export const DELETE_ENTTITY = 'DELETE_ENTITY';

//! Authentication
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = 'SIGN_OUT';
export const AUTHENTICATION_CHECK = "AUTHENTICATION_CHECK";