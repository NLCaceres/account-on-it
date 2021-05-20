import Property from "../Models/PropertyClass";
import BaseRepository from "./RepositoryBase";

const PROPERTIES_URL = '/api/properties';

export default class PropertyAPI extends BaseRepository<Property> {
    constructor() {
        super(PROPERTIES_URL);
    }
}

export const propertyAPI = new PropertyAPI();

// export default { //! CRUD Order
//     async create(data) {
//         if (data) {
//             try {
//                 return await axios.post(`${PROPERTIES_URL}`, data);
//             } catch (err) {
//                 return err.response || err.message;
//             }
//         }
//     },
//     async all(callback = null) {
//         try {
//             //* If callback === null, return response from server
//             const response = await axios.get(PROPERTIES_URL);
//             if (!callback) return response;

//             if (response !== null) callback(null, response.data);

//         } catch (err) {
//             //* If callback === null, return err msg to view to display
//             if (!callback) return err.response || err.message;
//             console.log(`Err in Property API: ${err}`);
//             callback(err, err.response.data);
//         }
//     },
//     async find(id, callback = null) {
//         try {
//             //* If callback === null, return response from server
//             const response = await axios.get(`${PROPERTIES_URL}/${id}`);
//             if (!callback) return response;

//             if (response !== null) callback(null, response.data);

//         } catch (err) {
//             //* If callback === null, return err msg to view to display
//             if (!callback) return err.response || err.message;

//             callback(err, err.response.data);
//         }
//     },
//     async update(id, data) {
//         try {
//             return await axios.put(`${PROPERTIES_URL}/${id}`, data);
//         } catch (err) {
//             return err.response || err.message;
//         }
//     },
//     async delete(id, callback = null) {
//         try {
//             //* If callback === null, return response from server
//             const response = await axios.delete(`${PROPERTIES_URL}/${id}`);
//             if (!callback) return response;

//             if (response !== null) callback(null, response.data);

//         } catch (err) {
//             //* If callback === null, return err msg to view to display
//             if (!callback) return err.response || err.message;

//             callback(err, err.response.data);
//         }
//     }
// };
