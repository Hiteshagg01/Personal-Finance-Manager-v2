import client from "./client";

const getAllExpenses = async () => {
    return await client.get("expenses/all");
};

const getCurrentExpenses = async () => {
    return await client.get("expenses/current");
};

const addExpense = async (payload) => {
    return await client.post("expenses/add", payload);
};

const getExpenseById = async (id) => {
    return await client.get(`expenses/${id}`);
};

const updatedExpense = async (id, payload) => {
    return await client.put(`expenses/${id}`, payload);
};

const deleteExpense = async (id) => {
    return await client.delete(`expenses/${id}`);
};

export {
    getAllExpenses,
    getCurrentExpenses,
    addExpense,
    getExpenseById,
    updatedExpense,
    deleteExpense,
};
