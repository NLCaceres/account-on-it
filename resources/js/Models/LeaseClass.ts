import DbRecord from "./DbRecord";

type Lease = {
  lease_start: Date, lease_end: Date, property_id: number,
} & DbRecord;

export default Lease;