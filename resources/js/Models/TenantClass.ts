import Person from "./Person";
import Landlord from "./LandlordClass";
import Lease from "./LeaseClass";
import Payment from "./PaymentClass";
import Property from "./PropertyClass";

type Tenant = {
  user_id?: number,
  property_id?: number,
  lease_id?: number,
  landlord_id?: number,
} & Person;

export default Tenant;

export type TenantDetailResponse = {
  tenant: Tenant,
  landlord: Landlord,
  property: Property,
  lease: Lease,
  payments: Payment[]
};