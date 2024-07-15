import GetCookie from "@/Utility/Functions/cookies";
import User, { RegisteringUser } from "@/Models/UserClass";
import { ACCEPT_JSON_HEADER } from "@/Utility/Constants/axios_helpers";
import axios from "axios";

const BASE_URL = "/api/login";

export async function checkAuthentication() {
  try {
    return await axios.get(`${BASE_URL}-check`);
  } catch (err) {
    return err.response || err.message;
  }
}
export async function recaptchaVerify(actionName: string) {
  const token = await grecaptcha.execute(import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY, { action: actionName } );
  if (token) {
    try {
      const response = await axios.post(`${BASE_URL}/forgot-password`, { response: token });
      if (response.status === 200 && response.data.action === actionName) return response.data.score;
    } catch (err) {
      return err;
    }
  }
}
export async function login(user: User) {
  const csrfCookie = await axios.get("/sanctum/csrf-cookie");
  const token = GetCookie("XSRF-TOKEN", true);
  const encodedToken = encodeURIComponent(token);
  if (csrfCookie.status === 204) {
    try {
      // ?: Axios uses `axios.withXSRFToken` BUT manually get/set the token helps to migrate to `fetch()` in the future
      const headers = { "X-XSRF-TOKEN": encodedToken, ...ACCEPT_JSON_HEADER };
      return await axios.post(`${BASE_URL}`, user, { headers });
    } catch (err) {
      return err.response || err.message;
    }
  }
}
export async function logout() {
  try {
    return await axios.post("/api/logout", null, { headers: ACCEPT_JSON_HEADER });
  } catch (err) {
    return err.response || err.message;
  }
}
export async function register(user: RegisteringUser) {
  try {
    return await axios.post("/api/register", user);
  } catch (err) {
    return err.response || err.message;
  }
}
