import DbRecord from "./AbstractDbRecord";

export default class Payment extends DbRecord {
  constructor(public amount: number, public date_paid: Date, public paid_by: number, public property_id: number,
    id?: number, created_at?: Date, updated_at?: Date) {
      super(id, created_at, updated_at);
  }
}