import axios from "axios";

const BASE_URL = "/api/login";

import {
    BASE_HEADER,
    ACCEPT_JSON_HEADER
} from "../Utility/Constants/axios_helpers";

export default {
    async checkAuthentication() {
        try {
            return await axios.get("/api/user");
        } catch (err) {
            return err.response || err.message;
        }
    },
    async recaptchaVerify(actionName) {
        const token = await grecaptcha.execute(
            process.env.MIX_RECAPTCHA_V3_SITE_KEY,
            {
                action: actionName
            }
        );
        if (token) {
            try {
                const response = await axios.post(
                    `${BASE_URL}/forgot-password`,
                    { response: token }
                );
                if (
                    response.status === 200 &&
                    response.data.action === actionName
                )
                    return response.data.score;
            } catch (err) {
                return err;
            }
        }
    },
    async login(user) {
        const csrfCookie = await axios.get("/sanctum/csrf-cookie");
        if (csrfCookie.status === 204) {
            try {
                return await axios.post(`${BASE_URL}`, user);
            } catch (err) {
                return err.response || err.message;
            }
        }
    },
    async logout() {
        try {
            return await axios.post("/api/logout", null, {
                headers: ACCEPT_JSON_HEADER
            });
        } catch (err) {
            return err.response || err.message;
        }
    }
};
