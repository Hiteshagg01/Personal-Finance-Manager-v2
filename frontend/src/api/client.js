import axios from "axios";


const client = axios.create({
    baseURL: "http://localhost:3000/api/v2",
    withCredentials: true,
});

// Set up an interceptor for responses
client.interceptors.response.use(
    (response) => response.data,
    async (error) => {
        if (error.response) {
            const {
                response: { status },
                config: originalRequest,
            } = error;

            if (status === 403 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    await client.get("/users/refresh-access");
                    return client(originalRequest);
                } catch (refreshError) {
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error.response.data.message);
        } else {
            return Promise.reject(error.message);
        }
    }
);


export default client;

/* 
client.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const msg = error.response
            ? error.response.data.message
            : error.message;
        return Promise.reject(msg);
    }
);
*/


