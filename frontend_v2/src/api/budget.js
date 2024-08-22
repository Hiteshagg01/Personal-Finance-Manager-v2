import api from ".";

const getAllBudgets = async () => {
    return await api.get("budgets/all");
};

const getCurrentBudget = async () => {
    return await api.get("budgets/current");
};

const getBudgetDetail = async (id) => {
    return await api.get(`/budgets/${id}`);
};

const addBudget = async (payload) => {
    return await api.post("budgets/add", payload);
};

const updateBudget = async (id, payload) => {
    return await api.put(`/budgets/${id}`, payload);
};

const deleteBudget = async (id) => {
    return await api.delete(`/budgets/${id}`);
};

export {
    getAllBudgets,
    getCurrentBudget,
    getBudgetDetail,
    addBudget,
    updateBudget,
    deleteBudget,
};
