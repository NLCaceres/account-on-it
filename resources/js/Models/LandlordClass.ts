import Person from "./AbstractPerson";

export default class Landlord extends Person {
    constructor(
        first_name: string,
        surname: string,
        email: string,
        id?: number,
        public user_id?: number,
        created_at?: Date,
        updated_at?: Date
    ) {
        super(first_name, surname, email, id, created_at, updated_at);
    }
}
