import GetCookie from "@/Utility/Functions/cookies";
import { ACCEPT_JSON_HEADER } from "@/Utility/Constants/axios_helpers";
import axios from "axios";

const BASE_URL = "/api/login";

export default {
    async checkAuthentication() {
        try {            
            return await axios.get(`${BASE_URL}-check`);
        } catch (err) {
            return err.response || err.message;
        }
    },
    async recaptchaVerify(actionName) {
        const token = await grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY, { action: actionName } );
        if (token) {
            try {
                const response = await axios.post(`${BASE_URL}/forgot-password`, { response: token });
                if (response.status === 200 &&response.data.action === actionName) return response.data.score;
            } catch (err) {
                return err;
            }
        }
    },
    async login(user) {
        const csrfCookie = await axios.get("/sanctum/csrf-cookie");
        //? Manually grabbing the token and setting it in the header (which is what axios.withXSRFToken causes to happen under the hood!)
        const token = GetCookie("XSRF-TOKEN", true)
        const encodedToken = encodeURIComponent(token)
        if (csrfCookie.status === 204) {
            try {
                return await axios.post(`${BASE_URL}`, user, { headers: { "X-XSRF-TOKEN": encodedToken } });
            } catch (err) {
                return err.response || err.message;
            }
        }
    },
    async logout() {
        try {
            return await axios.post("/api/logout", null/* , { headers: ACCEPT_JSON_HEADER } */);
        } catch (err) {
            return err.response || err.message;
        }
    },
    async register(user) {
        try {
            return await axios.post("/api/register", user)
        } catch (err) {
            console.log(err.response);
            return err.response || err.message;
        }
    }
};
