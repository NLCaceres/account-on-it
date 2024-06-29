import Person from "./Person";
import Property from "./PropertyClass";
import Tenant from "./TenantClass";

type Landlord = {
  user_id: number
} & Person;

export default Landlord;

export type LandlordDetailResponse = {
  landlord: Landlord & {
    properties: Property[],
    tenants: Tenant[]
  }
};