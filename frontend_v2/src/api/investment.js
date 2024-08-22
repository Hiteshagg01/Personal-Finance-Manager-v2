import api from ".";

const getAllInvestments = async () => {
    return await api.get("investments/all");
};

const addInvestment = async (payload) => {
    return await api.post("investments/add", payload);
};

const getInvestmentById = async (id) => {
    return await api.get(`investments/${id}`);
};

const updateInvestment = async (id, payload) => {
    return await api.put(`investments/${id}`, payload);
};

const deleteInvestment = async (id) => {
    return await api.delete(`investments/${id}`);
};

export {
    getAllInvestments,
    addInvestment,
    getInvestmentById,
    updateInvestment,
    deleteInvestment,
};
