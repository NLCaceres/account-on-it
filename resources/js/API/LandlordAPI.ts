import BaseRepository from './RepositoryBase';
import Landlord from '../Models/LandlordClass';

const LANDLORDS_URL = '/api/landlords'

export default class LandlordAPI extends BaseRepository<Landlord> {
    constructor() {
        super(LANDLORDS_URL);
    }
}

export const landlordAPI = new LandlordAPI();

// export default { //! CRUD Order
//     async create(data) {
//         if (data) {
//             try {
//                 return await axios.post(`${LANDLORDS_URL}`, data);
//             } catch (err) {
//                 return err.response || err.message;
//             }
//         }
//     },
//     async all(callback = null, pageNum = null) {
//         try {
//             //* If callback === null, return response from server
//             const allLandlordsPath = (pageNum) ? `${LANDLORDS_URL}?page=${pageNum}` : LANDLORDS_URL;
//             const response = await axios.get(allLandlordsPath);

//             if (!callback) return response;

//             if (response !== null) callback(null, response.data);

//         } catch (err) {
//             //* If callback === null, return err msg to view to display
//             if (!callback) return err.response || err.message;

//             if (err.response) {
//                 //* Handles Laravel errs
//                 callback(err.response, null);
//             } else {
//                 //* Handles standard errs
//                 console.log(err.toJSON());
//                 callback(err.message, null)
//             }
//         }
//     },
//     async find(id, callback = null) {
//         if (id) {
//             try {
//                 //* If callback === null, return response from server
//                 const response = await axios.get(`${LANDLORDS_URL}/${id}`);
//                 if (!callback) return response;

//                 if (response !== null) callback(null, response.data);

//             } catch (err) {
//                 //* If callback === null, return err msg to view to display
//                 if (!callback) return err.response || err.message;

//                 if (err.response) {
//                     //* Handle Laravel errs
//                     callback(err.response, null);
//                 } else {
//                     //* Handle standard errs
//                     callback(err.message, null);
//                 }
//             }
//         }
//     },
//     async update(id, data) {
//         if (id) {
//             try {
//                 return await axios.put(`${LANDLORDS_URL}/${id}`, data);
//             } catch (err) {
//                 return err.response || err.message;
//             }
//         }
//     },
//     async delete(id, callback = null) {
//         if (id) {
//             try {
//                 //* If callback === null, return response from server
//                 const response = await axios.delete(`${LANDLORDS_URL}/${id}`);
//                 if (!callback) return response;

//                 if (response !== null) callback(null, response.data);

//             } catch (err) {
//                 //* If callback === null, return err msg to view to display
//                 if (!callback) return err.response || err.message;

//                 if (err.response) {
//                     //* Handle Laravel errs
//                     callback(err.response, null);
//                 } else {
//                     //* Handle standard errs
//                     callback(err.message, null);
//                 }
//             }
//         }
//     }
// };
