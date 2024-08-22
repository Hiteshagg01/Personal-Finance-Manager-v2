import client from "./client";

const login = async (credentials) => {
    return await client.post("/users/login", credentials);
};

const register = async (credentials) => {
    return await client.post("/users/register", credentials);
};

const logout = async () => {
    return await client.delete("/users/logout");
};

const profile = async () => {
    return await client.get("/users/profile");
};

export {
    login,
    register,
    logout,
    profile
}