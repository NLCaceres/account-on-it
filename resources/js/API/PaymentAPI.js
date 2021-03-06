import axios from "axios";

const PAYMENTS_URL = '/api/payments';

export default {
    async create(data) {
        if (data) {
            try {
                return await axios.post(`${PAYMENTS_URL}`, data);
            } catch (err) {
                return err.response || err.message;
            }
        }
    },
    async all(callback = null) {
        try {
            //* If callback === null, return response from server
            const response = await axios.get(PAYMENTS_URL);
            if (!callback) return response;

            if (response !== null) callback(null, response.data);

        } catch (err) {
            //* If callback === null, return err msg to view to display
            if (!callback) return err.response || err.message;

            callback(err, err.response.data);
        }
    },
    async find(id, callback = null) {
        try {
            //* If callback === null, return response from server
            const response = await axios.get(`${PAYMENTS_URL}/${id}`);
            if (!callback) return response;

            if (response !== null) callback(null, response.data);

        } catch (err) {
            //* If callback === null, return err msg to view to display
            if (!callback) return err.response || err.message;

            callback(err, err.response.data);
        }
    },
    async update(id, data) {
        try {
            return await axios.put(`${PAYMENTS_URL}/${id}`, data);
        } catch (err) {
            return err.response || err.message;
        }
    },
    async delete(id, callback = null) {
        try {
            //* If callback === null, return response from server
            const response = await axios.delete(`${PAYMENTS_URL}/${id}`);
            if (!callback) return response;

            if (response !== null) callback(null, response.data);

        } catch (err) {
            //* If callback === null, return err msg to view to display
            if (!callback) return err.response || err.message;

            callback(err, err.response.data);
        }
    }
};
