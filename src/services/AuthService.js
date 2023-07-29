import axios from "axios";

const axiosApiInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_HOST}`,
});

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const value = localStorage.getItem("user");
    if (value) {
      const { auth, organizations } = JSON.parse(value);
      config.headers = {
        Authorization: `Bearer ${auth.token}`,
        Accept: "application/json",
        "x-organization-id": organizations[0].id,
        ...config.headers,
        // "Content-Type": "application/x-www-form-urlencoded",
      };
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApiInstance;
