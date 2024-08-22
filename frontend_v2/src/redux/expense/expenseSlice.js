import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    addExpense,
    deleteExpense,
    getAllExpenses,
    getCurrentExpenses,
    getExpenseById,
    updateExpense,
} from "../../api/expense";

const initialState = {
    all: [],
    current: [],
    detail: {},
    status: "idle",
    error: null,
};

const expenseSlice = createSlice({
    name: "expense",
    initialState,
    reducers: {
        resetStatus: (state) => {
            state.status = "idle";
        },
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(expenseAll.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(expenseAll.fulfilled, (state, action) => {
                state.all = action.payload.data.rows;
                state.status = "succeeded";
            })
            .addCase(expenseAll.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(expenseCurrent.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(expenseCurrent.fulfilled, (state, action) => {
                state.current = action.payload.data.rows;
                state.status = "succeeded";
            })
            .addCase(expenseCurrent.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(expenseAdd.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(expenseAdd.fulfilled, (state, action) => {
                state.current.push(action.payload.data);
                state.all.push(action.payload.data);
                state.status = "succeeded";
            })
            .addCase(expenseAdd.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(expenseDetail.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(expenseDetail.fulfilled, (state, action) => {
                state.detail = action.payload.data;
                state.status = "succeeded";
            })
            .addCase(expenseDetail.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(expenseUpdate.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(expenseUpdate.fulfilled, (state, action) => {
                state.current = state.current.map((expense) =>
                    expense.id === action.payload.data.id
                        ? action.payload.data
                        : expense
                );
                state.all = state.all.map((expense) =>
                    expense.id === action.payload.data.id
                        ? action.payload.data
                        : expense
                );
                state.status = "succeeded";
            })
            .addCase(expenseUpdate.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            })
            .addCase(expenseDelete.pending, (state) => {
                state.error = null;
                state.status = "loading";
            })
            .addCase(expenseDelete.fulfilled, (state, action) => {
                state.current = state.current.filter(
                    (expense) => expense.id !== action.meta.arg
                );
                state.all = state.all.filter(
                    (expense) => expense.id !== action.meta.arg
                );
                state.status = "succeeded";
            })
            .addCase(expenseDelete.rejected, (state, action) => {
                state.error = action.payload;
                state.status = "failed";
            });
    },
});

const expenseAll = createAsyncThunk(
    "expense/all",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            return await getAllExpenses();
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const expenseCurrent = createAsyncThunk(
    "expense/current",
    async (_, { rejectWithValue, dispatch }) => {
        try {
            return await getCurrentExpenses();
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const expenseAdd = createAsyncThunk(
    "expense/add",
    async (payload, { rejectWithValue, dispatch }) => {
        try {
            return await addExpense(payload);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const expenseDetail = createAsyncThunk(
    "expense/detail",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            return await getExpenseById(id);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const expenseUpdate = createAsyncThunk(
    "expense/update",
    async ({ id, payload }, { rejectWithValue, dispatch }) => {
        try {
            return await updateExpense(id, payload);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

const expenseDelete = createAsyncThunk(
    "expense/delete",
    async (id, { rejectWithValue, dispatch }) => {
        try {
            return await deleteExpense(id);
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            setTimeout(() => dispatch(resetStatus()), 3000);
        }
    }
);

export const { resetStatus, resetError } = expenseSlice.actions;
export {
    expenseAll,
    expenseCurrent,
    expenseAdd,
    expenseDetail,
    expenseUpdate,
    expenseDelete,
};
export default expenseSlice.reducer;
