import api from ".";

const loginUser = async (credentials) => {
    return await api.post("/users/login", credentials);
};

const registerUser = async (credentials) => {
    return await api.post("/users/register", credentials);
};

const logoutUser = async () => {
    return await api.delete("users/logout");
};

const getUserProfile = async () => {
    return await api.get("users/profile");
};

export { loginUser, registerUser, logoutUser, getUserProfile };
