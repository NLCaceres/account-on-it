import DbRecord from "./DbRecord";

type Payment = {
  amount: number,
  date_paid: Date,
  paid_by: number,
  property_id: number
} & DbRecord;

export default Payment;