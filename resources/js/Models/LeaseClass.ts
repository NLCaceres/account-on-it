import DbRecord from "./AbstractDbRecord";

export default class Lease extends DbRecord {
  constructor(public lease_start: Date, public lease_end: Date, public property_id: number,
    id?: number, created_at?: Date, updated_at?: Date) {
      super(id, created_at, updated_at);
  }
}