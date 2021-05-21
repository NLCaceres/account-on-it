import Property from '../../Models/PropertyClass';
import AddressList from '../Constants/addresses-us-100.min.json';
// const addresses = require('../Constants/addresses-us-100.min.json').addresses;

export interface Coordinates {
  lat: number //* Latitude (float/doubles)
  lng: number //* Longitude (float/doubles)
}
export interface Address {
  address1: string,
  address2: string,
  city: string,
  state: string,
  postalCode: string,
  coordinates: Coordinates
}

const addresses = AddressList.addresses as Address[];

export default function RandomAddress(): Address {
  //* Grabs a random address from a list of 100 random real but public domain (not business nor personal)
  return addresses[Math.floor(Math.random() * addresses.length)];
}
export function RandomAddressList(numAddresses: number = 5): Property[] {
  //todo convert into property
  const addressList = [];
  for (let i = 0; i < numAddresses; i++) { //* Should produce # of addresses listed.
    const address = RandomAddress();
    addressList.push(new Property(address.address1, address.city, address.state, 
      address.postalCode, address.address2)); //* Uses above function to grab a new address for list
  }
  return addressList;
}