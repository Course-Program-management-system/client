import axios from "axios";
import Utils from "./utils";
export default function initApiInterceptor() {
  axios.defaults.baseURL =
    process.env.NODE_ENV === "production"
      ? "/v1/attainment"
      : "http://localhost:8080/v1/attainment";
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error?.response?.status === 401 &&
        error?.response?.data?.message?.toLowerCase() === "invalid token"
      ) {
        localStorage.clear();
        window.location.reload();
        window.location.href = "/login";
      } else {
        Utils.Toast.next(
          error?.response?.data?.message ||
            "Something went wrong, Please contact adminstrator"
        );
      }
      return Promise.reject(error);
    }
  );
}
