import Role from "./EnumRole";
import AccountType from "./EnumAccountType";
import Person from "./AbstractPerson";

export default class User extends Person {
    constructor(
        first_name: string,
        surname: string,
        email: string,
        public role: Role,
        public account_type: AccountType,
        id?: number,
        public email_verified_at?: Date,
        created_at?: Date,
        updated_at?: Date
    ) {
        super(first_name, surname, email, id, created_at, updated_at);
    }
}
