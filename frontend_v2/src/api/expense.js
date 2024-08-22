import api from ".";

const getAllExpenses = async () => {
    return await api.get("expenses/all");
};

const getCurrentExpenses = async () => {
    return await api.get("expenses/current");
};

const addExpense = async (payload) => {
    return await api.post("expenses/add", payload);
};

const getExpenseById = async (id) => {
    return await api.get(`expenses/${id}`);
};

const updateExpense = async (id, payload) => {
    return await api.put(`expenses/${id}`, payload);
};

const deleteExpense = async (id) => {
    return await api.delete(`expenses/${id}`);
};

export {
    getAllExpenses,
    getCurrentExpenses,
    addExpense,
    getExpenseById,
    updateExpense,
    deleteExpense,
};
