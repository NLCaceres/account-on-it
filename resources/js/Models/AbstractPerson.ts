import DbRecord from "./AbstractDbRecord";

export default abstract class Person extends DbRecord {
    constructor(
        public first_name: string,
        public surname: string,
        public email: string,
        id?: number,
        created_at?: Date,
        updated_at?: Date
    ) {
        super(id, created_at, updated_at);
    }
}
