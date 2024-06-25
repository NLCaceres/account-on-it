import { HasImage } from "../Utility/Models/Image";
import DbRecord from "./DbRecord";

type Property = {
  street: string,
  city: string,
  state: string,
  postal_code: string, // - Other countries often include numbers AND letters
  additional_info: string,
  landlord_id?: number
} & DbRecord;

export default Property;

export type PropertyWithImage = Property & HasImage

export type PropertyDetailResponse = {};