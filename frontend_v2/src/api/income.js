import api from ".";

const getAllIncomes = async () => {
    return await api.get("incomes/all");
};

const getCurrentIncomes = async () => {
    return await api.get("incomes/current");
};

const addIncome = async (payload) => {
    return await api.post("incomes/add", payload);
};

const getIncomeById = async (id) => {
    return await api.get(`incomes/${id}`);
};

const updateIncome = async (id, payload) => {
    return await api.put(`incomes/${id}`, payload);
};

const removeIncome = async (id) => {
    return await api.delete(`incomes/${id}`);
};

export {
    getAllIncomes,
    getCurrentIncomes,
    addIncome,
    getIncomeById,
    updateIncome,
    removeIncome,
};
