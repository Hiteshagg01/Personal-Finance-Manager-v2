import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v2",
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        if (!error.response) {
            return Promise.reject(error.message);
        }

        const {
            response: { status },
            config: originalRequest,
        } = error;

        if (status !== 403 || originalRequest._retry) {
            return Promise.reject(error.response.data.message);
        }

        try {
            originalRequest._retry = true;
            await api.get("/users/refresh-access");

            return api(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
);

export default api;
