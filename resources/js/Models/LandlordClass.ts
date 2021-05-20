import Person from "./AbstractPerson";
import { LaravelDetailResponse } from "./InterfaceLaravelResponse";
import Property from "./PropertyClass";
import Tenant from "./TenantClass";

export default class Landlord extends Person {
    [key: string]: string | number | Date | undefined;

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

export class LandlordDetailResponse extends LaravelDetailResponse<Landlord> {
    //* Ultimately just useful for json mismatch - json => { landlord => landlordJSON, ... }
    //* Problem being typescript REQUIRES all children to use the exact property name 'data'
    [key: string]: Landlord | Property[] | Tenant[]; 

    constructor(landlord: Landlord, public properties: Property[], public tenants: Tenant[]) {
        super(landlord);
    }
}