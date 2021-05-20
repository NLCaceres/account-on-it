// const BaseRepository = require('./RepositoryBase').default;
import BaseRepository from './RepositoryBase';
import User from "../Models/UserClass";

const USERS_URL = "/api/users";

export default class UserAPI extends BaseRepository<User> {
    constructor() {
        super(USERS_URL); //* Set baseURL, it'll be constant and readonly
    } 
}

export const userAPI = new UserAPI();
