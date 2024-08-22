import client from "./client";


const getAllBudgets = async () => {
    return await client.get("/budgets/all");
};

const getCurrentBudget = async () => {
    return await client.get("budgets/current");
};

const getBudgetDetail = async (id) => {
    return await client.get(`/budgets/${id}`);
};

const addBudget = async (payload) => {
    return await client.post("budgets/add", payload);
};

const updateBudget = async (id, payload) => {
    return await client.put(`/budgets/${id}`, payload);
};

const deleteBudget = async (id) => {
    return await client.delete(`/budgets/${id}`);
};


export {
    getAllBudgets,
    getCurrentBudget,
    getBudgetDetail,
    addBudget,
    updateBudget,
    deleteBudget,
};
