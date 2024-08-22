import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addBudget,
    deleteBudget,
    getAllBudgets,
    getBudgetDetail,
    updateBudget,
} from "../../api/budget";

const initialState = {
    all: [],
    current: [],
    details: {},
    status: "idle",
    error: null,
};

const budgetSlice = createSlice({
    name: "budget",
    initialState,
    reducers: {
        resetBudget: (state) => {
            state.all = [];
            state.current = [];
            state.details = {};
            state.status = "idle";
            state.error = null;
        },
        resetError: (state) => {
            state.error = null;
        },
        resetStatus: (state) => {
            state.status = "idle";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(budgetAll.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(budgetAll.fulfilled, (state, action) => {
                state.all = action.payload.data.rows;
                state.status = "succeeded";
            })
            .addCase(budgetAll.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(budgetCurrent.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(budgetCurrent.fulfilled, (state, action) => {
                state.current = action.payload.data.rows;
                state.status = "succeeded";
            })
            .addCase(budgetCurrent.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(budgetAdd.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(budgetAdd.fulfilled, (state, action) => {
                state.current.push(action.payload.data);
                state.all.push(action.payload.data);
                state.status = "succeeded";
            })
            .addCase(budgetAdd.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(budgetDetail.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(budgetDetail.fulfilled, (state, action) => {
                state.details = action.payload.data;
                state.status = "succeeded";
            })
            .addCase(budgetDetail.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(budgetUpdate.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(budgetUpdate.fulfilled, (state, action) => {
                state.all = state.all.map((budget) =>
                    budget.id === action.payload.data.id
                        ? action.payload.data
                        : budget
                );
                state.current = state.current.map((budget) =>
                    budget.id === action.payload.data.id
                        ? action.payload.data
                        : budget
                );
                state.status = "succeeded";
            })
            .addCase(budgetUpdate.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(budgetDelete.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(budgetDelete.fulfilled, (state, action) => {
                state.all = state.all.filter(
                    (budget) => budget.id !== action.meta.arg
                );
                state.current = state.current.filter(
                    (budget) => budget.id !== action.meta.arg
                );
                state.status = "succeeded";
            })
            .addCase(budgetDelete.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            });
    },
});

const budgetAll = createAsyncThunk(
    "budget/all",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            return await getAllBudgets();
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const budgetCurrent = createAsyncThunk(
    "budget/current",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            return await getAllBudgets();
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const budgetAdd = createAsyncThunk(
    "budget/add",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            return await addBudget(payload);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const budgetDetail = createAsyncThunk(
    "budget/detail",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            return await getBudgetDetail(id);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const budgetUpdate = createAsyncThunk(
    "budget/update",
    async ({ id, payload }, { rejectWithValue, dispatch }) => {
        try {
            console.log(id, payload);
            return await updateBudget(id, payload);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const budgetDelete = createAsyncThunk(
    "budget/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            return await deleteBudget(id);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

export const { resetStatus, resetError, resetBudget } = budgetSlice.actions;
export {
    budgetAll,
    budgetCurrent,
    budgetAdd,
    budgetDetail,
    budgetUpdate,
    budgetDelete,
};
export default budgetSlice.reducer;
