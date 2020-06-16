import axios from "axios";

const LEASES_URL = '/api/leases';

export default { //! CRUD Order
    async create(data) {
        if (data) {
            try {
                return await axios.post(`${LEASES_URL}`, data);
            } catch (err) {
                return err.response || err.message;
            }
        }
    },
    async all(callback = null) {
        try {
            //* If callback === null, return response from server
            const response = await axios.get(LEASES_URL);
            if (!callback) return response;

            if (response !== null) callback(null, response.data);

        } catch (err) {
            //* If callback === null, return err msg to view to display
            if (!callback) return err.response || err.message;

            callback(err, err.response.data);
        }
    },
    async find(id) {
        try {
            //* If callback === null, return response from server
            const response = await axios.get(`${LEASES_URL}/${id}`);
            if (!callback) return response;

            if (response !== null) callback(null, response.data);

        } catch (err) {
            //* If callback === null, return err msg to view to display
            if (!callback) return err.response || err.message;

            callback(err, err.response.data);
        }
        try {
            const response = await axios.get(`${LEASES_URL}/${id}`)
            if (response !== null) return response.data;
        } catch (err) {
            console.log(`Err ${err.toString()}`);
        }
    },
    async update(id, data) {
        try {
            return await axios.put(`${LEASES_URL}/${id}`, data);
        } catch (err) {
            return err.response || err.message;
        }
    },
    async delete(id, callback = null) {
        try {
            //* If callback === null, return response from server
            const response = await axios.delete(`${LEASES_URL}/${id}`);
            if (!callback) return response;

            if (response !== null) callback(null, response.data);

        } catch (err) {
            //* If callback === null, return err msg to view to display
            if (!callback) return err.response || err.message;

            callback(err, err.response.data);
        }
    }
};
