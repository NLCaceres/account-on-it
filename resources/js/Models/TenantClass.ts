import Person from "./AbstractPerson";
import { LaravelDetailResponse } from "./InterfaceLaravelResponse";
import Landlord from "./LandlordClass";
import Lease from "./LeaseClass";
import Payment from "./PaymentClass";
import Property from "./PropertyClass";

export default class Tenant extends Person {
    constructor(
        first_name: string,
        surname: string,
        email: string,
        id?: number,
        public user_id?: number,
        public property_id?: number,
        public lease_id?: number,
        public landlord_id?: number,
        created_at?: Date,
        updated_at?: Date
    ) {
        super(first_name, surname, email, id, created_at, updated_at);
    }
}

export class TenantDetailResponse extends LaravelDetailResponse<Tenant> {
    //* Ultimately just useful for json mismatch - json => { landlord => landlordJSON, ... }
    //* Problem being typescript REQUIRES all children to use the exact property name 'data'
    [key: string]: Tenant | Landlord | Property | Lease | Payment[];

    constructor(tenant: Tenant, public landlord: Landlord, public property: Property, public lease: Lease, public payments: Payment[]) {
        super(tenant);
    }
}