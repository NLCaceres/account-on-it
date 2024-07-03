import Tenant, { TenantDetailResponse } from "../Models/TenantClass";
import BaseRepository from "./RepositoryBase";

const TENANTS_URL = "/api/tenants";

export default class TenantAPI extends BaseRepository<Tenant, TenantDetailResponse> {
  constructor() {
    super(TENANTS_URL);
  }
}

export const tenantAPI = new TenantAPI();

// export default { //! CRUD Order
//     async create(data) {
//         if (data) {
//             try {
//                 return await axios.post(`${TENANTS_URL}`, data);
//             } catch (err) {
//                 return err.response || err.message;
//             }
//         }
//     },
//     async all(callback = null) {
//         try {
//             //* If callback === null, return response from server
//             const response = await axios.get(TENANTS_URL);
//             if (!callback) return response;

//             if (response !== null) callback(null, response.data);

//         } catch (err) {
//             //* If callback === null, return err msg to view to display
//             if (!callback) return err.response || err.message;

//             callback(err, err.response.data);
//         }
//     },
//     async find(id, callback = null) {
//         try {
//             //* If callback === null, return response from server
//             const response = await axios.get(`${TENANTS_URL}/${id}`);
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
//             return await axios.put(`${TENANTS_URL}/${id}`, data);
//         } catch (err) {
//             return err.response || err.message;
//         }
//     },
//     async delete(id, callback = null) {
//         try {
//             //* If callback === null, return response from server
//             const response = await axios.delete(`${TENANTS_URL}/${id}`);
//             if (!callback) return response;

//             if (response !== null) callback(null, response.data);

//         } catch (err) {
//             //* If callback === null, return err msg to view to display
//             if (!callback) return err.response || err.message;

//             callback(err, err.response.data);
//         }
//     }
// };
