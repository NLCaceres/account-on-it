//! Basic Types 

//! App-wide Operations
export const LOAD = 'LOAD';
export const SAVE = 'SAVE';
export const ERROR = 'ERROR';
export const UPDATE_WIDTH = 'UPDATE_WIDTH';
export const UPDATE_HEIGHT = 'UPDATE_HEIGHT';

//! CRUD Operations
//* */
export const ADD_ENTITY = 'ADD_ENTITY';
export const ADD_ENTITIES = 'ADD_ENTITIES';
export const UPDATE_ENTITY = 'UPDATE_ENTITY';

//! Authentication Related
export const LOGIN = 'LOGIN';
export const AUTHENTICATED = 'AUTHENTICATED';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGIN_ATTEMPT = 'INCREMENT_LOGIN_ATTEMPTS';
export const LOGGED_OUT = 'LOGGED_OUT';

export const NOT = 'NOT_'; //? Helper to make inverse of the above 3 err, success, & load if needed