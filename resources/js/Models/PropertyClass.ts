import Image, { HasImage } from "../Utility/Models/Image";
import DbRecord from "./AbstractDbRecord";

export default class Property extends DbRecord {
  constructor(
    public street: string, public city: string, public state: string, 
    public postal_code: string, //* Other countries often include # & letters!
    public additional_info: string, public landlord_id?: number, 
    id?: number, created_at?: Date, updated_at?: Date
  ) {
    super(id, created_at, updated_at);
  }
}

export class PropertyWithImg extends Property implements HasImage {
  img: Image

  constructor(street: string, city: string, state: string, 
    postal_code: string, //* Other countries often include # & letters!
    additional_info: string, img: Image, landlord_id?: number, 
    id?: number, created_at?: Date, updated_at?: Date) {
      super(street, city, state, postal_code, additional_info, landlord_id, id, created_at, updated_at);
      this.img = img;
    }
}