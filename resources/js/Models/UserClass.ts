import Person from "./AbstractPerson";

//? Typescript enums get reverse mapping too!
export enum AccountType {
    Default = -1, //? AccountType[-1] will return 'Default' and so on and so forth
    Landlord = 0, //? AccountType["Landlord"] returns 0
    Tenant = 1
}

export enum Role {
    Default = -1,
    Normal = 0,
    Admin,
    Super
}

interface User { }

class User extends Person {
    public role: Role;
    public account_type: AccountType;
    public email_verified_at?: Date;
    public password?: string;
    //? 'Public classProp: type' isn't necessary if declared in constructor

    //? Two options for quick and powerful constructors (since can only have one definition in TS unlike Java and other C langs)
    //? Put 'public classProp: type' in constructor & it'll be init'd and assigned (no 'this.classProp = classProp')
    //? Alternative, interface/class declaration merge, and use obj w/ named params to specify and not do "new Class('foo',,,'bar)";
    constructor(obj: User) {
        //? obj?.prop ?? 'default' - New nullish coalescing used in combo w/ '?' means if no obj or prop, you get the default val!
        super(obj.first_name ?? '', obj.surname ?? '', obj.email ?? '', obj.id, obj.created_at, obj.updated_at);
        this.role = obj?.role ?? Role.Normal;
        this.account_type = obj.account_type || AccountType.Landlord;
        this.password = obj.password;
    }
}

export default User;

interface ConfirmsPassword {
    password_confirmation: string
}

export class RegisteringUser extends User implements ConfirmsPassword {
    public password_confirmation: string;

    constructor(obj: RegisteringUser) {
        super(obj);
        this.password_confirmation = obj?.password_confirmation
    }
}
